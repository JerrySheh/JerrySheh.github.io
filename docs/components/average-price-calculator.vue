<template>
  <div class="apc">
    <!-- Header -->
    <div class="apc-header">
      <div class="apc-header-icon">
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5.97 14H8v-1.5h5.03c.55 0 1-.45 1-1s-.45-1-1-1H9.5c-1.38 0-2.5-1.12-2.5-2.5S8.12 8.5 9.5 8.5H11V7h2v1.5h-3.5c-.55 0-1 .45-1 1s.45 1 1 1h3.53c1.38 0 2.5 1.12 2.5 2.5S14.41 15.5 13.03 17z"/>
        </svg>
      </div>
      <h2>均价计算器</h2>
      <p>输入多组单价与金额，自动计算加权均价</p>
    </div>

    <!-- Input Rows -->
    <div class="apc-rows">
      <TransitionGroup name="row">
        <div
          v-for="(row, index) in rows"
          :key="row.id"
          class="apc-row"
        >
          <div class="apc-row-chip">{{ index + 1 }}</div>

          <div class="apc-field">
            <input
              :id="'price-' + row.id"
              v-model.number="row.price"
              type="number"
              min="0"
              step="any"
              placeholder=" "
              @keydown.enter="addRow"
            />
            <label :for="'price-' + row.id">单价 (Price)</label>
          </div>

          <div class="apc-field">
            <input
              :id="'amount-' + row.id"
              v-model.number="row.amount"
              type="number"
              min="0"
              step="any"
              placeholder=" "
              @keydown.enter="addRow"
            />
            <label :for="'amount-' + row.id">金额 (Amount)</label>
          </div>

          <div class="apc-row-qty" v-if="row.price > 0 && row.amount > 0">
            <span class="apc-row-qty-val">{{ (row.amount / row.price).toFixed(4) }}</span>
            <span class="apc-row-qty-label">数量</span>
          </div>

          <button
            class="apc-row-del"
            @click="removeRow(index)"
            :disabled="rows.length <= 1"
            title="删除此行"
          >
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
      </TransitionGroup>
    </div>

    <!-- Actions -->
    <div class="apc-actions">
      <button class="apc-btn apc-btn-filled" @click="addRow">
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        添加一组
      </button>
      <button class="apc-btn apc-btn-tonal" @click="resetAll">
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
        清空重置
      </button>
    </div>

    <!-- Result -->
    <Transition name="fade">
      <div class="apc-result" v-if="hasValidData">
        <div class="apc-result-item">
          <span class="apc-result-label">总金额</span>
          <span class="apc-result-num">{{ totalAmount.toFixed(2) }}</span>
        </div>
        <div class="apc-result-divider"></div>
        <div class="apc-result-item">
          <span class="apc-result-label">总数量</span>
          <span class="apc-result-num">{{ totalQuantity.toFixed(4) }}</span>
        </div>
        <div class="apc-result-divider"></div>
        <div class="apc-result-item apc-result-hero">
          <span class="apc-result-label">加权均价</span>
          <span class="apc-result-num">{{ averagePrice }}</span>
        </div>
      </div>
    </Transition>

    <!-- Cumulative Averages -->
    <Transition name="fade">
      <div class="apc-cumulative" v-if="cumulativeAverages.length > 0">
        <div class="apc-cumulative-title">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>
          逐步均价变化
        </div>
        <div class="apc-cumulative-list">
          <div
            v-for="(step, i) in cumulativeAverages"
            :key="i"
            class="apc-step"
          >
            <div class="apc-step-dot" :class="{ 'apc-step-dot-last': i === cumulativeAverages.length - 1 }"></div>
            <div class="apc-step-line" v-if="i < cumulativeAverages.length - 1"></div>
            <div class="apc-step-content">
              <span class="apc-step-label">前 {{ step.count }} 组</span>
              <span class="apc-step-price" :class="{ 'apc-step-price-last': i === cumulativeAverages.length - 1 }">{{ step.avg }}</span>
              <span class="apc-step-delta" v-if="step.delta !== null" :class="step.delta > 0 ? 'apc-delta-up' : step.delta < 0 ? 'apc-delta-down' : 'apc-delta-flat'">
                {{ step.delta > 0 ? '↑' : step.delta < 0 ? '↓' : '→' }} {{ Math.abs(step.delta).toFixed(4) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

let nextId = 1
const createRow = () => ({ id: nextId++, price: null, amount: null })
const rows = ref([createRow(), createRow()])

const addRow = () => rows.value.push(createRow())
const removeRow = (i) => { if (rows.value.length > 1) rows.value.splice(i, 1) }
const resetAll = () => { nextId = 1; rows.value = [createRow(), createRow()] }

const validRows = computed(() => rows.value.filter(r => r.price > 0 && r.amount > 0))
const hasValidData = computed(() => validRows.value.length > 0)
const totalAmount = computed(() => validRows.value.reduce((s, r) => s + r.amount, 0))
const totalQuantity = computed(() => validRows.value.reduce((s, r) => s + r.amount / r.price, 0))
const averagePrice = computed(() => totalQuantity.value === 0 ? '--' : (totalAmount.value / totalQuantity.value).toFixed(4))

// Cumulative averages: show running average after each successive valid row (starting from 2)
const cumulativeAverages = computed(() => {
  const vr = validRows.value
  if (vr.length < 2) return []
  const steps = []
  let sumAmt = 0
  let sumQty = 0
  for (let i = 0; i < vr.length; i++) {
    sumAmt += vr[i].amount
    sumQty += vr[i].amount / vr[i].price
    if (i >= 1) {
      const avg = sumAmt / sumQty
      const prevAvg = steps.length > 0 ? parseFloat(steps[steps.length - 1].avg) : null
      steps.push({
        count: i + 1,
        avg: avg.toFixed(4),
        delta: prevAvg !== null ? avg - prevAvg : null
      })
    }
  }
  return steps
})
</script>

<style scoped>
/* ====== Design Tokens (Google Material You inspired) ====== */
.apc {
  --apc-primary: #1a73e8;
  --apc-on-primary: #ffffff;
  --apc-primary-container: #d3e3fd;
  --apc-on-primary-container: #1a73e8;
  --apc-surface: #ffffff;
  --apc-surface-variant: #f1f3f4;
  --apc-surface-container: #f8f9fa;
  --apc-surface-container-high: #eef0f2;
  --apc-on-surface: #1f1f1f;
  --apc-on-surface-variant: #5f6368;
  --apc-outline: #dadce0;
  --apc-outline-variant: #e8eaed;
  --apc-error: #d93025;
  --apc-shadow-sm: 0 1px 3px 0 rgba(60,64,67,.15);
  --apc-shadow-md: 0 1px 6px 0 rgba(60,64,67,.12), 0 2px 12px 2px rgba(60,64,67,.08);
  --apc-radius-sm: 8px;
  --apc-radius-md: 12px;
  --apc-radius-lg: 16px;
  --apc-radius-full: 9999px;
  --apc-font: 'Google Sans', 'Inter', system-ui, -apple-system, sans-serif;
}

.apc {
  max-width: 720px;
  margin: 32px auto;
  padding: 0;
  font-family: var(--apc-font);
  color: var(--apc-on-surface);
  -webkit-font-smoothing: antialiased;
}

/* ====== Header ====== */
.apc-header {
  text-align: center;
  padding: 36px 24px 28px;
  background: var(--apc-surface);
  border-radius: var(--apc-radius-lg) var(--apc-radius-lg) 0 0;
  border: 1px solid var(--apc-outline-variant);
  border-bottom: none;
}

.apc-header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--apc-radius-md);
  background: var(--apc-primary-container);
  color: var(--apc-on-primary-container);
  margin-bottom: 16px;
}

.apc-header h2 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: var(--apc-on-surface);
  border: none;
  padding: 0;
}

.apc-header p {
  margin: 0;
  font-size: 14px;
  color: var(--apc-on-surface-variant);
  line-height: 1.5;
}

/* ====== Rows ====== */
.apc-rows {
  background: var(--apc-surface);
  border-left: 1px solid var(--apc-outline-variant);
  border-right: 1px solid var(--apc-outline-variant);
  padding: 8px 20px;
}

.apc-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--apc-outline-variant);
}

.apc-row:last-child {
  border-bottom: none;
}

.apc-row-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  border-radius: var(--apc-radius-full);
  background: var(--apc-primary);
  color: var(--apc-on-primary);
  font-size: 12px;
  font-weight: 600;
}

/* Outlined text field (Material 3 style) */
.apc-field {
  position: relative;
  flex: 1;
  min-width: 0;
}

.apc-field input {
  width: 100%;
  height: 48px;
  padding: 14px 14px 0;
  font-size: 15px;
  font-family: var(--apc-font);
  background: transparent;
  border: 1.5px solid var(--apc-outline);
  border-radius: var(--apc-radius-sm);
  color: var(--apc-on-surface);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  -moz-appearance: textfield;
}

.apc-field input::-webkit-inner-spin-button,
.apc-field input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.apc-field label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--apc-on-surface-variant);
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--apc-surface);
  padding: 0 4px;
  line-height: 1;
}

.apc-field input:focus + label,
.apc-field input:not(:placeholder-shown) + label {
  top: 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--apc-primary);
}

.apc-field input:focus {
  border-color: var(--apc-primary);
  border-width: 2px;
  padding: 13.5px 13.5px 0;
}

.apc-row-qty {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 64px;
  gap: 1px;
}

.apc-row-qty-val {
  font-size: 13px;
  font-weight: 600;
  color: var(--apc-on-surface);
  font-variant-numeric: tabular-nums;
}

.apc-row-qty-label {
  font-size: 10px;
  color: var(--apc-on-surface-variant);
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.apc-row-del {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-width: 36px;
  border: none;
  border-radius: var(--apc-radius-full);
  background: transparent;
  color: var(--apc-on-surface-variant);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.apc-row-del:hover:not(:disabled) {
  background: rgba(217, 48, 37, 0.08);
  color: var(--apc-error);
}

.apc-row-del:disabled {
  opacity: 0.28;
  cursor: not-allowed;
}

/* ====== Actions ====== */
.apc-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  padding: 20px 24px;
  background: var(--apc-surface);
  border-left: 1px solid var(--apc-outline-variant);
  border-right: 1px solid var(--apc-outline-variant);
}

.apc-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--apc-font);
  letter-spacing: 0.01em;
  border: none;
  border-radius: var(--apc-radius-full);
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s, transform 0.1s;
  user-select: none;
}

.apc-btn:active {
  transform: scale(0.97);
}

.apc-btn-filled {
  background: var(--apc-primary);
  color: var(--apc-on-primary);
}

.apc-btn-filled:hover {
  box-shadow: var(--apc-shadow-sm);
  background: #1765cc;
}

.apc-btn-tonal {
  background: var(--apc-surface-container-high);
  color: var(--apc-on-surface-variant);
}

.apc-btn-tonal:hover {
  background: var(--apc-outline-variant);
}

/* ====== Result ====== */
.apc-result {
  display: flex;
  align-items: stretch;
  background: var(--apc-surface);
  border: 1px solid var(--apc-outline-variant);
  border-radius: 0 0 var(--apc-radius-lg) var(--apc-radius-lg);
  overflow: hidden;
}

.apc-result-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 24px 12px;
}

.apc-result-divider {
  width: 1px;
  background: var(--apc-outline-variant);
  align-self: stretch;
}

.apc-result-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--apc-on-surface-variant);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.apc-result-num {
  font-size: 20px;
  font-weight: 600;
  color: var(--apc-on-surface);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.3px;
}

.apc-result-hero .apc-result-num {
  font-size: 26px;
  font-weight: 700;
  color: var(--apc-primary);
}

/* ====== No-result bottom border ====== */
.apc-actions:last-child {
  border-bottom: 1px solid var(--apc-outline-variant);
  border-radius: 0 0 var(--apc-radius-lg) var(--apc-radius-lg);
}

/* ====== Cumulative Averages ====== */
.apc-cumulative {
  background: var(--apc-surface);
  border: 1px solid var(--apc-outline-variant);
  border-top: none;
  border-radius: 0 0 var(--apc-radius-lg) var(--apc-radius-lg);
  padding: 20px 24px 24px;
}

.apc-cumulative-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--apc-on-surface-variant);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--apc-outline-variant);
}

.apc-cumulative-list {
  display: flex;
  flex-direction: column;
}

.apc-step {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 0 10px 28px;
}

.apc-step-dot {
  position: absolute;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: var(--apc-radius-full);
  background: var(--apc-outline);
  border: 2px solid var(--apc-surface);
  box-shadow: 0 0 0 1.5px var(--apc-outline);
  z-index: 1;
}

.apc-step-dot-last {
  background: var(--apc-primary);
  box-shadow: 0 0 0 1.5px var(--apc-primary);
}

.apc-step-line {
  position: absolute;
  left: 4px;
  top: calc(50% + 7px);
  width: 2px;
  height: calc(100% - 4px);
  background: var(--apc-outline-variant);
}

.apc-step-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.apc-step-label {
  font-size: 13px;
  color: var(--apc-on-surface-variant);
  min-width: 52px;
  font-weight: 500;
}

.apc-step-price {
  font-size: 16px;
  font-weight: 600;
  color: var(--apc-on-surface);
  font-variant-numeric: tabular-nums;
}

.apc-step-price-last {
  color: var(--apc-primary);
  font-size: 18px;
  font-weight: 700;
}

.apc-step-delta {
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  padding: 2px 8px;
  border-radius: var(--apc-radius-full);
}

.apc-delta-up {
  color: #d93025;
  background: rgba(217, 48, 37, 0.08);
}

.apc-delta-down {
  color: #188038;
  background: rgba(24, 128, 56, 0.08);
}

.apc-delta-flat {
  color: var(--apc-on-surface-variant);
  background: var(--apc-surface-container-high);
}

/* ====== Transitions ====== */
.row-enter-active {
  animation: rowIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.row-leave-active {
  animation: rowIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) reverse;
}

@keyframes rowIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active {
  animation: fadeUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  animation: fadeUp 0.2s cubic-bezier(0.4, 0, 0.2, 1) reverse;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ====== Responsive ====== */
@media (max-width: 600px) {
  .apc {
    margin: 16px 0;
  }

  .apc-header {
    padding: 28px 16px 20px;
  }

  .apc-rows {
    padding: 8px 12px;
  }

  .apc-row {
    flex-wrap: wrap;
    gap: 8px;
  }

  .apc-field {
    flex: 1 1 calc(50% - 28px);
    min-width: 100px;
  }

  .apc-row-qty {
    flex: 1 1 100%;
    flex-direction: row;
    gap: 6px;
    justify-content: center;
    padding: 4px 0 0;
  }

  .apc-result {
    flex-direction: column;
  }

  .apc-result-divider {
    width: auto;
    height: 1px;
  }

  .apc-result-item {
    padding: 16px 12px;
  }

  .apc-actions {
    flex-direction: column;
    padding: 16px 12px;
  }

  .apc-btn {
    justify-content: center;
  }

  .apc-cumulative {
    padding: 16px 12px 20px;
  }
}

/* ====== Dark Mode ====== */
html.dark .apc,
html[data-theme='dark'] .apc {
  --apc-primary: #8ab4f8;
  --apc-on-primary: #062e6f;
  --apc-primary-container: #1a3a5c;
  --apc-on-primary-container: #8ab4f8;
  --apc-surface: #1e1e1e;
  --apc-surface-variant: #2d2d2d;
  --apc-surface-container: #252525;
  --apc-surface-container-high: #2d2d2d;
  --apc-on-surface: #e3e3e3;
  --apc-on-surface-variant: #9aa0a6;
  --apc-outline: #3c4043;
  --apc-outline-variant: #3c4043;
  --apc-error: #f28b82;
  --apc-shadow-sm: 0 1px 3px 0 rgba(0,0,0,.4);
  --apc-shadow-md: 0 1px 6px 0 rgba(0,0,0,.3), 0 2px 12px 2px rgba(0,0,0,.2);
}

html.dark .apc-field label,
html[data-theme='dark'] .apc-field label {
  background: #1e1e1e;
}

html.dark .apc-btn-filled,
html[data-theme='dark'] .apc-btn-filled {
  background: var(--apc-primary);
  color: var(--apc-on-primary);
}

html.dark .apc-btn-filled:hover,
html[data-theme='dark'] .apc-btn-filled:hover {
  background: #a8c7fa;
}
</style>
