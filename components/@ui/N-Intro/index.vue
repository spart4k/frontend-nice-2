<template>
  <main ref="main" :class="$style.main">
    <div v-if="!noPreview" :class="[$style.intro]">
      <!--      <N-Background-->
      <!--        :hide-image="scrollingContent"-->
      <!--        :is-home-page="isHomePage"-->
      <!--        :description="description"-->
      <!--        :color="color"-->
      <!--      />-->
      <div :class="$style.wrapperBg">
        <img v-if="!isHomePage && setImage && !hideImage" :class="$style.heroImage" :src="setImage">
        <div :class="$style.overlay" :style="{backgroundColor: color}" />
        <div ref="background" :class="$style.bg" />
      </div>
      <div
        v-if="isHomePage"
        ref="logo"
        class="logo"
        :class="$style.logo"
      >
        <NLogoTitle
          :is-home-page="isHomePage"
          :description="description"
          :hide-text-logo="hideTextLogo"
        />
      </div>
      <div v-else>
        <NLogoTitle
          ref="logo"
          :is-home-page="isHomePage"
          :description="description"
        />
      </div>
      <div
        ref="anchor"
        :class="[$style.linkAnchor, scrollingContent && $style.scrolling]"
        @click="scrollTo"
      >
        <n-icon name="arrow-top" />
      </div>
    </div>
    <div
      ref="content"
      class="content"
      :class="[$style.wrapper__content, setHeight && $style.setHeight]"
    >
      <n-tabs :class="$style.tabs" />
      <div :class="$style.content">
        <slot />
      </div>
    </div>
  </main>
</template>

<script>
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { computed, nextTick, onMounted, ref, useContext, useRoute } from '@nuxtjs/composition-api'
import { scrollBy } from 'seamless-scroll-polyfill'
import NLogoTitle from './components/NLogoTitle'
import { BLAND_COLOR } from '~/const/blandColor'

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
    }
  },
  setup (_, ctx) {
    const { $gsap } = useContext()
    const anchor = ref(null)
    const logo = ref(null)
    const background = ref(null)
    const content = ref(null)
    const main = ref(null)
    const wrapper = ref(null)
    const scrollingContent = ref(null)
    const hideTextLogo = ref(false)
    const route = useRoute()
    const boundingLogo = ref()
    const isHomePage = computed(() => route.value.name === 'index')

    onMounted(() => {
      nextTick(() => {
        $gsap.registerPlugin(ScrollTrigger)
        boundingLogo.value = logo.value.getBoundingClientRect()
        ScrollTrigger.addEventListener('refreshInit', () => {
          boundingLogo.value = logo.value.getBoundingClientRect()
        })
        ScrollTrigger.matchMedia({
          '(max-width: 900px)' () {
            const tl = $gsap.timeline({
              scrollTrigger: {
                trigger: '.content',
                start: () => `top ${boundingLogo.value.bottom + 30}px`,
                transformOrigin: 'center',
                end: 'top top',
                scrub: true,
                markers: true,
                onEnter: () => {
                  hideTextLogo.value = true
                },
                onLeaveBack: () => {
                  hideTextLogo.value = false
                }
              }
            })
            tl.to('.logo', {
              y: () => {
                return (boundingLogo.value.top) * -1
              },
              autoAlpha: 1,
              scale: 0.5
            })
           }
        })
        $gsap.to(background.value, {
          backgroundPosition: `50% ${-window.innerHeight}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: '.content',
            scrub: true
          }
        })
      })
    })

    const scrollTo = () => {
      const contentBounding = content.value.getBoundingClientRect()
      scrollBy(main.value, { behavior: 'smooth', top: contentBounding.top - 90 })
    }
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
      content,
      wrapper,
      scrollingContent,
      main,
      isHomePage,
      logo,
      background,
      scrollTo,
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
  min-height: 100vh;
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
  .bg {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/background/index-background.png');
    background-size: cover;
    z-index: 1;
  }
}

.main {
  padding-top: 30.5rem;
  @media (max-width: $mobileWidth){
    padding-top: 26.6rem;
  }
  @media (max-width: $tabletWidth){
    padding-top: 32.6rem;
  }
}
.logo {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: top center;
  padding-top: 2rem;
  @media (max-width: $tabletWidth){
    top: 7rem;
    padding-top: 4rem;
  }
}
.intro {
  width: 100%;
  color: $white;
  overflow: auto;
  .visually-hidden {
    position: fixed;
    transform: scale(0);
  }
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
    img {
      max-height: 53rem;
    }
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
.tabs {
  margin-bottom: 4rem;
  padding-left: 1.5rem;
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
