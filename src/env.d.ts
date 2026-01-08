/// <reference types="vite/client" />

// 声明.vue文件模块类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明Vue全局属性类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * 快应用通信桥
     */
    $quickAppBridge: {
      sendMessageToQuickApp: (_message: string | object) => void;
      setupQuickAppMessageHandler: (_message: string, _callback: (_data: any) => void) => void;
    };
  }
}

// 将此文件标记为模块，确保模块增强正常生效

// 全局 utils 类型声明，允许直接使用 utils.loading
import type { AppUtils } from './utils';

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
  }
  let utils: AppUtils;
}

export {};
