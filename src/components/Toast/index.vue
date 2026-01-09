<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="visible" class="toast-container fixed flex-center">{{ title }}</div>
  </transition>
</template>

<script setup lang="ts">
import { useToastService } from './toast-server';

const { visible, title } = useToastService();
</script>

<style scoped lang="scss">
.toast-container {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 50px;
  border-radius: 20px;
  background-color: rgb(0 0 0 / 40%);
  z-index: 999999999999;
  transition: all 300ms ease-in-out;
  font-size: 30px;
  color: #fff;
}
</style>
