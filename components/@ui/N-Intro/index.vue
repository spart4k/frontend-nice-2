<template>
  <div ref="main" :class="$style.main">
    <div v-if="!noPreview" :class="$style.intro">
      <n-tabs
        :class="[
          $style.tabs,
          showAnimate && $style.animateContent,
          isHideMobileTabs && $style.hideMobileTabs,
        ]"
        class="navbar"
      />
      <n-background ref="background" :color="color" />
      <div
        ref="logo"
        class="logo"
        :class="[$style.logo, showAnimate && $style.animateContent]"
      >
        <NLogoTitle
          :is-home-page="isHomePage"
          :hide-text-logo="hideTextLogo"
        />
      </div>
      <div
        v-if="!isHomePage"
        ref="anchor"
        :class="[$style.linkAnchor, scrollingContent && $style.scrolling]"
      >
        <n-icon name="arrow-top" />
      </div>
    </div>
    <!--    <div-->
    <!--      ref="content"-->
    <!--      :class="[$style.content, (!noPreview && showAnimate) && $style.animateContent]"-->
    <!--      class="content"-->
    <!--    >-->
    <!--      <slot />-->
    <!--    </div>-->
  </div>
</template>

<script>
import { Elastic } from 'gsap'
import { computed, nextTick, onMounted, ref, useContext, useRoute } from '@nuxtjs/composition-api'
import NLogoTitle from './components/NLogoTitle'
import { BLAND_COLOR } from '~/const/blandColor'
import animationGSAP from '~/helpers/compositions/animationGSAP'

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
  setup (props) {
    const { $gsap, store } = useContext()
    const anchor = ref(null)
    const logo = ref(null)
    // const content = ref(null)
    const main = ref(null)
    const wrapper = ref(null)
    const scrollingContent = ref(null)
    const hideTextLogo = ref(false)
    const route = useRoute()

    const isHomePage = computed(() => route.value.name === 'index')
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)

    const {
      background,
      animationlogo,
      animateBackground,
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
        if (logo.value && isHomePage.value && !isPlayAnimation) {
          animationTimeline()
        }
        animationlogo(logo.value)
        animateSubtitle()
        animateBackground()
        animateNavbar()
        localStorage.setItem('showAnimateHomePage', 'true')
      })
    })

    const color = computed(() => {
      const paramsColor = BLAND_COLOR[route.value.params?.slug] || BLAND_COLOR[route.value.name]
      if (paramsColor) {
        return paramsColor
      } else {
        return ''
      }
    })

    return {
      anchor,
      // content,
      wrapper,
      scrollingContent,
      main,
      isHomePage,
      logo,
      background,
      showAnimate,
      color,
      hideTextLogo
    }
  },
  watchQuery: true
}
</script>

<style scoped lang="scss" module>
.wrapperBg{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/img/background/index-background.jpg');
  background-size: contain;
  background-repeat: repeat;
  z-index: 1;
  background-position: 0 0;
  transform: scale(1.2);
  .overlay {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    opacity: 0.35;
    z-index: 2;
    mix-blend-mode: hard-light;
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
  z-index: 11;
  left: 50%;
  transform-origin: top center;
  padding-top: var(--padding-top-logo);
  top: 1rem;
  transform: translateX(-50%);
  @media (max-width:$mobileWidth) {
    top: 7rem;
  }
  &.animateContent {
    transform: translate(-50%, -50%);
    top: 50%;
  }
}
.intro {
  width: 100%;
  color: $white;
  overflow: auto;
  padding-top: 30.5rem;
  @media (max-width: $mobileWidth){
    padding-top: 31.6rem;
  }
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
  transition: opacity 300ms;
  &.animateContent {
    opacity: 0;
  }
  & > * + * {
    margin-top: 2rem;
  }
  &.setHeight {
    min-height: 100%;
  }
}
.linkAnchor {
  position: fixed;
  z-index: 10;
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
