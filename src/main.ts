import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 语言主题(zhCn: 简体中文)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import router from './router';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

// 引入二次封装的ZGrid组件并全局注册
import ZGrid from '@/components/grid/z-Grid.vue';
app.component('ZGrid', ZGrid);

import Particles from "vue3-particles";
import '@/assets/css/index.css'

const pinia = createPinia();

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia);
app.use(Particles);
app.use(router);

app.mount('#app')
