<template>
  <div class="qrcode-generator-container">
    <div class="header">
      <div class="icon">✨</div>
      <h2>二维码生成助手</h2>
      <p>输入文本或网址，为您生成二维码，支持手机扫码查看</p>
      <p>Powered by Gemini 3 vibe coding </p>
    </div>

    <div class="input-section">
      <textarea
        v-model="text"
        class="text-input"
        placeholder="请输入将要生成二维码的文本或网址..."
        rows="4"
      ></textarea>
    </div>

    <div class="qrcode-section">
      <ClientOnly>
        <div v-if="text && qrImageUrl" class="qrcode-wrapper">
          <img :src="qrImageUrl" alt="二维码" class="qrcode-image" width="200" height="200" />
          <p class="qrcode-tip">长按或右键可保存图片</p>
        </div>
        <div v-else class="empty-state">
          <div class="empty-box">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
              <line x1="3" y1="9" x2="21" y2="9"></line>
            </svg>
          </div>
          <p>输入内容后自动生成二维码</p>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import QRCode from 'qrcode'

const text = ref('')
const qrImageUrl = ref('')

watch(text, async (newText) => {
  if (newText) {
    try {
      qrImageUrl.value = await QRCode.toDataURL(newText, {
        width: 200,
        margin: 1,
        errorCorrectionLevel: 'M'
      })
    } catch (e) {
      console.error('QR Code generation failed:', e)
    }
  } else {
    qrImageUrl.value = ''
  }
})
</script>

<style scoped>
.qrcode-generator-container {
  max-width: 650px;
  margin: 30px auto;
  padding: 40px 30px;
  background: var(--vp-c-bg-soft, rgba(249, 249, 249, 0.5));
  border: none;
  border-radius: 16px;
  box-shadow: none;
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  text-align: center;
  transition: all 0.3s ease;
}



.header {
  margin-bottom: 30px;
}

.header .icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.header h2 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 26px;
  font-weight: 700;
  color: var(--vp-c-text-1, #2c3e50);
  border: none;
  padding: 0;
}

.header p {
  color: var(--vp-c-text-2, #6a737d);
  font-size: 15px;
  margin: 0;
  line-height: 1.6;
}

.input-section {
  margin-bottom: 35px;
}

.text-input {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  background: var(--vp-c-bg, #ffffff);
  border: 2px solid var(--vp-c-border, #e2e2e2);
  border-radius: 12px;
  color: var(--vp-c-text-1, #2c3e50);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
  resize: vertical;
  min-height: 120px;
  outline: none;
  line-height: 1.5;
}

.text-input:focus {
  border-color: var(--vp-c-brand, #3eaf7c);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft, rgba(62, 175, 124, 0.15));
}

.text-input::placeholder {
  color: var(--vp-c-text-3, #9e9e9e);
}

.qrcode-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}

.qrcode-wrapper {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--vp-c-border, #f0f0f0);
  animation: fadeIn 0.4s ease-out;
}

.qrcode-image {
  display: block;
  border-radius: 4px; /* Slight rounding for a premium look */
}

.qrcode-tip {
  margin-top: 16px;
  margin-bottom: 0;
  font-size: 14px;
  color: var(--vp-c-text-2, #6a737d);
  font-weight: 500;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--vp-c-text-3, #a0aab5);
  animation: fadeIn 0.4s ease-out;
}

.empty-box {
  width: 200px;
  height: 200px;
  border: 2px dashed var(--vp-c-border, #d9d9d9);
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-mute, rgba(245, 245, 245, 0.5));
  transition: all 0.3s ease;
}

.empty-icon {
  width: 48px;
  height: 48px;
  opacity: 0.3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode compatibility for Vuepress */
html.dark .qrcode-generator-container,
html[data-theme='dark'] .qrcode-generator-container {
  background: var(--vp-c-bg-soft, #1e1e20);
  border: none;
  box-shadow: none;
}

html.dark .qrcode-wrapper,
html[data-theme='dark'] .qrcode-wrapper {
  background: #ffffff; /* QR Code background should typically remain white for better scannability */
  border-color: transparent;
}

html.dark .text-input,
html[data-theme='dark'] .text-input {
  background: var(--vp-c-bg, #161618);
  border-color: var(--vp-c-border, #2c2c2e);
  color: var(--vp-c-text-1, #e3e3e3);
}

html.dark .empty-box,
html[data-theme='dark'] .empty-box {
  background: var(--vp-c-bg-mute, #252529);
  border-color: var(--vp-c-border, #3a3a3c);
}
</style>
