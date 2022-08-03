<template>
  <div class='sub-sort'>
    <div class="sort">
      <a
        :class="{ active: reqParams.sortField === undefined }"
        @click="changeSort()"
        href="javascript:;"
      >
        默认排序
      </a>
      <a
        :class="{ active: reqParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
      >
        最新商品
      </a>
      <a
        :class="{ active: reqParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
      >
        最高人气
      </a>
      <a
        :class="{ active: reqParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
      >
        评论最多
      </a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i
          :class="{ active: reqParams.sortMethod === 'asc' }"
          class="arrow up"
        />
        <i
          :class="{ active: reqParams.sortMethod === 'desc' }"
          class="arrow down"
        />
      </a>
    </div>
    <div class="check">
      <xtx-checkbox v-model="reqParams.inventory">仅显示有货商品</xtx-checkbox>
      <xtx-checkbox v-model="reqParams.onlyDiscount">仅显示特惠商品</xtx-checkbox>
    </div>
  </div>
</template>

<script>
import XtxCheckbox from '@/components/library/xtx-checkbox'
import { inject } from 'vue'

export default {
  name: 'SubSort',
  components: { XtxCheckbox },
  setup () {
    // 获取数据，当前组件负责收集请求参数
    const reqParams = inject('reqParams')
    const changeSort = (sortField) => {
      // 1.0 先收集排序方式
      reqParams.sortField = sortField
      if (sortField === 'price') {
        // 2.0 收集价格排序规则
        if (sortField.sortMethod === null) {
          sortField.sortMethod = 'desc'
        } else {
          reqParams.sortMethod = reqParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 💥 3.0 不是价格排序，就把价格排序字段清空
        reqParams.sortMethod = undefined
      }
    }
    return {
      reqParams,
      changeSort
    }
  }
}
</script>

<style lang="less" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;

      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
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

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
