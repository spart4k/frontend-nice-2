<template>
  <div>
    <div :class="$style.wrapper">
      <img v-if="!isHomePage && setImage && !hideImage" :class="$style.heroImage" :src="setImage">
      <div :class="$style.overlay" :style="{backgroundColor: color}" />
      <div :class="$style.bg" />
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

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
  setup (props) {
    const setImage = computed(() => {
      if (props.description.background) {
        return `${require('@/assets/img/background/' + `${props.description.background}.png`)}`
      } else {
        return null
      }
    })
    return {
      setImage
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
  min-height: 100vh;
}
.overlay {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  opacity: 0.5;
  z-index: 2;
  mix-blend-mode: color;
}
.heroImage {
  position: absolute;
  max-height: 35rem;
  z-index: 3;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.bg {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/background/index-background.jpg');
  background-size: cover;
  z-index: 1;
}
</style>
