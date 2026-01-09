<script setup lang="ts">
import { useLoadingService } from './loading-server';
import loadingAnimation from '@/assets/lottie/loading.json';

const { visible } = useLoadingService();
</script>

<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <!-- 遮罩层 -->
    <div
      v-if="visible"
      class="fixed z-9998 w-full h-full inset-0 bg-black/80 transition-opacity duration-200 ease-in"
    ></div>
  </transition>

  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <!-- 遮罩层 -->
    <div
      v-if="visible"
      class="fixed inset-0 z-9999 w-full h-full px-30 pb-93 flex-center flex-col transition-all duration-300 ease-in"
    >
      <div class="size-full flex-center">
        <vue3-lottie class="size-148" :animationData="loadingAnimation" :height="148" :width="148"></vue3-lottie>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss"></style>
