<template>
  <div :class="[$style.logo, $style[size], defaultLogo && $style.defaultLogo]">
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
    <div :class="$style.wrapperImage">
      <img
        src="@/assets/img/subtitle.png"
        alt="subtitle"
        class="subtitleLogo"
        :class="[$style.imageSubtitle, showAnimate && $style.animateContent]"
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
  setup () {
    const { store } = useContext()
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
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
    padding-bottom: 1.2rem;
    line-height: 0;
    @media (max-width: $mobileWidth) {
      //width: 16.3rem;
      padding-bottom: .91rem;
    }
  }
  .imageSubtitle {
    display: block;
    line-height: 0;
    will-change: transform;
    width: 100%;
    transition: opacity 0.3s ease;
    opacity: 1;
    //&.animateContent {
    //  opacity: 0;
    //}
  }
}
.sm {
  width: 7.2rem;
}
.defaultLogo {
  width: 18rem;
}

</style>
