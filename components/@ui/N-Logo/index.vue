<template>
  <div :class="[$style.logo, $style[size]]">
    <div
      :class="[$style.wrapperImage, showAnimate && $style.animateContent]"
    >
      <img
        v-if="showLogo"
        src="@/assets/img/logo.png"
        alt="Логотип Nice"
        class="logo_image"
        :class="$style.logoImage"
      >
    </div>
    <div :class="[$style.wrapperImage, showAnimate && $style.animateContent]">
      <img
        src="@/assets/img/subtitle.png"
        alt="subtitle"
        class="subtitleLogo"
        :class="$style.imageSubtitle"
      >
    </div>
  </div>
</template>

<script>

import { computed, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'NLogo',
  props: {
    size: {
      type: String,
      default: ''
    },
    defaultLogo: {
      type: Boolean
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    isHomePage: {
      type: Boolean
    }
  },
  setup (props) {
    const { store } = useContext()
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage && props.isHomePage)
    return {
      showAnimate
    }
  }
}
</script>

<style scoped lang="scss" module>
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  will-change: transform;
  img {
    width: 100%;
  }
  .logoImage {
    display: block;
    padding-bottom: 0.9rem;
    line-height: 0;
  }
  .imageSubtitle {
    display: block;
    line-height: 0;
    will-change: transform;
    width: 100%;
  }
}
.sm {
  width: 7.2rem;
}
.md {
  width: 16.3rem;
}

</style>
