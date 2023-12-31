<template>
  <!--  :style="{ paddingTop: !isHomePage ? '15.5rem' : '27.7rem' }-->
  <div ref="main" :class="[$style.main, !isHomePage && $style.paddingSlug]">
    <div :class="$style.intro">
      <div
        v-if="!isHomePage"
        ref="anchor"
        :class="[$style.linkAnchor, scrollingContent && $style.scrolling]"
      >
        <n-icon name="arrow-bottom" />
      </div>
    </div>
    <section>
      <slot />
    </section>
  </div>
</template>

<script>
import { computed, ref, useContext, useRoute, inject } from '@nuxtjs/composition-api'
import { BLAND_COLOR } from '~/const/blandColor'
import { BLAND_IMAGE } from '~/const/blandImage'

export default {
  name: 'NIntro',
  props: {
    description: {
      type: Object
    },
    setHeight: {
      type: Boolean
    },
    noPreview: {
      type: Boolean
    },
    content: {
      type: Object
    },
    isShowAnimation: {
      type: Boolean
    },
    isHideMobileTabs: {
      type: Boolean
    }
  },
  setup () {
    const { store } = useContext()
    const anchor = ref(null)
    const logo = ref(null)
    const main = ref(null)
    const wrapper = ref(null)
    const elementAnimate = ref(null)
    const scrollingContent = ref(null)
    const hideTextLogo = ref(false)
    const route = useRoute()
    const isHomePage = computed(() => route.value.name === 'index')
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const sheetWidth = inject('sheetWidth')
    const backgroundLoaded = inject('backgroundLoaded')
    const backgroundImage = computed(() => {
      if (!isHomePage.value) {
        return require('@/assets/img/background/default-background.jpeg')
      }
        return require('@/assets/img/background/index-background.jpg')
    })

    const color = computed(() => {
      const paramsColor = BLAND_COLOR[route.value.params?.slug] || BLAND_COLOR[route.value.name]
      if (paramsColor) {
        return paramsColor
      } else {
        return ''
      }
    })
    const image = computed(() => {
      const paramsImage = BLAND_IMAGE[route.value.params?.slug] || BLAND_IMAGE[route.value.name]
      if (paramsImage) {
        return paramsImage
      } else {
        return ''
      }
    })

    return {
      elementAnimate,
      anchor,
      wrapper,
      scrollingContent,
      main,
      isHomePage,
      logo,
      showAnimate,
      color,
      image,
      hideTextLogo,
      sheetWidth,
      backgroundImage,
      backgroundLoaded,
      BLAND_COLOR
    }
  },
  watchQuery: true
}
</script>

<style scoped lang="scss" module>

.animate {
  width: 400px;
  height: 100px;
}
.main {
  // padding-top: 17.5rem;
  @media (max-width: $mobileWidth) {
    // padding-top: 23.6rem;
  }
  &.paddingSlug {
    padding-top: 15.5rem;
  }
}

.logo {
  position: fixed;
  z-index: var(--logo-z-index);
  top: 0;
  left: 50%;
  transform-origin: top center;
  padding-top: var(--padding-top-logo);
  transform: translate(-50%, 0%) translate3d(0px, 0px, 0px) scale(1, 1);
  cursor: pointer;
  //height: 15.9rem;
  &.animateContent {
    top: 50%;
    visibility: hidden;
    transform: translate(-50%, 0%) translate3d(0px, 0px, 0px) scale(1, 1);
  }
  @media (max-width: $mobileWidth) {
    top: 7rem;
  }
}
.wrapper__content {
  position: relative;
}
.linkAnchor {
  position: fixed;
  z-index: 0;
  bottom: 6.8rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: visible;
  transition: opacity 0.1s ease-in-out;
  cursor: pointer;
}
.scrolling {
  opacity: 0;
  pointer-events: none;
}
</style>
