declare global {
  interface Window {
    system?: {
      postMessage?: (_message: string | object) => void;
      onmessage?: (_data: any) => void;
    };
    flutter_method?: {
      postMessage?: (_message: string | object) => void;
      onmessage?: (_data: any) => void;
    };
  }
}

const system = window.system || window.flutter_method || {};

// 向快应用发送消息的方法（保持原有导出）
export const sendMessageToQuickApp = (message: string | object) => {
  console.log('发送的消息✅✅✅', message);
  if (system?.postMessage) {
    let payload: any;
    if (typeof message === 'string') {
      payload = { action: message };
    } else {
      payload = message;
    }
    system.postMessage(JSON.stringify(payload));
  }
};

// 设置接收快应用消息的处理方法 此方法不可使用直接在onMounted使用原生方法即可
export const setupQuickAppMessageHandler = (message: string, callback: (_data: any) => void) => {
  console.log('收到的消息✅✅✅', message);
  system.onmessage = (data: any) => {
    if (data.action === message) {
      callback(data);
    }
  };
};

// 将两个方法挂载到 window 上，便于全局直接使用
const quickAppBridge = {
  // 提供命名空间调用
  sendMessageToQuickApp,
  setupQuickAppMessageHandler,
};

// 同时导出默认对象，支持按需引入使用
export default quickAppBridge;
