<template>
  <div v-lazy:background-image="backgroundImage" :alt="backgroundImage" :class="[$style.wrapper, $style.bg]">
    <div :class="$style.overlay" :style="{backgroundColor: isHomePage ? '#292BC2' : color }" />
  </div>
</template>

<script>
import { computed, onMounted } from '@nuxtjs/composition-api'

export default {
  name: 'NBackground',
  props: {
    description: {
      type: Object,
      default: () => {
        return {
          background: ''
        }
      }
    },
    hideImage: Boolean,
    isHomePage: Boolean,
    color: String
  },
  setup (_, ctx) {
  const { emit } = ctx
  const { $Lazyload } = ctx.root
  const backgroundImage = computed(() => {
      return require('~/assets/img/background/default-background.jpeg')
  })
  onMounted(() => {
    $Lazyload.$once('loaded', ({ el, src }) => {
      emit('backgroundLoaded')
    })
  })
  return {
  backgroundImage
}
  }
}
</script>

<style scoped lang="scss" module>
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  // background-image: url('@/assets/img/background/coin-background.png');
  background-size: cover;
  transform: scale(1.3);
}
.overlay {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  opacity: 0.5;
  z-index: 2;
  mix-blend-mode: hard-light;
  transition: background-color .5s;
}
</style>
