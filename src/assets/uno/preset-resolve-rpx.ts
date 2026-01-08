import { definePreset } from 'unocss';

export const presetRemToPx = definePreset(() => {
  return {
    name: '@unocss/preset-resolve-rpx',
    postprocess(util) {
      return util.entries.forEach(entry => {
        const value = entry[1];
        if (typeof value === 'string' && value.endsWith('rpx')) {
          // 处理 rpx 单位，转换为 vw（基于 750 设计稿）
          entry[1] = `${(100 * +value.replace('rpx', '')) / 750}vw`;
        }
      });
    },
  };
});

export default presetRemToPx;
