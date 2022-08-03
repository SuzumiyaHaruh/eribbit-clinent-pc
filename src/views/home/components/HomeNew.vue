<template>
  <div class="home-new">
    <home-panel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <xtx-more path="/"/>
      </template>
      <!-- 面板内容 -->
      <Transition name="fade">
        <ul v-if="list.length" class="goods-list" ref="pannel">
          <li v-for="item in list" :key="item.id">
            <router-link to="/">
              <img v-lazy="item.picture" alt="">
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </router-link>
          </li>
        </ul>
        <home-skeleton v-else></home-skeleton>
      </Transition>
    </home-panel>
  </div>
</template>

<script>

import HomePanel from '@/views/home/components/HomePanel'
import XtxMore from '@/components/library/xtx-more'
import { findNew } from '@/api/home'
import HomeSkeleton from '@/views/home/components/HomeSkeleton'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeNew',
  components: {
    HomeSkeleton,
    XtxMore,
    HomePanel
  },
  setup () {
    // 数据懒加载
    const {
      target,
      list
    } = useLazyData(findNew)
    return {
      list,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
