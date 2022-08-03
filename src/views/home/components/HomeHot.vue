<template>
  <home-panel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <Transition name="fade">
      <ul v-if="list.length" ref="pannel" class="goods-list">
        <li v-for="item in list" :key="item.id">
          <router-link to="/">
            <img v-lazy="item.picture" alt="">
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </router-link>
        </li>
      </ul>
      <home-skeleton v-else></home-skeleton>
    </Transition>
  </home-panel>
</template>
·
<script>
import HomePanel from '@/views/home/components/HomePanel'
import { findHot } from '@/api/home'
import HomeSkeleton from '@/views/home/components/HomeSkeleton'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeHot',
  components: {
    HomeSkeleton,
    HomePanel
  },
  setup () {
    const {
      target,
      list
    } = useLazyData(findHot)
    return {
      target,
      list
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
