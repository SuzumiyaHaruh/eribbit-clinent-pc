<template>
  <div class="top-category" v-if="cate">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <Transition name="fade-right">
          <xtx-bread-item :key="cate.id">{{ cate.name }}</xtx-bread-item>
        </Transition>
      </xtx-bread>
      <!-- 轮播图 -->
      <xtx-carousel sel :sliders="sliders" style="height:500px"/>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in cate.children" :key="item.id">
            <router-link href="javascript:;" :to="`/category/sub/${item.id}`">
              <img v-lazy="item.picture" alt="">
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="item in cate.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <xtx-more/>
        </div>
        <div class="body">
          <goods-item v-for="goods in item.goods" :key="goods.id" :goods="goods"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XtxBread from '@/components/library/xtx-bread'
import XtxBreadItem from '@/components/library/xtx-bread-item'
import XtxCarousel from '@/components/library/xtx-carousel'
import { ref, watch } from 'vue'
import { findBanner } from '@/api/home'
import { useRoute } from 'vue-router'
import { findTopCategory } from '@/api/category'
import XtxMore from '@/components/library/xtx-more'
import GoodsItem from '@/views/category/components/GoodsItem'

export default {
  name: 'index',
  components: {
    GoodsItem,
    XtxMore,
    XtxCarousel,
    XtxBreadItem,
    XtxBread
  },
  setup () {
    const sliders = ref([])
    const route = useRoute()
    const cate = ref(null)
    // 轮播图
    findBanner(2).then(data => {
      sliders.value = data.result
    })
    // // 获取一级分类数据
    // findTopCategory(route.params.id).then(data => {
    //   cate.value = data.result
    // })
    // 推荐商品
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        cate.value = data.result
      })
    }
    // 使用监听，切换路由重新加载页面
    watch(() => route.params.id, (id) => {
      // 如果不是一级分类页，就不发送一级分类请求
      if (`/category/${id}` !== route.path) return
      id && getSubList()
    }, { immediate: true })
    return {
      sliders,
      cate
    }
  }
}
</script>

<style lang="less" scoped>
.top-category {

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &
          :hover {
            color: @xtxColor;
          }

        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
