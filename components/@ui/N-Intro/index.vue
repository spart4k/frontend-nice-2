<template>
  <main>
    <div :class="[$style.intro]">
      <!--      :style="{ backgroundImage: backgroundImage}"-->
      <N-Background :description="description" :hide-image="scrollingContent" :is-home-page="isHomePage" />
      <div :class="[$style.intro__container, scrollingContent && $style.scrolling]">
        <h1 v-if="!isHomePage" :class="$style.intro__title">
          {{ description.title }}
        </h1>

        <div :class="[isHomePage && $style.intro__logo_subtitle_wrapper]">
          <h1 v-if="description.subtitle" :class="[isHomePage && $style.intro__subtitle_homePage ,$style.intro__subtitle]">
            {{ description.subtitle }}
          </h1>
          <n-logo v-if="isHomePage" size="big" :class="$style.intro__logo" />
        </div>
      </div>
      <div :class="$style.shim" />
      <div ref="anchor" :class="[$style.linkAnchor, scrollingContent && $style.scrolling]" @click="scrollTo">
        <!--        <div @click="scrollTo">-->
        <n-icon name="arrow-top" />
        <!--        </div>-->
      </div>
    </div>

    <div ref="content" :class="[$style.content, setHeight && $style.setHeight]" class="content">
      <slot />
    </div>
  </main>
</template>

<script>
import { computed, nextTick, onMounted, ref, useRoute } from '@nuxtjs/composition-api'
import { scrollBy } from 'seamless-scroll-polyfill'

export default {
  name: 'NIntro',
  props: {
    description: {
      type: Object
    },
    setHeight: {
      type: Boolean
    }
  },
  setup (props, ctx) {
    const { $store } = ctx.root
    const anchor = ref(null)
    const content = ref(null)
    const wrapper = ref(null)
    const scrollingContent = ref(null)
    const route = useRoute()
    const isHomePage = computed(() => route.value.name === 'index')

    onMounted(() => {
      nextTick(() => {
        const options = {
          root: null,
          threshold: 0.04,
          rootMargin: '0px'
        }

        const callback = (entries) => {
          if (entries[0].isIntersecting) {
            scrollingContent.value = true
            $store.commit('content/changeLogo', true)
          } else {
            scrollingContent.value = false
            $store.commit('content/changeLogo', false)
          }
        }

        const observer = new IntersectionObserver(callback, options)
        observer.observe(content.value)
      })
    })

    const scrollTo = () => {
      const body = document.querySelector('.body')

      const contentBounding = content.value.getBoundingClientRect()
      scrollBy(body, { behavior: 'smooth', top: contentBounding.top - 90 })
    }
    // watch(() => route.value.fullPath, () => {
    //   const body = document.querySelector('.body')
    //
    //   const contentBounding = content.value.getBoundingClientRect()
    //   scrollBy(body, { behavior: 'smooth', top: contentBounding.top - 90 })
    // })
    return {
      anchor,
      content,
      wrapper,
      scrollingContent,
      isHomePage,
      scrollTo
    }
  },
  watchQuery: true
}
</script>

<style scoped lang="scss" module>
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
    //@media (max-width: $bgWidth) {
    //  background-size: 100% 100vh;
    //}
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
    min-height: -webkit-fill-available;
    height: calc(100vh - var(--header-height));
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
    transition: opacity 0.2s ease-in-out;
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
  //min-height: 100vh;
  & > * + * {
    margin-top: 2rem;
  }
  margin-bottom: 2rem;
  &.setHeight {
    min-height: calc(100vh - var(--header-height));
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
