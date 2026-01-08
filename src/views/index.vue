<script setup lang="ts"></script>

<template>
  <!-- 方式1：使用 UnoCSS 单位（基于 750 设计稿，会自动转为 vw） -->
  <div class="w-200 h-300 bg-#00ff00 text-32 font-bold flex-center flex-col"> hello world (UnoCSS rpx) </div>

  <!-- 方式2：使用自定义 class，在 style 中写 px（会被 postcss-px-to-viewport 转换） -->
  <div class="custom-box">hello world (PostCSS)</div>
</template>

<style scoped lang="scss">
// 这里的 px 会被 postcss-px-to-viewport 自动转换为 vw（基于 750 设计稿）
.custom-box {
  width: 200px;
  height: 300px;
  background-color: #ff0000;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
</style>
