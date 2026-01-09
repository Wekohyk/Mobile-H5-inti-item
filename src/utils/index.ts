import { loadingService, type LoadingService } from '@/components/Loading/loading-server';
import { toastService, type ToastService } from '@/components/Toast/toast-server';

export type AppUtils = {
  loading: LoadingService;
  toast: ToastService;
  imageError: (imgElement: HTMLImageElement) => void;
};

const imageError = (imgElement: HTMLImageElement) => {
  imgElement.style.opacity = '0';
};

export const $utils: AppUtils = {
  loading: loadingService,
  toast: toastService,
  imageError: imageError,
};
