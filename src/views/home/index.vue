<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <home-category></home-category>
        <!--        轮播图-->
        <home-banner></home-banner>
      </div>
    </div>
    <!--    新鲜好物-->
    <home-new></home-new>
    <!--    人气推荐-->
    <home-hot></home-hot>
    <!--    热门品牌-->
    <home-brand></home-brand>
    <!--    商品区域-->
    <home-product></home-product>
<!--    最新推荐-->
    <home-speical></home-speical>
  </div>
</template>

<script>
import HomeCategory from '@/views/home/components/HomeCategory'
import HomeBanner from '@/views/home/components/HomeBanner'
import HomeNew from '@/views/home/components/HomeNew'
import HomeHot from '@/views/home/components/HomeHot'
import HomeBrand from '@/views/home/components/HomeBrand'
import HomeProduct from '@/views/home/components/HomeProduct'
import HomeSpeical from '@/views/home/components/HomeSpeical'

export default {
  name: 'HomePage',
  components: {
    HomeSpeical,
    HomeProduct,
    HomeBrand,
    HomeHot,
    HomeNew,
    HomeBanner,
    HomeCategory
  }
}
</script>

<style lang="less" scoped>

</style>
