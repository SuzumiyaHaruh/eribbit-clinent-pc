<template>
  <div class="goods-image">
    <div class="large" v-show="!isOutside">
      <img v-lazy="images[activeIndex]" alt="" :style="largePos"/>
    </div>
    <div class="middle" ref="target">
      <img v-lazy="images[activeIndex]" alt="">
      <div class="layer" v-show="!isOutside" :style="layerPos"></div>
    </div>
    <ul class="small">
      <li v-for="(item,index) in images" :key="index">
        <img
          @mouseenter="activeIndex = index"
          v-lazy="item"
          alt=""
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { usePreviewImg } from '@/hooks'

export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const activeIndex = ref(0)
    const {
      layerPos,
      largePos,
      isOutside,
      target
    } = usePreviewImg()
    return {
      activeIndex,
      layerPos,
      largePos,
      isOutside,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, .2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  // 大图预览
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
    overflow: hidden;
    z-index: 401;

    img {
      max-width: 800px;
      max-height: 800px;
      width: 800px;
      height: 800px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
