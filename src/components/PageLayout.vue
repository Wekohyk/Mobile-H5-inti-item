<template>
  <!-- 使用垂直布局 + 占满视口，避免内容被并排挤压和裁剪 -->
  <div class="page-layout-wrapper flex flex-col relative" :style="{ background }">
    <slot name="backgroundReservation"></slot>

    <header
      :class="[
        'navigation-header w-full relative ',
        {
          'bg-transparent': transparentNavigationBar,
          'fixed! left-0': floatHeader,
          'adapt-pt-60': adapt,
          'adapt-pt-0': !adapt,
        },
      ]"
      :style="{
        // 使用 props.navigationHeight 控制导航栏高度（通过 pxToRem 转换）
        height: props.navigationHeight,
        backgroundColor: navBackgroundColor,
      }"
    >
      <!-- 导航栏左侧 -->
      <div class="navigation-left flex items-center">
        <div class="flex items-center" v-if="!hideBack" @click="back">
          <img
            :src="backBtnDeepShallowMode ? '/images/back_btn_white.webp' : '/images/back_btn_dark.webp'"
            alt="back"
            class="object-center"
            :style="{ width: props.goBackWidth, height: props.goBackHeight }"
          />
        </div>
        <slot name="navigationBarLeft"></slot>
      </div>
      <!-- 导航栏中心 -->
      <div class="navigation-center flex-center">
        <slot name="navigationBarCenter">
          <div
            v-if="pageTitle"
            class="page-title flex items-center justify-center"
            :style="{ color: backBtnDeepShallowMode ? '#fff' : '#000' }"
            >{{ pageTitle }}</div
          >
        </slot>
      </div>
      <!-- 导航栏右侧 -->
      <div class="navigation-right flex items-center justify-end">
        <slot name="navigationBarRight"></slot>
      </div>
    </header>

    <main class="main-content w-full flex-1 relative">
      <!-- 主内容占满剩余空间，可滚动，插槽内容会正常展示 -->
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAttrs } from 'vue';
import quickAppBridge from '@/utils/communication.ts';

const router = useRouter();
const attrs = useAttrs();

interface Props {
  transparentNavigationBar?: boolean; // 导航栏是否透明
  hideBack?: boolean; // 是否隐藏返回按钮
  pageTitle?: string; // 页面标题
  floatHeader?: boolean; // 是否浮动
  scrollable?: boolean; // 是否可滚动
  background?: string; // 背景颜色
  navBackgroundColor?: string; // 导航栏背景颜色
  enableBackToTop?: boolean; // 是否启用返回顶部
  currentColor?: string; // 当前颜色
  goBackWidth?: string; // 返回按钮宽度
  goBackHeight?: string; // 返回按钮高度
  backBtnDeepShallowMode?: boolean; // 返回按钮是否深度模式
  navigationHeight?: string; // 导航栏高度
  adapt?: boolean; // 是否自适应
}
const props = withDefaults(defineProps<Props>(), {
  scrollable: true,
  goBackHeight: '41px',
  goBackWidth: '41px',
  backBtnDeepShallowMode: true,
  navigationHeight: '154px',
  adapt: true,
});

const back = () => {
  // 如果外部传入了 onBack 事件，则优先使用外部回调；否则使用路由返回
  if (typeof attrs.onBack === 'function') {
    attrs.onBack();
    return;
  }
  // 检查是否存在原生通信接口（system 或 flutter_method），如果存在则通过原生方式返回
  if (window.system || window.flutter_method) {
    quickAppBridge.sendMessageToQuickApp('back');
    return;
  }
  // 利用vue-router返回上一页
  router.back();
};
</script>

<style scoped lang="scss">
.page-layout-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  min-height: 0; // 确保 flex 子元素可以正确收缩
}

.navigation-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  z-index: 5555;
  flex-shrink: 0; // 防止 header 被压缩

  .navigation-left {
    padding-left: 23px;

    .object-center {
      object-fit: center;
    }
  }

  .navigation-center {
    .page-title {
      font-weight: 500;
      font-size: 34px;
    }
  }

  .navigation-right {
    padding-right: 23px;
  }
}

.main-content {
  overflow: hidden auto;
  min-height: 0; // 关键：允许 flex 子元素收缩，使滚动发生在此容器内而非整个页面
  -webkit-overflow-scrolling: touch; // iOS 平滑滚动
}
</style>
