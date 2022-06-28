<template>
  <div :class="$style.overlay">
    <div :class="$style.loader">
      <svg :class="$style.circular" viewBox="25 25 50 50">
        <circle
          :class="$style.path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="2"
          stroke-miterLimit="10"
        />
      </svg>
    </div>
  </div>
</template>
<script>
import { onMounted, onUnmounted } from '@nuxtjs/composition-api'

export default {
  name: 'NPreloader',
  setup () {
    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })
    onUnmounted(() => {
      document.body.style.overflow = ''
    })
  }
}
</script>

<style scoped lang="scss" module src="./style.scss"></style>
