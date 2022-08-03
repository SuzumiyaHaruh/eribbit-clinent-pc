import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入自己封装的组件库
import XtxUI from '@/components/library'
// 1.重置样式库
import 'normalize.css'
// 2.自己的重置样式
import '@/assets/styles/common.less'
// 图片懒加载
import VueLazyloader from 'vue-lazyload'

createApp(App)
  .use(XtxUI)
  .use(store)
  .use(router)
  .use(VueLazyloader, {
    loading: require('@/assets/images/200.png'), // 图片加载时默认图片
    error: require('@/assets/images/200.png')// 图片加载失败时默认图片
  })
  .mount('#app')
