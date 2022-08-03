<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i class="iconfont" :class="modelValue ? 'icon-checked' : 'icon-unchecked'"/>
    <!--    <i class="iconfont icon-unchecked"></i>-->
    <span v-if="$slots.default"> <slot/> </span>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core/index'

export default {
  name: 'xtx-checkbox',
  // 🔔 Vue3 的 v-model 是  :modelValue 和 @update:modelValue 组成的语法糖。
  props: {
    // 子组件接收布尔值
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 如果用useVModel实现双向数据绑定v-middle指令
    // 1.使用props接收modelValue
    // 2.使用useVModel来包装props中的modelValue属性数据
    // 3.在用checked.value就是使用父组件数据
    // 4.在使用checked.value='数据’赋值，触发emit（‘update：modelvalue’,数据）
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件取反
      checked.value = newVal
    }
    return {
      checked,
      changeChecked
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  cursor: pointer;
  user-select: none;

  .icon-checked {
    color: @xtxColor;

    ~ span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>
