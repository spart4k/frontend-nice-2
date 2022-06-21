<template>
  <div :class="$style.bg" :style="{ backgroundImage: setBackgroundImage}">
    <img v-if="!isHomePage && setImage" :src="setImage">
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
    isHomePage: Boolean
  },
  setup (props) {
    const setBackgroundImage = computed(() => {
      if (props.description.background) {
        return `url(${require('@/assets/img/background/' + `${props.description.background}-background.jpg`)})`
      } else {
        return `url(${require('@/assets/img/background/index-background.jpg')})`
      }
    })

    const setImage = computed(() => {
      if (props.description.background) {
        return `${require('@/assets/img/background/' + `${props.description.background}.png`)}`
      } else {
        return null
      }
    })
    return {
      setBackgroundImage,
      setImage
    }
  }
}
</script>

<style scoped lang="scss" module>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: -webkit-fill-available;
  background-size: cover;
@media (max-width: $bgWidth) {
  background-size: 100% 100vh;
}
img {
  max-height: 53rem;
}
}
</style>
