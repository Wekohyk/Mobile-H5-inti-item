// 自定义指令
import backToTop from './directive/back-to-top';
import { createApp } from 'vue';
// pinia and pinia-plugin-persistedstate
import pinia from './store';
// vue-router
import router from './router';
// i18n
import { getI18n } from './lang';
// 全局工具类
import { $utils } from './utils';
import Vue3Lottie from 'vue3-lottie';
/**
 * Import the Unocss core styles
 * Best placed after reset style, before uno.css
 */
import './assets/styles/index.scss';
// Import the Unocss utilities styles
import 'uno.css';
// App
import App from './App.vue';

// 将 appUtils 挂载到全局
window.$utils = $utils;

const app = createApp(App);

// 将 appUtils 添加到 Vue 全局属性
app.config.globalProperties.$utils = $utils;

app.use(pinia).use(router).use(Vue3Lottie).use(getI18n()).directive('back-to-top', backToTop);
app.mount('#app');
