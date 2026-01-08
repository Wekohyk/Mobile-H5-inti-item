import { definePreset } from 'unocss';

const remRE = /(-?[.\d]+)rem/g;
export interface RemToPxOptions {
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number;
  /**
   * 设计稿宽度，用于转换为 vw
   * @default undefined (不转换为 vw，只转换为 px)
   */
  designWidth?: number;
}

export const presetRemToPx = definePreset((options: RemToPxOptions = {}) => {
  const { baseFontSize = 16, designWidth } = options;

  return {
    name: '@unocss/preset-rem-to-px',
    postprocess: (util: any) => {
      const endWithUnit = !/\d$/.test(util.selector);
      util.entries.forEach((i: any) => {
        if (endWithUnit) {
          return;
        }
        const value = i[1];
        if (typeof value === 'string' && remRE.test(value)) {
          if (designWidth) {
            // 转换为 vw：rem → px → vw
            i[1] = value.replace(remRE, (_, p1) => {
              const pxValue = p1 * baseFontSize;
              return `${(100 * pxValue) / designWidth}vw`;
            });
          } else {
            // 只转换为 px
            i[1] = value.replace(remRE, (_, p1) => `${p1 * baseFontSize}px`);
          }
        }
      });
    },
  };
});

export default presetRemToPx;
