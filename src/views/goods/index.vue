<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!--    面包屑-->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item :to="'/category/'+goods.categories[1].id">{{ goods.categories[1].name }}</xtx-bread-item>
        <xtx-bread-item :to="'/category/'+goods.categories[1].id">{{ goods.categories[0].name }}</xtx-bread-item>
        <Transition name="fade-right" mode="out-in">
          <xtx-bread-item :key="goods.id">{{ goods.name }}</xtx-bread-item>
        </Transition>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 商品信息左边 -->
        <div class="goods-info-left">
          <goods-image :images="goods.mainPictures"/>
          <goods-sales/>
        </div>
        <!-- 商品信息右边 -->
        <div class="goods-info-right">
          <!--          名字区组件-->
          <goods-name :goods="goods"/>
          <!-- 规格组件 -->
          <goods-sku :goods="goods" @change="changeSku"></goods-sku>
          <xtx-numbox v-model="count" :max="goods.inventory"></xtx-numbox>
          <xtx-button type="primary" style="margin-top:20px;">加入购物车</xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <goods-relevant :goodsId="goods.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <goods-tabs/>
          <!-- 注意事项 -->
          <goods-warn/>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <goods-hot :goodsId="goods.id" :type="1"></goods-hot>
          <goods-hot :goodsId="goods.id" :type="2"></goods-hot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XtxBread from '@/components/library/xtx-bread'
import XtxBreadItem from '@/components/library/xtx-bread-item'
import GoodsRelevant from '@/views/goods/components/GoodsRelevant'
import { provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/goods'
import GoodsImage from '@/views/goods/components/GoodsImage'
import GoodsSales from '@/views/goods/components/GoodsSales'
import GoodsName from '@/views/goods/components/GoodsName'
import GoodsSku from '@/views/goods/components/GoodsSku'
import XtxNumbox from '@/components/library/xtx-numbox'
import XtxButton from '@/components/library/xtx-button'
import GoodsTabs from '@/views/goods/components/GoodsTabs'
import GoodsHot from '@/views/goods/components/GoodsHot'
import GoodsWarn from '@/views/goods/components/GoodsWarn'

export default {
  name: 'index',
  components: {
    GoodsWarn,
    GoodsHot,
    GoodsTabs,
    XtxButton,
    XtxNumbox,
    GoodsSku,
    GoodsName,
    GoodsSales,
    GoodsImage,
    GoodsRelevant,
    XtxBreadItem,
    XtxBread
  },
  setup () {
    const goods = ref(null)
    const route = useRoute()
    // 选择的数量
    const count = ref(1)
    // 注意单页面应用路由变化，需要重新获取商品详情
    watch(() => route.params.id, async (id) => {
      // 如果不是商品详情页不处理
      if (route.path !== `/product/${id}`) return
      const { result } = await findGoods(id)
      goods.value = result
      count.value = 1
    }, { immediate: true })
    // 接受子组件传来的数据
    // sku改变时候触发
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    // setup中提供数据,展示评价数量
    provide('goods', goods)
    return {
      goods,
      changeSku,
      count
    }
  }
}
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .goods-info-left {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .goods-info-right {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
