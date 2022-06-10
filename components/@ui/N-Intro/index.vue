<template>
  <div>
    <div :class="$style.intro">
      <div :class="$style.bg" />
      <div ref="wrapper" :class="$style.wrapper">
        <div :class="[$style.intro__container, scrollingContent && $style.scrolling]">
          <h1 v-if="!isHomePage" :class="$style.intro__title">
            {{ description.title }}
          </h1>

          <div :class="[isHomePage && $style.intro__logo_subtitle_wrapper]">
            <div :class="[isHomePage && $style.intro__subtitle_homePage ,$style.intro__subtitle]">
              {{ description.subtitle }}
            </div>
            <div v-if="isHomePage" :class="$style.intro__logo">
              <n-logo size="big" />
            </div>
          </div>
        </div>
        <div :class="$style.shim" />
        <div ref="anchor" :class="[$style.linkAnchor, scrollingContent && $style.scrolling]">
          <div @click="scrollTo">
            <n-icon name="arrow-top" />
          </div>
        </div>
        <div ref="content" :class="$style.content">
          <slot />
        </div>
        <the-footer />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, useRoute } from '@nuxtjs/composition-api'
import { scrollBy } from 'seamless-scroll-polyfill'

export default {
  name: 'NIntro',
  props: {
    description: {
      type: Object
    }
  },
  setup () {
    const anchor = ref(null)
    const content = ref(null)
    const wrapper = ref(null)
    const scrollingContent = ref(null)
    const route = useRoute()
    const isHomePage = computed(() => route.value.name === 'index')

    onMounted(() => {
      // document.body.style.backgroundImage = `url(${require('@/assets/img/background.png')})`
      // const vh = window.innerHeight * 0.01
      // document.documentElement.style.setProperty('--vh', `${vh}px`)
      // window.addEventListener('resize', () => {
      //   // We execute the same script as before
      //   const vh = window.innerHeight * 0.01
      //   document.documentElement.style.setProperty('--vh', `${vh}px`)
      // })
      const options = {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
      }

      const callback = (entries) => {
        if (entries[0].isIntersecting) {
          scrollingContent.value = true
        } else {
          scrollingContent.value = false
        }
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(content.value)
    })

    const scrollTo = () => {
      const contentBounding = content.value.getBoundingClientRect()
      scrollBy(wrapper.value, { behavior: 'smooth', top: contentBounding.top - 90 })
    }
    return {
      anchor,
      content,
      wrapper,
      scrollingContent,
      isHomePage,
      scrollTo
    }
  }
}
</script>

<style scoped lang="scss" module>
.intro {
  width: 100%;
  min-height: -webkit-fill-available;
  //height: calc(var(--vh, 1vh) * 100);
  height: calc(100% - var(--header-height));
  color: $white;
  padding-top: $headerHeight;
  overflow: auto;
  .bg {
    background-image: url('@/assets/img/background.png');
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    min-height: 100vh;
    //height: calc(100% - var(--footer-height));
    height: -webkit-fill-available;
    background-size: cover;
  }
  .wrapper {
    height: 100%;
    position: relative;
    z-index: 2;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .shim {
    min-height: -webkit-fill-available;
    //height: calc((var(--vh, 1vh) * 100) - var(--header-height));
    height: calc(100vh - var(--header-height));
    margin-top: 7.9rem;
    width: 100%;
    position: relative;
    z-index: 10;
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
    width: 15.5rem;
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
    margin-top: 7.9rem;
    position: fixed;
    z-index: 1;
    transition: opacity 0.3s ease-in-out;
    //top: 10rem;
    width: 100%;
  }
  &__logo {
    width: 20.2rem;
  }
}
.content {
  @include container;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  & > * + * {
    margin-top: 2rem;
  }
  margin-bottom: 2rem;
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
