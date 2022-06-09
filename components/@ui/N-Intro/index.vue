<template>
  <div :class="$style.intro">
    <div ref="wrapper" :class="$style.wrapper">
      <div :class="$style.intro__container">
        <h1 v-if="!isHomePage" :class="$style.intro__title">
          {{ description.title }}
        </h1>

        <div :class="isHomePage && $style.intro__logo_subtitle_wrapper">
          <div :class="[isHomePage && $style.intro__subtitle_homePage ,$style.intro__subtitle]">
            {{ description.subtitle }}
          </div>
          <div v-if="isHomePage" :class="$style.intro__logo">
            <img src="@/assets/img/logo.png" alt="логоти nice">
          </div>
        </div>

        <div ref="anchor" :class="[$style.linkAnchor, scrollingContent && $style.scrolling]">
          <div @click="scrollTo">
            <n-icon name="arrow-top" />
          </div>
        </div>
      </div>
      <div ref="content" :class="$style.content">
        <slot />
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
      const options = {
        rootMargin: '0px',
        threshold: 0.01
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
  height: 100vh;
  background-image: url('@/assets/img/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  color: $white;
  padding-top: $headerHeight;
  overflow: hidden;
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
    height: calc(100vh - var(--header-height) - 7.9rem);
    margin-top: 7.9rem;
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
  & > * + * {
    margin-top: 2rem;
  }
}
.wrapper {
  overflow: auto;
  height: calc(100vh - var(--header-height));
}
.linkAnchor {
  position: absolute;
  bottom: 6.8rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: visible;
  transition: opacity 0.1s ease-in-out;
  z-index: 1;
  cursor: pointer;
  &.scrolling {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
