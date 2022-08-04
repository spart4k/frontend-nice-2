<template>
  <div ref="main" :class="$style.main" :style="{ paddingTop: !isHomePage ? '15.5rem' : '31.6rem' }">
    <div v-if="!noPreview" :class="$style.intro">
      <n-tabs
        :class="[
          $style.tabs,
          isHideMobileTabs && $style.hideMobileTabs,
        ]"
        class="navbar"
      />
      <NLogoTitle
        :description="description"
        :image="image"
      />
    </div>
    <section :class="$style.container">
      <slot />
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref, useRoute, useContext } from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import NLogoTitle from './components/NLogoTitle'

import animationGSAP from '~/helpers/compositions/animationGSAP'

import { BLAND_COLOR } from '~/const/blandColor'
import { BLAND_IMAGE } from '~/const/blandImage'

export default {
  name: 'NIntro',
  components: {
    NLogoTitle
  },
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
    const logo = ref(null)
    const main = ref(null)
    const wrapper = ref(null)
    const scrollingContent = ref(null)
    const hideTextLogo = ref(false)
    const route = useRoute()
    const { $gsap } = useContext()
    const isHomePage = computed(() => route.value.name === 'index')

    const {
      animationlogo,
      animateSubtitle,
      animateNavbar
    } = animationGSAP($gsap, Elastic)

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

    onMounted(() => {
      animationlogo()
      animateSubtitle()
      animateNavbar()
    })

    return {
      wrapper,
      scrollingContent,
      main,
      isHomePage,
      logo,
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
.container {
  @include container;
}
.wrapperBg{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/img/background/index-background.jpg');
  background-size: cover;
  background-repeat: repeat;
  z-index: 1;
  background-position: 0 0;
  .overlay {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    opacity: 0.6;
    z-index: 2;
    mix-blend-mode: overlay;
  }
  .heroImage {
    position: absolute;
    max-height: 35rem;
    z-index: 3;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}
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
  &.hideMobileTabs {
    @media (max-width: $mobileWidth) {
      display: none;
    }
  }
  &.animateContent {
    visibility: hidden;
    //transform: translateX(100%);
  }
}

.logo {
  position: fixed;
  z-index: 999;
  //top: 0;
  left: 50%;
  transform-origin: top center;
  padding-top: var(--padding-top-logo);
  top: 9rem;
  transform: translate(-50%, 0);
  @media (max-width: $tabletWidth){
    top: 7rem;
  }
  &.animateContent {
    top: 50%;
    border: 2px solid red;
  }
  //@media (max-width: $tabletWidth){
  //  top: 7rem;
  //}
}
.intro {
  width: 100%;
  color: $white;
  overflow: auto;
  .visually-hidden {
    position: fixed;
    transform: scale(0);
  }
  .wrapper {
    height: 100%;
    position: relative;
    z-index: 2;
  }
  .shim {
    height: 100vh;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  img {
    max-width: 100%;
  }
  &__title {
    @include title;
    @include montserratBlack;
    margin-bottom: 2rem;
  }
  &__subtitle {
    @include Bankir-Retro;
    @include text;
    color: rgba($white, .85);
    width: 20.5rem;
    line-height: 2.9rem;
    transition: opacity 0.6s ease;
    &.hideTextLogo {
      opacity: 0;
    }
  }
  &__subtitle_homePage {
    @include subtitle;
    width: auto;
  }

  &__logo_subtitle_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__container {
    @include container;
    position: fixed;
    z-index: 1;
    transition: opacity 0.2s ease-in-out;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
  &__logo {
    width: 20.2rem;
  }
}
.wrapper__content {
  position: relative;
}
.content {
  @include container;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  padding-bottom: 5rem;
  width: 100%;
  // opacity: 0;
  transition: opacity 300ms;
  & > * + * {
    margin-top: 2rem;
  }
  &.setHeight {
    min-height: 100%;
  }
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
