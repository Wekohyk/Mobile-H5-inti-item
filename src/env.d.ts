/// <reference types="vite/client" />

// 引入 vue runtime core 以确保这是一个模块扩展
import '@vue/runtime-core';
import type { AppUtils } from './utils';

// 声明.vue文件模块类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明Vue全局属性类型
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * 快应用通信桥
     */
    $quickAppBridge: {
      sendMessageToQuickApp: (_message: string | object) => void;
      setupQuickAppMessageHandler: (_message: string, _callback: (_data: any) => void) => void;
    };
    /**
     * 全局工具类
     */
    $utils: AppUtils;
  }
}

// 声明 window.hap 的类型
declare global {
  interface Window {
    hap?: {
      getEnv?: (_callback: (_data: any) => void) => void;
    };
    /**
     * 适配 flutter 的 runJavascript
     */
    flutterMessage?: () => void;
    $utils: AppUtils;
  }
  let $utils: AppUtils;
}

export {};
