<template>
  <div :class="$style.wrapper">
    <div :class="$style.slider_top">
      <VueSlickCarousel
        ref="c1"
        :as-nav-for="$refs.c2"
        :focus-on-select="true"
        @beforeChange="syncSliders"
      >
        <div v-for="(item, index) in sliderItem" :key="index" :class="$style.item">
          <n-lazy-img :src="`${$axios.defaults.baseURL}${item.src}`" :alt="item.title" />
          <!--          <img :src="`${$axios.defaults.baseURL}${item.src}`" alt="1">-->
        </div>
      </VueSlickCarousel>
    </div>
    <div>
      <VueSlickCarousel
        ref="c2"
        :class="$style.slider_bottom"
        :arrows="false"
        :slides-to-show="3"
        :as-nav-for="$refs.c1"
        :focus-on-select="true"
        @beforeChange="syncSlidersBottom"
      >
        <div v-for="(item, index) in sliderItem" :key="index">
          <div :class="$style.item">
            <n-lazy-img :src="`${$axios.defaults.baseURL}${item.src}`" :alt="item.title" />

            <!--            <img :src="`${$axios.defaults.baseURL}${item.src}`" alt="1">-->
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import { ref } from '@nuxtjs/composition-api'
export default {
  name: 'NSlider',
  components: {
    VueSlickCarousel
  },
  props: {
    sliderItem: {
      type: Array,
      required: true
    }
  },
  setup () {
    const c1 = ref(null)
    const c2 = ref(null)
    const syncSliders = () => {
      c1.value.next()
      c2.value.next()
    }

    const syncSlidersBottom = (value, v2) => {
      c1.value.goTo(v2)
    }
    return {
      c1,
      c2,
      syncSliders,
      syncSlidersBottom
    }
  }
}
</script>

<style scoped lang="scss" module>

.wrapper {
  width: 100%;
  :global(.slick-initialized) {
    & > :global(.slick-prev), & > :global(.slick-next) {
      background-image: url('@/static/icon/icon-arrow-right-slider.png');
      background-size: contain;
      background-repeat: no-repeat;
      width: 20px;
      height: 20px;
      z-index: 5;
      &::before {
        content: "";
        display: none;
      }
    }
    & > :global(.slick-prev) {
      transform: rotate(180deg) translateY(50%);
      left: 2rem;
    }
    & > :global(.slick-next) {
      right: 2rem;
    }
  }
  img {
    width: 100%;
    object-position: center;
    object-fit: cover;
  }

  .slider_top {
    :global(.slick-slider) {
      .item {
        height: 32.5rem;
      }
    }
    img {
     height: 100%;
      //border-radius: 1rem;
    }
  }

  .slider_bottom {
    padding: 0 2rem;
    :global(.slick-list) {
      margin-top: 1.42rem;
      width: calc(100% + 1.2rem);
      margin-left: -.6rem;
    }
    :global(.slick-slide) {}
    .item {
      //width: 6.5rem;
      //height: 6.5rem;
      margin: 0 .6rem;
    }
  }
}
</style>
