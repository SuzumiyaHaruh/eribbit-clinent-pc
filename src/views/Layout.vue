<template>
  <!--  顶部通栏-->
  <app-nav-bar></app-nav-bar>
  <!--  头部组件-->
  <app-header></app-header>
  <!--  吸顶导航栏-->
  <app-header-sticky></app-header-sticky>
  <!--  内容容器-->
  <div class="main">
    <!--    二级路由-->
    <router-view></router-view>
  </div>
  <!--  底部组件-->
  <app-footer></app-footer>
</template>

<script>
import AppNavBar from '@/components/AppNavBar'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import AppHeaderSticky from '@/components/AppHeaderSticky'
import { useStore } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppHeaderSticky,
    AppFooter,
    AppHeader,
    AppNavBar
  },
  setup () {
    // 获取分类数据
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped>

</style>
