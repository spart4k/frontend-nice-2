<template>
  <div ref="main" :class="$style.main" :style="{ paddingTop: !isHomePage ? '15.5rem' : '31.6rem' }">
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
import { computed, nextTick, onMounted, ref, useContext, useRoute } from '@nuxtjs/composition-api'
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

    const backgroundImage = computed(() => {
      if (!isHomePage.value) {
        return require('@/assets/img/background/coin-background.png')
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
        localStorage.setItem('showAnimateHomePage', 'true')
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
      backgroundImage
    }
  },
  watchQuery: true
}
</script>

<style scoped lang="scss" module>
.tabs {
  margin: 0;
  position: fixed;
  top: 17.5rem;
  z-index: 3;
  width: 100%;
  will-change: transform;
  @media (max-width: $tabletWidth) {
    top: 23.6rem;
  }
  &.animateContent {
    visibility: hidden;
  }
}

.logo {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 50%;
  transform-origin: top center;
  padding-top: var(--padding-top-logo);
  transform: translate(-50%, 0);
  &.animateContent {
    top: 50%;
    border: 2px solid red;
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
