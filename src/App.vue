<script setup lang="ts">
import Loading from '@/components/Loading/index.vue';
import Toast from '@/components/Toast/index.vue';
import { onMounted } from 'vue';

onMounted(() => {
  $utils.loading.show();
});
</script>

<template>
  <router-view></router-view>
  <Loading />
  <Toast />
</template>

<style scoped lang="scss"></style>
