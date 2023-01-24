<template>
  <div v-lazy:background-image="backgroundImage" :alt="backgroundImage" :class="[$style.wrapper, $style.bg]">
    <div :class="$style.overlay" :style="{backgroundColor: 'transparent' }" />
  </div>
</template>

<script>
import { computed, onMounted, useContext } from '@nuxtjs/composition-api'
import { BLAND_BACKGROUNDS } from '~/const/blandBackgrounds'
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
    console.log(BLAND_BACKGROUNDS)
    const { route } = useContext()
    console.log(route.value.params.slug)
    const { $Lazyload } = ctx.root
    const backgroundImage = computed(() => {
        if (route.value.params.slug === undefined) {
          return `/backgrounds/${BLAND_BACKGROUNDS.music}`
        } else {
          return `/backgrounds/${BLAND_BACKGROUNDS[route.value.params.slug]}`
        }
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
