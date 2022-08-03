// 方法1
// // 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意点：Vue3没有全局过滤器。
// import XtxSkeleton from './xtx-skeleton'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from '@/components/library/xtx-more'
// import XtxBread from '@/components/library/xtx-bread'
// // Vue2 全局注册组件
// // Vue.component('组件名', 组件)
//
// // Vue3 全局注册组件
// // app.component('组件名', 组件)
//
// export default {
//   // install 这种写法以后是提供给 app.use() 安装组件库用的
//   install (app) {
//     // Vue3 全局注册组件
//     app.component(XtxSkeleton.name, XtxSkeleton)
//     app.component(XtxCarousel.name, XtxCarousel)
//     app.component(XtxSkeleton.name, XtxMore)
//     app.component(XtxSkeleton.name, XtxBread)
//   }
// }
// 方法2
// 其实就是vue插件，扩展vue功能，全局组件、指令、函数 （vue.30取消过滤器）
// 当你在mian.js导入，使用Vue.use()  (vue3.0 app)的时候就会执行install函数

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// console.dir(importFn.keys()) 文件名称数组

export default {
  install (app) {
    // 批量注册全局组件
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })
  }
}
