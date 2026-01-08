# 移动端适配说明

## 配置概览

项目同时使用了 **UnoCSS** 和 **PostCSS px-to-viewport**，两者协同工作实现移动端适配。

### 设计稿基准

- **设计稿宽度**: 750px
- **转换单位**: vw (viewport width)

## 使用方式

### 方式 1: UnoCSS rpx 单位（推荐用于原子类）

在模板中直接使用 UnoCSS 的 rpx 单位：

```vue
<template>
  <!-- rpx 会自动转换为 vw，基于 750 设计稿 -->
  <div class="w-200rpx h-300rpx text-32rpx"> 内容 </div>
</template>
```

**计算公式**: `实际值 = 设计稿px值 * 100 / 750 vw`

- 200rpx → 200 \* 100 / 750 = 26.666667vw
- 300rpx → 300 \* 100 / 750 = 40vw
- 32rpx → 32 \* 100 / 750 = 4.266667vw

### 方式 2: PostCSS 自动转换（推荐用于自定义样式）

在 style 标签中直接写 px，会自动转换为 vw：

```vue
<template>
  <div class="custom-box">内容</div>
</template>

<style scoped lang="scss">
.custom-box {
  width: 200px; // 自动转换为 26.666667vw
  height: 300px; // 自动转换为 40vw
  font-size: 32px; // 自动转换为 4.266667vw
}
</style>
```

## 特殊适配类（UnoCSS 自定义规则）

项目提供了安全区域适配类：

- `adapt-pt-44` - padding-top 适配顶部安全区域
- `adapt-pb-44` - padding-bottom 适配底部安全区域
- `adapt-mt-44` - margin-top 适配顶部安全区域
- `adapt-mb-44` - margin-bottom 适配底部安全区域
- `adapt-top-44` - top 适配顶部安全区域
- `adapt-bottom-44` - bottom 适配底部安全区域
- `adapt-h-44` - height 适配底部安全区域

示例：

```vue
<header class="adapt-pt-44">导航栏</header>
```

## 注意事项

### 1. UnoCSS 类名不会被 PostCSS 二次转换

PostCSS 配置中排除了 UnoCSS 生成的类名，避免双重转换：

```js
selectorBlackList: [/^\.w-/, /^\.h-/, /^\.text-/, /^\.bg-/, /^\.flex/, /^\.adapt-/];
```

### 2. 混合使用建议

- **原子类**：使用 UnoCSS rpx 单位
- **组件样式**：使用 style 标签中的 px
- **避免**：在 UnoCSS 中使用纯数字（如 `w-200`），会导致计算错误

### 3. 第三方组件适配

如果使用 Vant 等第三方组件，PostCSS 会自动识别并使用 375 设计稿基准：

```js
const vwUnit = file && file.indexOf('vant') !== -1 ? 375 : 750;
```

## 调试技巧

### 查看实际转换结果

1. 打开浏览器开发者工具
2. 选择元素查看 Computed 样式
3. 检查单位是否为 vw

### 常见问题

**Q: 为什么元素尺寸不对？**
A: 检查是否混用了不同单位或使用了错误的基准值

**Q: 可以直接使用 vw 吗？**
A: 可以，但不推荐。统一使用 rpx 或 px，让工具自动转换更便于维护

**Q: 如何禁止某个属性转换？**
A: 在属性前加 `!` 或使用其他单位（rem、em 等）

## 配置文件

- `unocss.config.ts` - UnoCSS 配置
- `postcss.config.js` - PostCSS 配置
- `src/assets/uno/preset-resolve-rpx.ts` - rpx 转换预设
- `src/assets/uno/preset-rem-to-px.ts` - rem 转 px 预设
# Mobile-H5-inti-item
