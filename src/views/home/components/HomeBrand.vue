<template>
  <home-panel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a @click="moveX = 0" :class="{ disabled: moveX === 0  }" href="javascript:;"
         class="iconfont icon-angle-left prev"></a>
      <a @click="moveX = '-50%'" :class="{ disabled: moveX === '-50%'  }" href="javascript:;"
         class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box">
      <Transition name="fade">
        <ul v-if="brands.length" class="list" :style="`transform: translateX(${ moveX });`">
          <li v-for="item in brands" :key="item.id">
            <router-link to="/">
              <img v-lazy="item.picture" alt="">
            </router-link>
          </li>
        </ul>
        <!-- 🔔开发的时候可以先把所需的骨架屏写完，后面再添加 v-if 和 v-else -->
        <div v-else class="skeleton">
          <xtx-skeleton class="item" v-for="i in 5" :key="i" width="240px" height="305px" bg="#e4e4e4"></xtx-skeleton>
        </div>
      </Transition>
    </div>
  </home-panel>
</template>

<script>
import HomePanel from '@/views/home/components/HomePanel'
import { ref } from 'vue'
import { useLazyData } from '@/hooks'
import { findBrand } from '@/api/home'
import XtxSkeleton from '@/components/library/xtx-skeleton'

export default {
  name: 'HomeBrand',
  components: {
    XtxSkeleton,
    HomePanel
  },
  setup () {
    // 调用数据懒加载函数获取数据
    const {
      list,
      target
    } = useLazyData(findBrand)
    // console.log(list)
    // 切换效果，所需坐标
    const moveX = ref(0)
    return {
      brands: list,
      target,
      moveX
    }
  }
}
</script>

<style lang="less" scoped>
.home-panel {
  background: #f5f5f5
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;

  .item {
    margin-right: 10px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
