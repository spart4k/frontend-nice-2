<template>
  <!--  :style="{ paddingTop: !isHomePage ? '15.5rem' : '27.7rem' }-->
  <div ref="main" :class="[$style.main, !isHomePage && $style.paddingSlug]">
    <div :class="$style.intro">
      <n-tabs
        class="navbarSlug"
        :class="[
          $style.tabs,
          showAnimate && $style.animateContent,
        ]"
      />
      <div
        ref="logo"
        class="logo"
        :style="{ left: sheetWidth ? `calc(50% + ${sheetWidth/2}px)` : '50%' }"
        :class="[$style.logo, showAnimate && $style.animateContent]"
      >
        <N-Logo
          :is-home-page="isHomePage"
          :hide-text-logo="hideTextLogo"
          default-logo
        />
      </div>
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
import { computed, nextTick, ref, useContext, useRoute, inject, watch, onMounted } from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import { BLAND_COLOR } from '~/const/blandColor'
import { BLAND_IMAGE } from '~/const/blandImage'
import animationGSAP from '~/helpers/compositions/animationGSAP'

// import animationGSAP from '~/helpers/compositions/animationGSAP'

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
    const { store, $gsap } = useContext()
    const anchor = ref(null)
    const logo = ref(null)
    const main = ref(null)
    const wrapper = ref(null)
    const scrollingContent = ref(null)
    const hideTextLogo = ref(false)
    const route = useRoute()
    const isHomePage = computed(() => route.value.name === 'index')
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const sheetWidth = inject('sheetWidth')
    const backgroundLoaded = inject('backgroundLoaded')
    const backgroundImage = computed(() => {
      if (!isHomePage.value) {
        return require('@/assets/img/background/default-background.png')
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

    const {
      animationlogo,
      animateSubtitle,
      animateNavbar,
      animationTimeline
    } = animationGSAP($gsap, Elastic)

    onMounted(() => {
      if (backgroundLoaded.value) {
        nextTick(() => {
          const isPlayAnimation = JSON.parse(localStorage.getItem('showAnimateHomePage'))
          if (isPlayAnimation) {
            store.commit('content/setAnimate', false)
          }
          if (!isPlayAnimation) {
            animationTimeline('.navbarSlug')
          }
          //   animationTimeline('.navbarSlug')

          animationlogo()
          animateSubtitle()
          animateNavbar('.navbarSlug')
          // localStorage.setItem('showAnimateHomePage', 'true')
        })
      }
    })

    watch(() => backgroundLoaded.value, () => {
      nextTick(() => {
        const isPlayAnimation = JSON.parse(localStorage.getItem('showAnimateHomePage'))
        if (isPlayAnimation) {
          store.commit('content/setAnimate', false)
        }
        if (!isPlayAnimation) {
          animationTimeline('.navbarSlug')
        }
        animationlogo()
        animateSubtitle()
        animateNavbar('.navbarSlug')
      })
    })

    return {
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
      backgroundLoaded
    }
  },
  watchQuery: true
}
</script>

<style scoped lang="scss" module>
.main {
  padding-top: 17.5rem;
  @media (max-width: $mobileWidth) {
    padding-top: 23.6rem;
  }
  &.paddingSlug {
    padding-top: 15.5rem;
  }
}
.tabs {
  margin: 0;
  // position: fixed;
  // top: 17.5rem;
  z-index: 3;
  width: 100%;
  // max-width: 1440px;
  // margin-left: auto;
  // margin-right: auto;
  margin-bottom: 5.815rem;
  will-change: transform;
  @media (max-width: $tabletWidth) {
    // top: 23.6rem;
    margin-bottom: 4rem;
  }
  &.animateContent {
    visibility: hidden;
  }
}

.logo {
  position: fixed;
  z-index: var(--logo-z-index);
  top: 0;
  left: 50%;
  transform-origin: top center;
  padding-top: var(--padding-top-logo);
  transform: translate(-50%, 0);
  cursor: pointer;
  //width: 35rem;
  //height: 15.9rem;
  &.animateContent {
    top: 50%;
    visibility: hidden;
    transform: translate(-50%, -50%);
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
