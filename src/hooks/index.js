// hooks(封装)逻辑，提供响应式数据
import { reactive, ref, watch } from 'vue'
import { useIntersectionObserver, useMouseInElement } from '@vueuse/core'

// 数据懒加载函数
export const useLazyData = (apiFn) => {
  // 1.观察的对象
  const target = ref(null)
  // 2.用于存放后台数据的变量
  const list = ref([])
  // stop             用于停止检测函数
  // target           被检测的元素
  // isIntersecting   布尔值，元素是否可见 true/false
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      // 如果元素可以，发送请求获取数据，并停止检测避免重复发送请求
      if (isIntersecting) {
        console.log(target.value, '元素可见可以发请求了.....')
        // 调用 API 获取数据
        apiFn().then(({ result }) => {
          list.value = result
        })
        stop()
      }
    }
  )
  // 钩子函数返回---> 响应式数据（目标元素, 后台数据）
  return {
    list,
    target
  }
}
// 图片放大镜
export const usePreviewImg = () => {
  // 需要获取鼠标坐标的目标盒子
  const target = ref(null)
  // isOutside            表示目标元素外面/里面
  // elementX/elementY    鼠标在盒子内的坐标
  const {
    isOutside,
    elementX,
    elementY
  } = useMouseInElement(target)

  // 定义响应式数据，更新数据的时候更新视图
  const layerPos = reactive({
    left: 0,
    top: 0
  })
  const largePos = reactive({
    left: 0,
    top: 0
  })

  // 监听鼠标的两个坐标值
  watch([elementX, elementY], () => {
    // -100  =>  让盒子和鼠标的中心对齐
    let left = elementX.value - 100
    let top = elementY.value - 100

    // 盒子的边界判断，左上右下的四个边界都要判断
    if (left < 0) left = 0
    if (top < 0) top = 0
    if (left > 200) left = 200
    if (top > 200) top = 200

    // 样式需要加 px 单位
    layerPos.left = left + 'px'
    layerPos.top = top + 'px'

    // 大图移动
    // -1   =>  反向移动
    // 2    =>  小图和大图的比例是 1:2 倍
    largePos.left = -1 * 2 * left + 'px'
    largePos.top = -1 * 2 * top + 'px'
  })
  return {
    target,
    isOutside,
    layerPos,
    largePos
  }
}
