<template>
  <div class="bread-crumbs-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'xtx-bread-item',
  props: {
    to: {
      type: [String, Object]
    }
  }
}
</script>
