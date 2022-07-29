<template>
  <div :class="$style.wrapper">
    <div :class="$style.slider_top">
      <VueSlickCarousel
        ref="c1"
        :dots="true"
        :infinite="true"
        :focus-on-select="true"
        :adaptive-height="true"
        @beforeChange="syncSliders"
      >
        <div v-for="(item, index) in sliderItem" :key="index" :class="$style.item">
          <img :src="`${$axios.defaults.baseURL}${item.src}`" alt="" @click="popupChange">
        </div>
      </VueSlickCarousel>
      <portal v-if="popup" to="sliderPopup">
        <div :class="$style.overlay" @click="popupChange">
          <N-Button-Close />
          <div :class="$style.popupSlider" @click.stop>
            <VueSlickCarousel
              ref="c2"
              :infinite="true"
              :focus-on-select="true"
              :adaptive-height="true"
              @beforeChange="syncSlidersBottom"
            >
              <div v-for="(item, index) in sliderItem" :key="index" :class="$style.item">
                <img :src="`${$axios.defaults.baseURL}${item.src}`" alt="">
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </portal>
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
    const popup = ref(false)
    // const currentSlide = ref(0)
    const popupChange = () => {
      popup.value = !popup.value
      if (popup.value === true) {
      //   setTimeout(() => {
      //   if (c2.value) {
      //     c2.value.goTo(currentSlide.value)
      //   }
      // }, 0)
      }
    }
    const syncSliders = (value, sliderOne) => {
    // currentSlide.value = sliderOne
      // c1.value.next()
      // c2.value.next()
    }
    const syncSlidersBottom = (value, sliderTwo) => {
      c1.value.goTo(sliderTwo)
    }
    return {
      c1,
      c2,
      popup,
      popupChange,
      syncSliders,
      // currentSlide,
      syncSlidersBottom
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  width: 100%;
  margin-bottom: 3rem;

  .item{
    z-index: 5;
  }

  :global(.slick-initialized) {
    & > :global(.slick-prev), & > :global(.slick-next) {
      background: url('@/static/icon/icon-arrow-slider.svg') center;
      background-color: rgba(255,255,255,0.2);
      background-repeat: no-repeat;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      z-index: 5;
      &::before {
        content: "";
        display: none;
      }
    }
    & > :global(.slick-prev) {
      left: 1.5rem;
    }
    & > :global(.slick-next) {
      transform: rotate(180deg) translateY(50%);
      right: 1.5rem;
    }
  }
  img {
    width: 100%;
    object-position: center;
    object-fit: cover;
  }

  :global(.slick-dots li button:before) {
      content: '';
      border: 1.5px solid #222222;
      border-radius: 3px;
      line-height: 0px;
      position: absolute;
      width: 10px;
      height: 0px;
      transition: all .6s ease;
  }

  :global(.slick-dots) {
    :global(li) {
      width: 10px;
      height: 3px;
      transition: all .6s ease;
    }
    :global(.slick-active) {
      width: 35px;
    }
    :global(.slick-active button:before) {
      width: 35px;
      height: 0;
    }
  }
}

  .overlay{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(51, 51, 51, 0.9);
    .popupSlider {
      z-index: 102;
      width: 100%;
      height: 100%;
      :global(.slick-slider) {
        height: inherit !important;
        display: flex;
        padding: 10px 10px;
        :global(.slick-list) {
          height: 100% !important;
          margin: auto 0;
            :global(.slick-track) {
              height: 100%;
              :global(.slick-slide) {
                height: 100%;
                :global(div) {
                  height: 100%;
                  img {
                    display: inline-block;
                    object-fit: contain;
                    height: 100%;
                    width: 100%;
                    z-index: 100;
                  }
                }
              }
            }
        }
      }
    }
    :global(.slick-initialized) {
    & > :global(.slick-prev), & > :global(.slick-next) {
      background: url('@/static/icon/icon-arrow-slider.svg') center;
      background-color: rgba(255,255,255,0.2);
      background-repeat: no-repeat;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      z-index: 105;
      &::before {
        content: "";
        display: none;
      }
    }
    & > :global(.slick-prev) {
      left: 2.5rem;
    }
    & > :global(.slick-next) {
      transform: rotate(180deg) translateY(50%);
      right: 2.5rem;
    }
  }
}
</style>

//slick-list
//slick-slider
