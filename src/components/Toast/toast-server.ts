import { ref } from 'vue';

export type ToastService = {
  visible: ReturnType<typeof ref<boolean>>;
  title: ReturnType<typeof ref<string>>;
  show: (message: string) => void;
};

const visible = ref(false);
const title = ref('');

let timer: ReturnType<typeof setTimeout> | null = null;
let isShowing = false;

const show = (message: string) => {
  // 防抖：如果正在显示，则忽略新的调用
  if (isShowing) {
    return;
  }

  isShowing = true;
  title.value = message;
  visible.value = true;

  timer = setTimeout(() => {
    visible.value = false;
    isShowing = false;
    timer = null;
  }, 3000);
};

export const toastService: ToastService = {
  visible,
  title,
  show,
};

export const useToastService = () => toastService;
