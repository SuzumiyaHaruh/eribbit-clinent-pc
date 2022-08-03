<template>
  <div class="goods-hot">
    <h3 v-if="type === 1">24小时热销榜</h3>
    <h3 v-else-if="type === 2">热销周榜</h3>
    <h3 v-else-if="type === 3">热销总榜</h3>
    <goods-item v-for="item in list" :key="item.id" :goods="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from '@/views/category/components/GoodsItem'
import { ref } from 'vue'
import { findHotGoods } from '@/api/goods'

export default {
  name: 'GoodsHot',
  components: { GoodsItem },
  props: {
    goodsId: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const list = ref([])
    findHotGoods({
      id: props.goodsId,
      type: props.type
    })
      .then(({ result }) => {
        list.value = result
      })
    return {
      list
    }
  }
}
</script>

<style lang="less" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      margin: 0 10px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
