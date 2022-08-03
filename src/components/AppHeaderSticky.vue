<template>
  <div class="app-header-sticky" :class="{show:y>=78}">
    <div class="container" v-show="y>=78">
      <router-link class="logo" to="/"/>
      <app-header-nav/>
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from '@/components/AppHeaderNav'
// import { ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export default {
  name: 'AppHeaderSticky.vue',
  components: { AppHeaderNav },
  setup () {
    // 方法一，传统代码实现
    // // 吸顶功能实现
    // const isShow = ref(false)
    // // 浏览器绑定事件
    // window.onscroll = () => {
    //   // 获取文档滚出去多少
    //   const scrollTop = document.documentElement.scrollTop
    //   // 页面滚动到78以上，显示吸顶组件，否则隐藏
    //   if (scrollTop >= 78) {
    //     isShow.value = true
    //   } else {
    //     isShow.value = false
    //   }
    // }

    // 方法二，组合式api实现
    // 解构出的 y 是响应式数据
    const { y } = useWindowScroll()
    return {
      // isShow,
      // 直接返回给模板使用
      y
    }
  }
}
</script>

<style lang="less" scoped>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;

  &.show {
    transition: all 0.3s linear;
    transform: translateY(0);
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url(~@/assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
