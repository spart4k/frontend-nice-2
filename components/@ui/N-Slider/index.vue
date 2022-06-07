<template>
  <div :class="$style.wrapper">
    <div :class="$style.slider_top">
      <VueSlickCarousel
        ref="c1"
        :as-nav-for="$refs.c2"
        :focus-on-select="true"
        :arrows="true"
        @beforeChange="syncSliders"
      >
        <div :class="$style.top">
          <img src="./img_lights.jpeg" alt="1">
        </div>
        <div :class="$style.top">
          <img src="./123.jpeg" alt="1">
        </div>
        <div :class="$style.top">
          <img src="./123.jpeg" alt="1">
        </div>
        <div :class="$style.top">
          <img src="./123.jpeg" alt="1">
        </div>
        <div :class="$style.top">
          <img src="./img_lights.jpeg" alt="1">
        </div>
        <div :class="$style.top">
          <img src="./123.jpeg" alt="1">
        </div>
      </VueSlickCarousel>
    </div>
    <div>
      <VueSlickCarousel
        ref="c2"
        :class="$style.slider_bottom"
        :arrows="false"
        :slides-to-show="4"
        :as-nav-for="$refs.c1"
        :focus-on-select="true"
        @beforeChange="syncSlidersBottom"
      >
        <div>
          <div :class="$style.item">
            <img src="./img_lights.jpeg" alt="1">
          </div>
        </div>

        <div>
          <div :class="$style.item">
            <img src="./123.jpeg" alt="1">
          </div>
        </div>

        <div>
          <div :class="$style.item">
            <img src="./123.jpeg" alt="1">
          </div>
        </div>

        <div>
          <div :class="$style.item">
            <img src="./123.jpeg" alt="1">
          </div>
        </div>

        <div>
          <div :class="$style.item">
            <img src="./img_lights.jpeg" alt="1">
          </div>
        </div>

        <div>
          <div :class="$style.item">
            <img src="./123.jpeg" alt="1">
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
  img {
    max-width: 100%;
    object-fit: cover;
  }
  .slider_top {
    :global(.slick-slider) {
      .top {
        height: 50rem;

        img {
          max-width: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }

  .slider_bottom {
    :global(.slick-list) {
      margin-top: 1.42rem;
      width: calc(100% + 16px);
      margin-left: -8px;
    }
    .item {
      height: 75px;
      img {
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      margin: 0 8px;
    }
  }
}

:global(.slick-initialized) {
  & > :global(.slick-prev) {
    background-image: url('@/static/icon/arrow-right-slider.png');
    background-size: cover;
    transform: rotate(180deg) translateY(50%);
    z-index: 5;
    left: 10px;
    &::before {
      content: "";
      display: none;
    }
  }
}
:global(.slick-initialized) {
  & > :global(.slick-next) {
    background-image: url('@/static/icon/arrow-right-slider.png');
    background-size: cover;
    z-index: 5;
    right: 10px;
    &::before {
      content: "";
      display: none;
    }
  }
}

</style>
