<template>
  <div class="subtitle-stitcher">
    <div class="stitcher-header">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-main"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>
        电影字幕拼接
      </h2>
      <p>Powered by Gemini 3 vibe coding</p>
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
            {{ isProcessing ? '自动识别字幕中...' : '等待生成...' }}
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
const isProcessing = ref(false); // 控制“处理中”的状态显示
const images = ref([]); // { id, url, width, height, cropTop, cropBottom, element, initialCropTop, initialCropBottom }
const previewUrl = ref('');
let canvas = null; // Off-screen canvas for processing
let debounceTimer = null;
let globalSubtitleRatio = null; // 记录最近一次可靠的字幕顶部比例

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

  isProcessing.value = true;
  const loadedImages = [];

  for (const file of files) {
    const url = URL.createObjectURL(file);
    const imgElement = new Image();
    imgElement.src = url;

    await new Promise((resolve) => {
      imgElement.onload = () => {
        loadedImages.push({ url, imgElement });
        resolve();
      };
    });
  }

  // 1. 预扫描这一批图片，找出一个可靠的字幕位置（如果存在的话）
  let batchSubtitleRatio = null;
  for (const item of loadedImages) {
    const margins = detectBlackBars(item.imgElement);
    const result = detectSubtitleTop(item.imgElement, margins.bottom);
    if (result.isReliable) {
      batchSubtitleRatio = result.top / item.imgElement.height;
      break; // 找到第一个可靠的就停止
    }
  }

  if (batchSubtitleRatio !== null) {
    globalSubtitleRatio = batchSubtitleRatio;
  }

  // 2. 依次处理图片并加入列表
  for (const item of loadedImages) {
    const imgElement = item.imgElement;
    const margins = detectBlackBars(imgElement);
    
    let initialTop = margins.top;
    
    // 如果不是全局的第一张图片，就应用字幕裁剪
    if (images.value.length > 0) {
       let subtitleTop;
       const result = detectSubtitleTop(imgElement, margins.bottom);
       
       if (result.isReliable) {
         subtitleTop = result.top;
         globalSubtitleRatio = result.top / imgElement.height; // 更新全局比例
       } else if (globalSubtitleRatio !== null) {
         // 如果当前图片不可靠（可能没有字幕），但之前有可靠的值，就复用它
         subtitleTop = Math.floor(imgElement.height * globalSubtitleRatio);
       } else {
         subtitleTop = result.top; // 退回到默认情况
       }
       
       // 取两者中较大的一个，保证至少裁掉上边的黑边
       initialTop = Math.max(margins.top, subtitleTop);
    } else {
       // 第一张图，我们不裁剪顶部场景，但如果是可靠字幕，顺便记录下比例供后续参考
       const result = detectSubtitleTop(imgElement, margins.bottom);
       if (result.isReliable) {
         globalSubtitleRatio = result.top / imgElement.height;
       }
    }

    // 保存图片数据，增加 initialCropTop/Bottom 用于重置
    images.value.push({
      id: Date.now() + Math.random(),
      url: item.url,
      width: imgElement.width,
      height: imgElement.height,
      cropTop: initialTop,
      cropBottom: margins.bottom,
      initialCropTop: initialTop,
      initialCropBottom: margins.bottom,
      element: imgElement
    });
  }
  
  isProcessing.value = false;
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

// 自动识别字幕区域的顶部边界
const detectSubtitleTop = (img, bottomBarHeight) => {
  const c = document.createElement('canvas');
  // 字幕一般在下半部分，截取底部 40% 的区域进行分析
  const searchRatio = 0.4;
  const startY = Math.floor(img.height * (1 - searchRatio));
  const endY = img.height - bottomBarHeight;
  const searchHeight = endY - startY;
  
  // 如果剩余高度太小，使用默认值 (保留底部 35%)
  if (searchHeight <= img.height * 0.05) return { top: Math.floor(img.height * 0.65), isReliable: false };

  c.width = img.width;
  c.height = searchHeight;
  const ctx = c.getContext('2d');
  // 将待分析区域绘制到 canvas
  ctx.drawImage(img, 0, startY, img.width, searchHeight, 0, 0, img.width, searchHeight);
  
  const imageData = ctx.getImageData(0, 0, img.width, searchHeight);
  const data = imageData.data;
  
  const rowEdges = new Array(searchHeight).fill(0);
  
  // 只扫描中间 60% 的区域，字幕通常居中，避开边缘的复杂背景
  const startX = Math.floor(img.width * 0.2);
  const endX = Math.floor(img.width * 0.8);
  
  for (let y = 0; y < searchHeight; y++) {
    let rowEdgeSum = 0;
    for (let x = startX; x < endX; x++) {
      const idx = (y * img.width + x) * 4;
      const prevIdx = (y * img.width + x - 1) * 4;
      
      const luma = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
      const prevLuma = 0.299 * data[prevIdx] + 0.587 * data[prevIdx+1] + 0.114 * data[prevIdx+2];
      
      rowEdgeSum += Math.abs(luma - prevLuma);
    }
    rowEdges[y] = rowEdgeSum;
  }
  
  // 使用滑动窗口平滑数据，窗口大小约为高度的 2% (大约半行字幕的高度)
  const windowSize = Math.max(2, Math.floor(img.height * 0.02));
  const windowSums = [];
  let maxWindowSum = 0;
  let maxWindowY = 0;
  
  for (let y = 0; y <= searchHeight - windowSize; y++) {
    let sum = 0;
    for (let i = 0; i < windowSize; i++) {
      sum += rowEdges[y + i];
    }
    windowSums.push(sum);
    // 寻找边缘强度最高的窗口（通常是字幕所在位置）
    if (sum > maxWindowSum) {
      maxWindowSum = sum;
      maxWindowY = y;
    }
  }
  
  // 如果画面非常平滑，没有明显的字幕边缘，返回默认比例 35%
  if (maxWindowSum < (endX - startX) * windowSize * 5) {
    return { top: Math.floor(img.height * 0.65), isReliable: false };
  }
  
  // 向上寻找字幕的顶部边界，即边缘强度下降到峰值的 25% 以下的位置
  let topBoundaryY = maxWindowY;
  const threshold = maxWindowSum * 0.25;
  for (let y = maxWindowY; y >= 0; y--) {
    if (windowSums[y] < threshold) {
      topBoundaryY = y;
      break;
    }
    topBoundaryY = y;
  }
  
  // 加上一点 padding (图片高度的 1.5%)，避免贴得太紧
  const padding = Math.floor(img.height * 0.015);
  let finalTop = startY + topBoundaryY - padding;
  
  // 确保最终结果合理：保留至少 5% 的高度，最多保留 40%
  const minTop = Math.floor(img.height * 0.6);
  const maxTop = endY - Math.floor(img.height * 0.05);
  
  return { top: Math.floor(Math.max(minTop, Math.min(finalTop, maxTop))), isReliable: true };
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
  isProcessing.value = false;
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

// 将当前图片的裁剪设置应用到其他图片（智能保留首图的顶部场景）
const applyToRest = (sourceIndex) => {
  const sourceImg = images.value[sourceIndex];
  
  images.value.forEach((img, idx) => {
    // 跳过自己
    if (idx !== sourceIndex) {
      if (idx === 0) {
        // 对于第一张图片，只应用底部裁剪（让其底边和其它图片一致），保留顶部的画面场景
        if (img.height - img.cropTop - sourceImg.cropBottom > 10) {
          img.cropBottom = sourceImg.cropBottom;
        }
      } else {
        // 对于其他图片，同时应用顶部和底部裁剪
        if (img.height - sourceImg.cropTop - sourceImg.cropBottom > 10) {
          img.cropTop = sourceImg.cropTop;
          img.cropBottom = sourceImg.cropBottom;
        }
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
  background-color: #edf2f7; /* 浅色背景以适应浅色模式 */
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

/* --- Dark Mode --- */
html.dark .subtitle-stitcher,
html[data-theme='dark'] .subtitle-stitcher {
  background-color: var(--vp-c-bg-soft, #1e1e20);
  color: var(--vp-c-text-1, #e3e3e3);
}

html.dark .stitcher-header h2,
html[data-theme='dark'] .stitcher-header h2 {
  color: var(--vp-c-text-1, #e3e3e3);
}

html.dark .stitcher-header p,
html[data-theme='dark'] .stitcher-header p {
  color: var(--vp-c-text-2, #9e9e9e);
}

html.dark .upload-zone,
html[data-theme='dark'] .upload-zone {
  background-color: var(--vp-c-bg-mute, #252529);
  border-color: var(--vp-c-border, #3a3a3c);
}

html.dark .upload-zone:hover, 
html.dark .upload-zone.is-dragging,
html[data-theme='dark'] .upload-zone:hover, 
html[data-theme='dark'] .upload-zone.is-dragging {
  background-color: rgba(66, 185, 131, 0.1);
  border-color: #42b983;
}

html.dark .upload-content,
html.dark .info-text,
html.dark .empty-placeholder,
html[data-theme='dark'] .upload-content,
html[data-theme='dark'] .info-text,
html[data-theme='dark'] .empty-placeholder {
  color: var(--vp-c-text-2, #9e9e9e);
}

html.dark .image-card,
html[data-theme='dark'] .image-card {
  background-color: var(--vp-c-bg, #161618);
  border-color: var(--vp-c-border, #2c2c2e);
}

html.dark .card-header,
html[data-theme='dark'] .card-header {
  background-color: var(--vp-c-bg-mute, #252529);
  color: var(--vp-c-text-1, #e3e3e3);
}

html.dark .label-row,
html[data-theme='dark'] .label-row {
  color: var(--vp-c-text-2, #9e9e9e);
}

html.dark .num-input,
html[data-theme='dark'] .num-input {
  background-color: var(--vp-c-bg-mute, #252529);
  border-color: var(--vp-c-border, #3a3a3c);
  color: var(--vp-c-text-1, #e3e3e3);
}

html.dark .preview-panel,
html.dark .preview-header,
html[data-theme='dark'] .preview-panel,
html[data-theme='dark'] .preview-header {
  background-color: var(--vp-c-bg, #161618);
  border-color: var(--vp-c-border, #2c2c2e);
}

html.dark .preview-header h3,
html[data-theme='dark'] .preview-header h3 {
  color: var(--vp-c-text-1, #e3e3e3);
}

html.dark .preview-content,
html[data-theme='dark'] .preview-content {
  background-color: #000000;
}

html.dark .reset-btn,
html[data-theme='dark'] .reset-btn {
  color: var(--vp-c-text-2, #9e9e9e);
}

html.dark .copy-first-btn,
html[data-theme='dark'] .copy-first-btn {
  color: #b794f4;
}

html.dark .btn-text,
html[data-theme='dark'] .btn-text {
  color: #63b3ed;
}

html.dark .btn-text:hover,
html[data-theme='dark'] .btn-text:hover {
  color: #90cdf4;
}

html.dark .btn-icon,
html[data-theme='dark'] .btn-icon {
  color: var(--vp-c-text-3, #7c7c7d);
}

html.dark .btn-icon:hover,
html[data-theme='dark'] .btn-icon:hover {
  color: #fc8181;
}
</style>