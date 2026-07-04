export default defineNuxtConfig({
  extends: ['docus'],
  css: ['~/assets/css/custom.css'],
   ui: {
    fonts: false, // 关键配置：禁用 Nuxt UI 自动加载的谷歌字体
  },
  vite: {
    optimizeDeps: {
      include: []
    }
  }
})
