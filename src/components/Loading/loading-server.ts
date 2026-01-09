import { ref } from 'vue';

export type LoadingService = {
  visible: ReturnType<typeof ref<boolean>>;
  show: () => void;
  hide: () => void;
};

const visible = ref(false);

const show = () => {
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

export const loadingService: LoadingService = {
  visible,
  show,
  hide,
};

export const useLoadingService = () => loadingService;
