<template>
  <!--<div v-lazy:background-image="backgroundImage" :alt="backgroundImage" :class="[$style.wrapper, $style.bg]">
    <div :class="$style.overlay" :style="{backgroundColor: 'transparent' }" />
  </div>-->
  <div class="background" :class="$style.backgroundWrap">
    <img
    rel="preload"
    v-for="(item, index) of BLAND_BACKGROUNDS"
    :key="index"
    :src="item.image ? `/backgrounds/${item.image}` : `/backgrounds/index.jpg`"
    :alt="item"
    :class="[$style.wrapper, $style.bg, pageName === item.key ? $style.show : '' ]">
    <!--</div>-->
    <div :class="$style.overlay" :style="{backgroundColor: isHomePage ? '#292BC2' : $props.color }" />
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
    const { route } = useContext()
    const { $Lazyload } = ctx.root
    const backgroundImage = computed(() => {
        if (route.value.params.slug === undefined) {
          return `/backgrounds/${BLAND_BACKGROUNDS.music}`
        } else {
          return `/backgrounds/${BLAND_BACKGROUNDS[route.value.params.slug]}`
        }
    })
    const pageName = computed(() => {
      if (route.value.params.slug) {
        return route.value.params.slug
      } else {
        return 'index'
      }
    })
    onMounted(() => {
      $Lazyload.$once('loaded', ({ el, src }) => {
        emit('backgroundLoaded')
      })
    })
    return {
      backgroundImage,
      BLAND_BACKGROUNDS,
      route,
      pageName
    }
  }
}
</script>

<style scoped lang="scss" module>
.backgroundWrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: scale(1.3);
}
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
  object-fit: cover;
  object-position: 50% 0%;
  display: none;
  &.show {
    display: block;
  }
}
.overlay {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  min-height: 100vh;
  opacity: 0.8;
  z-index: 2;
  mix-blend-mode: multiply;
  pointer-events: none;
  transition: background-color .25s;
}
</style>
