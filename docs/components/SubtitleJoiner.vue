<template>
  <div class="subtitle-stitcher">
    <div class="stitcher-header">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-main"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>
        影片字幕拼图大师 Pro
      </h2>
      <p>Powered by Gemini 3 ，完全 vibe coding 开发。支持全画面与字幕自由拼接。</p>
    </div>

    <div class="stitcher-container">
      <!-- 左侧：编辑区域 -->
      <div class="editor-panel">
        <!-- 拖拽上传区 -->
        <div 
          class="upload-zone"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
          :class="{ 'is-dragging': isDragging }"
        >
          <input 
            type="file" 
            ref="fileInput" 
            multiple 
            accept="image/*" 
            @change="handleFileSelect" 
            style="display: none"
          >
          <div class="upload-content">
            <span class="upload-icon">➕</span>
            <span>点击或拖拽图片到这里</span>
            <span class="upload-hint">支持多选 (jpg, png, webp)</span>
          </div>
        </div>

        <!-- 图片列表 -->
        <div class="image-list" v-if="images.length > 0">
          <div class="list-actions">
            <button class="btn btn-danger" @click="clearAll">清空所有</button>
            <span class="info-text">共 {{ images.length }} 张图片</span>
          </div>

          <div v-for="(img, index) in images" :key="img.id" class="image-card">
            <div class="card-header">
              <span class="card-index">#{{ index + 1 }}</span>
              <button class="btn-icon delete-btn" @click="removeImage(index)" title="移除">×</button>
            </div>
            
            <div class="card-body">
              <!-- 左侧缩略图 -->
              <div class="thumbnail-wrapper">
                <div class="preview-box">
                  <img :src="img.url" alt="thumbnail" class="thumb-img">
                  <!-- 可视化遮罩，模拟裁切效果 -->
                  <div class="mask mask-top" :style="{ height: (img.cropTop / img.height * 100) + '%' }"></div>
                  <div class="mask mask-bottom" :style="{ height: (img.cropBottom / img.height * 100) + '%' }"></div>
                </div>
              </div>

              <!-- 右侧控制项 -->
              <div class="controls">
                <!-- 上边距控制 -->
                <div class="control-group">
                  <div class="label-row">
                    <label>上边距裁剪 (px)</label>
                  </div>
                  <div class="input-row">
                    <input 
                      type="range" 
                      v-model.number="img.cropTop" 
                      :max="img.height - img.cropBottom - 10" 
                      min="0"
                      @input="debouncedDraw"
                    >
                    <input 
                      type="number" 
                      v-model.number="img.cropTop" 
                      class="num-input"
                      @input="debouncedDraw"
                    >
                  </div>
                </div>

                <!-- 下边距控制 -->
                <div class="control-group">
                  <div class="label-row">
                    <label>下边距裁剪 (px)</label>
                  </div>
                  <div class="input-row">
                    <input 
                      type="range" 
                      v-model.number="img.cropBottom" 
                      :max="img.height - img.cropTop - 10" 
                      min="0"
                      @input="debouncedDraw"
                    >
                    <input 
                      type="number" 
                      v-model.number="img.cropBottom" 
                      class="num-input"
                      @input="debouncedDraw"
                    >
                  </div>
                </div>

                <!-- 底部操作按钮 -->
                <div class="action-row">
                  <button class="btn-text reset-btn" @click="resetImage(index)" title="重置为自动识别的初始值">
                    ↺ 重置
                  </button>
                  
                  <!-- 新增：复制首图边距按钮 -->
                  <button v-if="index > 0" class="btn-text copy-first-btn" @click="copyFirstImageMargins(index)" title="复制第一张图片的参数，保留完整画面">
                    ⬆ 复制首图边距
                  </button>

                  <button class="btn-text global-apply-btn" @click="applyToRest(index)" title="将当前图片的裁剪值应用到其他图片（智能跳过首图）">
                    ⬇ 应用到全部图片
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：预览区域 -->
      <div class="preview-panel">
        <div class="preview-header">
          <h3>效果预览</h3>
          <button class="btn btn-primary" @click="downloadResult" :disabled="!previewUrl">
            ⬇ 下载长图
          </button>
        </div>
        <div class="preview-content" :class="{ 'empty': !previewUrl }">
          <img v-if="previewUrl" :src="previewUrl" alt="Stitched Result">
          <div v-else class="empty-placeholder">
            等待生成...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onBeforeUnmount } from 'vue';

// --- State ---
const fileInput = ref(null);
const isDragging = ref(false);
const images = ref([]); // { id, url, width, height, cropTop, cropBottom, element, initialCropTop, initialCropBottom }
const previewUrl = ref('');
let canvas = null; // Off-screen canvas for processing
let debounceTimer = null;

// --- Methods ---

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (e) => {
  const files = Array.from(e.target.files);
  processFiles(files);
  e.target.value = ''; // Reset input
};

const handleDrop = (e) => {
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  processFiles(files);
};

// 核心：处理上传的文件，加载图片对象并自动识别黑边
const processFiles = async (files) => {
  if (!files.length) return;

  for (const file of files) {
    const url = URL.createObjectURL(file);
    const imgElement = new Image();
    imgElement.src = url;

    await new Promise((resolve) => {
      imgElement.onload = () => {
        // 自动识别黑边逻辑
        const margins = detectBlackBars(imgElement);
        
        let initialTop = margins.top;
        if (images.value.length > 0) {
           // 如果不是第一张，尝试激进一点，保留底部 35% 区域用于字幕
           const safeSubtitleZone = Math.floor(imgElement.height * 0.35);
           const aggressiveTop = imgElement.height - safeSubtitleZone;
           // 取两者中较大的一个，保证不裁掉检测出的底部内容，但默认裁掉顶部场景
           initialTop = Math.max(margins.top, aggressiveTop);
        }

        // 保存图片数据，增加 initialCropTop/Bottom 用于重置
        images.value.push({
          id: Date.now() + Math.random(),
          url: url,
          width: imgElement.width,
          height: imgElement.height,
          cropTop: initialTop,
          cropBottom: margins.bottom,
          initialCropTop: initialTop,
          initialCropBottom: margins.bottom,
          element: imgElement
        });
        resolve();
      };
    });
  }
  
  generatePreview();
};

// 简单的像素扫描算法，检测上下黑边
const detectBlackBars = (img) => {
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  // 为了性能，只取中间一列像素进行扫描
  const x = Math.floor(img.width / 2);
  const imageData = ctx.getImageData(x, 0, 1, img.height).data;
  
  let top = 0;
  let bottom = 0;
  const threshold = 15; // 黑色阈值 (0-255), 允许一点点噪点

  // 扫描上边距
  for (let y = 0; y < img.height; y++) {
    const r = imageData[y * 4];
    const g = imageData[y * 4 + 1];
    const b = imageData[y * 4 + 2];
    if (r > threshold || g > threshold || b > threshold) {
      top = y;
      break;
    }
  }

  // 扫描下边距
  for (let y = img.height - 1; y >= 0; y--) {
    const r = imageData[y * 4];
    const g = imageData[y * 4 + 1];
    const b = imageData[y * 4 + 2];
    if (r > threshold || g > threshold || b > threshold) {
      bottom = img.height - 1 - y;
      break;
    }
  }

  return { top, bottom };
};

const removeImage = (index) => {
  const img = images.value[index];
  URL.revokeObjectURL(img.url);
  images.value.splice(index, 1);
  generatePreview();
};

const clearAll = () => {
  images.value.forEach(img => URL.revokeObjectURL(img.url));
  images.value = [];
  previewUrl.value = '';
};

// 重置单个图片的裁剪值
const resetImage = (index) => {
  const img = images.value[index];
  if (img) {
    img.cropTop = img.initialCropTop;
    img.cropBottom = img.initialCropBottom;
    generatePreview();
  }
};

// 新增功能：复制第一张图片的裁剪参数
const copyFirstImageMargins = (index) => {
  if (images.value.length > 0 && index > 0) {
    const firstImg = images.value[0];
    const targetImg = images.value[index];
    
    // 确保参数合法，不至于让图片高度变为负数
    if (targetImg.height - firstImg.cropTop - firstImg.cropBottom > 10) {
      targetImg.cropTop = firstImg.cropTop;
      targetImg.cropBottom = firstImg.cropBottom;
      generatePreview();
    }
  }
};

// 将当前图片的裁剪设置应用到除第一张图以外的所有图片
const applyToRest = (sourceIndex) => {
  const sourceImg = images.value[sourceIndex];
  
  images.value.forEach((img, idx) => {
    // 跳过自己，并且跳过第一张图片（保留首图场景）
    if (idx !== sourceIndex && idx !== 0) {
      // 检查源配置在目标图片上是否合法（保留至少10px高度）
      if (img.height - sourceImg.cropTop - sourceImg.cropBottom > 10) {
        img.cropTop = sourceImg.cropTop;
        img.cropBottom = sourceImg.cropBottom;
      }
    }
  });
  generatePreview();
};

const debouncedDraw = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(generatePreview, 100);
};

// 核心：Canvas 绘图逻辑
const generatePreview = () => {
  if (images.value.length === 0) {
    previewUrl.value = '';
    return;
  }

  // 1. 计算最终画布尺寸
  // 以第一张图片的宽度为基准宽度，其他图片等比缩放
  const baseWidth = images.value[0].width;
  let totalHeight = 0;

  images.value.forEach(img => {
    const scale = baseWidth / img.width;
    const effectiveHeight = (img.height - img.cropTop - img.cropBottom) * scale;
    // 只有当高度大于0才计入，避免负数
    if (effectiveHeight > 0) {
        totalHeight += effectiveHeight;
    }
  });

  if (!canvas) canvas = document.createElement('canvas');
  canvas.width = baseWidth;
  canvas.height = totalHeight;
  const ctx = canvas.getContext('2d');

  // 2. 绘制背景（可选，防止透明）
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, baseWidth, totalHeight);

  // 3. 逐张绘制
  let currentY = 0;
  images.value.forEach(img => {
    const sourceH = img.height - img.cropTop - img.cropBottom;
    if (sourceH <= 0) return;

    // 目标高度：保持宽高比
    const scale = baseWidth / img.width;
    const destH = sourceH * scale;

    ctx.drawImage(
      img.element,
      0, img.cropTop, img.width, sourceH, // Source
      0, currentY, baseWidth, destH       // Destination
    );
    currentY += destH;
  });

  // 4. 导出
  previewUrl.value = canvas.toDataURL('image/jpeg', 0.9);
};

const downloadResult = () => {
  if (!previewUrl.value) return;
  const a = document.createElement('a');
  a.href = previewUrl.value;
  a.download = `subtitle-stitch-${Date.now()}.jpg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Cleanup
onBeforeUnmount(() => {
  images.value.forEach(img => URL.revokeObjectURL(img.url));
});

</script>

<style scoped>
/* 基础布局变量 
  适配 VuePress 通常的主题色
*/
.subtitle-stitcher {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: #333;
}

.stitcher-header {
  text-align: center;
  margin-bottom: 24px;
}
.stitcher-header h2 {
  margin-bottom: 8px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.header-icon {
  width: 32px;
  height: 32px;
  color: #42b983;
}
.stitcher-header p {
  color: #666;
  font-size: 0.9em;
}

.stitcher-container {
  display: flex;
  gap: 20px;
  height: 80vh; /* 固定高度，内部滚动 */
  min-height: 600px;
}

/* --- 左侧面板 --- */
.editor-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 8px;
}

/* 滚动条美化 */
.editor-panel::-webkit-scrollbar {
  width: 6px;
}
.editor-panel::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.upload-zone {
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.3s ease;
}
.upload-zone:hover, .upload-zone.is-dragging {
  border-color: #42b983; /* Vue Green */
  background-color: #f0fdf4;
}
.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #718096;
}
.upload-icon {
  font-size: 24px;
}
.upload-hint {
  font-size: 12px;
  color: #a0aec0;
}

.list-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
}
.info-text {
  font-size: 12px;
  color: #718096;
}

.image-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.card-header {
  background-color: #edf2f7;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #4a5568;
}

.card-body {
  display: flex;
  padding: 12px;
  gap: 16px;
}

.thumbnail-wrapper {
  width: 140px; /* 稍微加宽一点 */
  background-color: #000;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center;
  padding: 0;
}

.preview-box {
  position: relative;
  width: 100%;
  line-height: 0; /* 消除图片底部幽灵空白 */
}

.thumb-img {
  width: 100%;
  height: auto;
  display: block;
}

/* 可视化遮罩 */
.mask {
  position: absolute;
  left: 0;
  width: 100%;
  background-color: rgba(255, 0, 0, 0.5); /* 红色半透明表示被裁切区域 */
  pointer-events: none;
  transition: height 0.1s;
  z-index: 10;
}
.mask-top { top: 0; border-bottom: 1px dashed rgba(255,255,255,0.8); }
.mask-bottom { bottom: 0; border-top: 1px dashed rgba(255,255,255,0.8); }

.controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #4a5568;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.input-row input[type="range"] {
  flex: 1;
  cursor: pointer;
}
.num-input {
  width: 50px;
  padding: 4px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px; /* 稍微减少一点间距以容纳更多按钮 */
  padding-top: 8px;
  flex-wrap: wrap; /* 如果屏幕太小，允许按钮换行 */
}

/* --- 右侧面板 --- */
.preview-panel {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.preview-header h3 {
  margin: 0;
  font-size: 16px;
}

.preview-content {
  flex: 1;
  overflow: auto;
  background-color: #2d3748; /* 暗色背景查看结果更好 */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}
.preview-content img {
  max-width: 100%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.empty-placeholder {
  color: #718096;
  margin-top: 100px;
}

/* --- 通用按钮 --- */
.btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
}
.btn:hover { opacity: 0.9; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-primary {
  background-color: #42b983;
  color: white;
}
.btn-danger {
  background-color: #fc8181;
  color: white;
  font-size: 12px;
}
.btn-icon {
  background: none;
  border: none;
  font-size: 18px;
  color: #a0aec0;
  cursor: pointer;
}
.btn-icon:hover { color: #e53e3e; }

.btn-text {
  background: none;
  border: none;
  color: #4299e1;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  white-space: nowrap; /* 防止按钮文字换行 */
}
.btn-text:hover {
  color: #2b6cb0;
}

.global-apply-btn {
  font-weight: 500;
  font-size: 12px;
}
.reset-btn {
  color: #718096;
}
.copy-first-btn {
  color: #805ad5; /* 使用紫色区分 */
}

/* 响应式适配 */
@media (max-width: 768px) {
  .stitcher-container {
    flex-direction: column;
    height: auto;
  }
  .editor-panel, .preview-panel {
    width: 100%;
    height: 500px;
  }
}
</style>