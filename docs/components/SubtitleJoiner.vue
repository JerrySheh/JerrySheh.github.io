<template>
<div class="subtitle-joiner-container not-prose">
<div class="tool-card">
<header class="tool-header">
<h2 class="tool-title">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-main"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>
字幕拼接大师 Pro
</h2>
<p class="tool-subtitle">Powered by Gemini 3 ，完全 vibe coding 开发。支持全景与字幕模式混合拼接。</p>
</header>

  <div class="tool-body">
    <!-- 左侧控制面板 -->
    <div class="side-panel">
      <div 
        class="drop-zone" 
        @click="triggerFileInput" 
        @drop.prevent="handleDrop" 
        @dragover.prevent
      >
        <input type="file" multiple accept="image/*" class="file-input" @change="handleFileUpload" ref="fileInputRef" />
        <div class="upload-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        </div>
        <p>点击或拖拽上传影片截图</p>
      </div>

      <div class="config-card">
        <div class="config-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          <span>全局字幕占比</span>
        </div>
        <div class="range-wrapper">
          <div class="range-info">
            <span>调整截取比例</span>
            <span class="range-value">{{ Math.round(globalRatio * 100) }}%</span>
          </div>
          <input type="range" min="0.05" max="0.5" step="0.01" v-model.number="globalRatio" class="custom-range" />
        </div>
      </div>

      <div class="manage-card">
        <div class="manage-header">
          <span>图片队列 ({{ images.length }})</span>
          <div class="header-actions">
            <button @click="clearQueue" class="btn-clear">清空</button>
            <!-- <button @click="generateStitch" class="btn-refresh">刷新</button> -->
          </div>
        </div>
        <div class="image-stack">
          <div v-for="(img, index) in images" :key="img.id" class="stack-item" :class="{ 'item-full': img.mode === 'full' }">
            <div class="item-preview">
              <img :src="img.src" class="preview-thumb" />
            </div>
            <div class="item-controls">
              <div class="file-name-label" :title="img.name">{{ img.name }}</div>
              <div class="mode-switcher">
                <button @click="toggleMode(img.id)" :class="['mode-badge', img.mode]">
                  {{ img.mode === 'full' ? '全景模式' : '字幕模式' }}
                </button>
                <div v-if="img.mode === 'subtitle'" class="local-height-ctrl">
                  <button @click="adjustLocalHeight(img.id, -5)">-</button>
                  <span class="val">{{ img.localHeight || Math.floor(img.height * globalRatio) }}px</span>
                  <button @click="adjustLocalHeight(img.id, 5)">+</button>
                </div>
              </div>
            </div>
            <div class="order-btns">
              <button @click="moveImage(index, -1)" :disabled="index === 0" title="上移">↑</button>
              <button @click="moveImage(index, 1)" :disabled="index === images.length - 1" title="下移">↓</button>
            </div>
            <button @click="removeImage(img.id)" class="btn-del" title="移除">×</button>
          </div>
          <div v-if="images.length === 0" class="empty-state">请先上传图片</div>
        </div>
      </div>
    </div>

    <!-- 右侧预览面板 -->
    <div class="preview-panel">
      <div class="canvas-wrapper">
        <div v-if="!resultImage" class="canvas-empty">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          <p>合成预览将在此显示</p>
        </div>
        <template v-else>
          <div class="action-bar">
            <button @click="downloadResult" class="btn-download">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              下载高清长图
            </button>
          </div>
          <div class="scrollable-preview">
            <div class="render-container">
                <img :src="resultImage" class="final-render" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <canvas ref="canvasRef" style="display: none;"></canvas>
</div>


</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const images = ref([]);
const resultImage = ref(null);
const globalRatio = ref(0.12);
const canvasRef = ref(null);
const fileInputRef = ref(null);

const triggerFileInput = () => fileInputRef.value.click();

const generateStitch = async () => {
if (images.value.length === 0) {
resultImage.value = null;
return;
}
const canvas = canvasRef.value;
if (!canvas) return;
const ctx = canvas.getContext('2d');

const imgElements = await Promise.all(images.value.map(imgData => {
return new Promise((resolve) => {
const img = new Image();
img.onload = () => resolve({ element: img, mode: imgData.mode, localH: imgData.localHeight });
img.src = imgData.src;
});
}));

let totalHeight = 0;
if (imgElements.length === 0) return;
const maxWidth = imgElements[0].element.width;

const layout = imgElements.map(item => {
let h = item.mode === 'full' ? item.element.height : (item.localH || Math.floor(item.element.height * globalRatio.value));
const y = totalHeight;
totalHeight += h;
return { ...item, y, h };
});

canvas.width = maxWidth;
canvas.height = totalHeight;
layout.forEach(item => {
if (item.mode === 'full') {
ctx.drawImage(item.element, 0, item.y);
} else {
const sourceY = item.element.height - item.h;
ctx.drawImage(item.element, 0, sourceY, item.element.width, item.h, 0, item.y, maxWidth, item.h);
}
});
resultImage.value = canvas.toDataURL('image/jpeg', 0.9);
};

const handleFileUpload = (e) => addFiles(Array.from(e.target.files));
const handleDrop = (e) => addFiles(Array.from(e.dataTransfer.files));
const addFiles = (files) => {
files.filter(f => f.type.startsWith('image/')).forEach(file => {
const reader = new FileReader();
reader.onload = (e) => {
const img = new Image();
img.onload = () => {
images.value.push({
id: Math.random().toString(36).substr(2, 9),
src: e.target.result,
width: img.width,
height: img.height,
name: file.name,
mode: images.value.length === 0 ? 'full' : 'subtitle'
});
};
img.src = e.target.result;
};
reader.readAsDataURL(file);
});
};

const removeImage = (id) => images.value = images.value.filter(i => i.id !== id);

const clearQueue = () => {
images.value = [];
resultImage.value = null;
};

const toggleMode = (id) => {
const img = images.value.find(i => i.id === id);
if (img) img.mode = img.mode === 'full' ? 'subtitle' : 'full';
};
const moveImage = (index, delta) => {
const target = index + delta;
if (target >= 0 && target < images.value.length) {
const arr = [...images.value];
[arr[index], arr[target]] = [arr[target], arr[index]];
images.value = arr;
}
};
const adjustLocalHeight = (id, delta) => {
const img = images.value.find(i => i.id === id);
if (img) {
const cur = img.localHeight || Math.floor(img.height * globalRatio.value);
img.localHeight = Math.max(10, cur + delta);
}
};
const downloadResult = () => {
const a = document.createElement('a');
a.download = `stitched_${Date.now()}.jpg`;
a.href = resultImage.value;
a.click();
};

watch([globalRatio, () => images.value.map(i => `${i.mode}-${i.localHeight}`).join(',')], () => {
 generateStitch();
}, { deep: true });
</script>

<style scoped>
.subtitle-joiner-container {
margin: 2.5rem 0;
color: var(--vp-c-text-1);
display: flex;
justify-content: center;
}

.tool-card {
background-color: var(--vp-c-bg-soft);
border: 1px solid var(--vp-c-divider);
border-radius: 1rem;
padding: 1.5rem;
box-shadow: 0 4px 12px rgba(0,0,0,0.05);
width: 100%;
max-width: 1440px;
}

.tool-header {
margin-bottom: 2rem;
border-bottom: 1px solid var(--vp-c-divider);
padding-bottom: 1rem;
}

.tool-title {
display: flex;
align-items: center;
gap: 0.75rem;
font-size: 1.75rem;
font-weight: 700;
color: var(--vp-c-brand-1);
margin: 0 !important;
border: none !important;
}

.icon-main { color: var(--vp-c-brand-1); }

.tool-subtitle {
margin: 0.25rem 0 0 0;
font-size: 0.9rem;
color: var(--vp-c-text-2);
}

.tool-body {
display: grid;
grid-template-columns: 1fr;
gap: 2rem;
}

@media (min-width: 1024px) {
.tool-body { grid-template-columns: 380px 1fr; }
}

/* 左侧控制区 */
.side-panel { display: flex; flex-direction: column; gap: 1.25rem; }

.drop-zone {
background: var(--vp-c-bg);
border: 2px dashed var(--vp-c-brand-3);
border-radius: 0.75rem;
padding: 1.5rem;
text-align: center;
cursor: pointer;
transition: all 0.2s ease;
}
.drop-zone:hover { border-color: var(--vp-c-brand-1); background: var(--vp-c-bg-alt); }
.file-input { display: none; }
.upload-icon { margin-bottom: 0.5rem; color: var(--vp-c-brand-1); }
.drop-zone p { margin: 0; font-size: 0.85rem; font-weight: 600; }

.config-card {
background: var(--vp-c-bg);
padding: 1rem;
border-radius: 0.75rem;
border: 1px solid var(--vp-c-divider);
}
.config-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.85rem; font-weight: bold; }

.range-info { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.75rem; }
.range-value { color: var(--vp-c-brand-1); font-family: monospace; font-weight: bold; }
.custom-range { width: 100%; cursor: pointer; height: 4px; accent-color: var(--vp-c-brand-1); }

.manage-card {
background: var(--vp-c-bg);
border: 1px solid var(--vp-c-divider);
border-radius: 0.75rem;
display: flex;
flex-direction: column;
max-height: 600px;
}
.manage-header {
padding: 0.75rem 1rem;
border-bottom: 1px solid var(--vp-c-divider);
display: flex;
justify-content: space-between;
align-items: center;
font-size: 0.85rem;
font-weight: bold;
}
.header-actions { display: flex; gap: 0.5rem; }

.btn-refresh {
font-size: 0.7rem;
padding: 0.25rem 0.75rem;
border-radius: 0.5rem;
background: var(--vp-c-brand-3);
color: var(--vp-c-brand-1);
border: none;
cursor: pointer;
}
.btn-clear {
font-size: 0.7rem;
padding: 0.25rem 0.75rem;
border-radius: 0.5rem;
background: var(--vp-c-bg-mute);
color: var(--vp-c-danger-1);
border: 1px solid var(--vp-c-danger-3);
cursor: pointer;
}
.btn-clear:hover { background: var(--vp-c-danger-3); }

.image-stack { overflow-y: auto; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.stack-item {
display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem;
background: var(--vp-c-bg-alt); border-radius: 0.5rem; border: 1px solid transparent;
}
.item-full { border-color: var(--vp-c-brand-3); background: var(--vp-c-bg-soft); }

.item-preview { flex-shrink: 0; width: 80px; height: 45px; background: #000; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.preview-thumb { max-width: 100%; max-height: 100%; object-fit: contain; }

.item-controls { flex: 1; min-width: 0; }
.file-name-label {
font-size: 0.7rem;
color: var(--vp-c-text-2);
margin-bottom: 0.4rem;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
.mode-switcher { display: flex; flex-direction: column; gap: 4px; }
.mode-badge {
font-size: 0.7rem; font-weight: bold; padding: 0.15rem 0.5rem; border-radius: 0.25rem; border: none; cursor: pointer; width: fit-content;
}
.mode-badge.full { background: var(--vp-c-brand-1); color: #fff; }
.mode-badge.subtitle { background: var(--vp-c-bg-mute); color: var(--vp-c-text-1); }

.local-height-ctrl {
display: inline-flex; align-items: center; background: var(--vp-c-bg);
border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 0 4px; width: fit-content;
}
.local-height-ctrl button { background: none; border: none; padding: 0 5px; color: var(--vp-c-text-3); cursor: pointer; }
.local-height-ctrl .val { font-size: 0.7rem; font-family: monospace; min-width: 35px; text-align: center; border-left: 1px solid var(--vp-c-divider); border-right: 1px solid var(--vp-c-divider); }

.order-btns { display: flex; flex-direction: column; gap: 2px; }
.order-btns button { background: none; border: none; padding: 2px; font-size: 0.75rem; cursor: pointer; color: var(--vp-c-text-3); }
.order-btns button:disabled { opacity: 0.2; }

.btn-del { background: none; border: none; font-size: 1.25rem; color: var(--vp-c-text-3); cursor: pointer; }
.btn-del:hover { color: var(--vp-c-danger-1); }

.empty-state { text-align: center; padding: 2rem; font-size: 0.85rem; color: var(--vp-c-text-3); font-style: italic; }

/* 右侧预览区 */
.preview-panel {
background: #121212;
border-radius: 1rem;
min-height: 600px;
position: relative;
display: flex;
flex-direction: column;
}

.canvas-wrapper {
flex: 1;
display: flex;
flex-direction: column;
position: relative;
overflow: hidden;
}

.canvas-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #444; }
.canvas-empty p { margin-top: 1rem; font-size: 0.9rem; }

.action-bar {
position: absolute; top: 1.25rem; right: 1.25rem; z-index: 10;
}
.btn-download {
background: var(--vp-c-brand-1);
color: #fff;
border: none;
padding: 0.6rem 1.25rem;
border-radius: 2rem;
font-size: 0.85rem;
font-weight: bold;
display: flex; align-items: center; gap: 0.5rem;
cursor: pointer;
box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.scrollable-preview {
flex: 1;
width: 100%;
overflow-y: auto;
overflow-x: hidden;
padding: 2rem 1rem;
display: block;
}

.render-container {
display: flex;
justify-content: center;
width: 100%;
}

.final-render {
max-width: 100%;
height: auto;
object-fit: contain;
display: block;
box-shadow: 0 10px 40px rgba(0,0,0,0.6);
border-radius: 4px;
}
</style>