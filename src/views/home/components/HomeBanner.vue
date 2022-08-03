<template>
  <div class="home-banner">
    <xtx-carousel auto-play :sliders="list"></xtx-carousel>
  </div>
</template>

<script>
import XtxCarousel from '@/components/library/xtx-carousel'
import { ref } from 'vue'
import { findBanner } from '@/api/home'

export default {
  name: 'HomeBanner',
  components: { XtxCarousel },
  setup () {
    // 获取轮播图数据
    const list = ref([])
    findBanner()
      .then(data => {
        list.value = data.result
      })
    return {
      list
    }
  }
}
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}

.xtx-carousel {
  :deep(.carousel-btn.prev) {
    left: 270px !important;
  }

  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
