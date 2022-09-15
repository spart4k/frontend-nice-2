<template>
  <div :class="$style.wrapper">
    <div :class="$style.fullscreen">
      <N-Icon name="fullscreen" :class="$style.fullscreenButton" @click="popupChange" />
    </div>
    <div :class="$style.slider_top">
      <VueSlickCarousel
        ref="c1"
        :dots="true"
        :infinite="true"
        :focus-on-select="true"
        :adaptive-height="true"
      >
        <div v-for="(item, index) in sliderItem" :key="index" :class="$style.item">
          <img v-if="item.file_type_id === 1" :src="`${$axios.defaults.baseURL}/${item.src}`" alt="">
        </div>
      </VueSlickCarousel>
      <portal v-if="popup" to="sliderPopup">
        <div :class="$style.overlay" @click="popupChange">
          <N-Button :background-color="'rgba(255, 255, 255, 0.4)'" type-button="small" :class="$style.closeButton">
            <N-Icon :class="$style.icon" name="close" />
          </N-Button>
          <div :class="$style.popupSlider" @click.stop>
            <VueSlickCarousel
              ref="c2"
              :infinite="true"
              :focus-on-select="true"
              :adaptive-height="true"
              @beforeChange="syncSlidersBottom"
            >
              <div v-for="(item, index) in sliderItem" :key="index" :class="$style.item">
                <img :src="`${$axios.defaults.baseURL}/${item.src}`" alt="">
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
  setup (props) {
    const c1 = ref(null)
    const c2 = ref(null)
    const popup = ref(false)
    const popupChange = () => {
      popup.value = !popup.value
    }
    const syncSlidersBottom = (value, sliderTwo) => {
      c1.value.goTo(sliderTwo)
    }
    return {
      c1,
      c2,
      popup,
      popupChange,
      syncSlidersBottom
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  width: 100%;
  margin-bottom: 3rem;
  position: relative;
  @media (min-width: $tabletWidth) {
    height: 100%;
    margin-bottom: 0rem;
  }
  .fullscreen {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    height: auto;
    padding: 1rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    z-index: 10;
    .fullscreenButton {
      width: 2.1rem;
      height: 2rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  div {
    @media (min-width: $tabletWidth) {
      height: 100%;
    }
  }

  .item{
    z-index: 5;
  }

  :global(.slick-initialized) {
    & > :global(.slick-prev), & > :global(.slick-next) {
      background: url('@/static/icon/icon-arrow-slider.svg') center;
      background-color: rgba(255,255,255,0.2);
      background-repeat: no-repeat;
      background-size: 1rem;
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
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
      border: .15rem solid #222222;
      border-radius: 3px;
      line-height: 0px;
      position: absolute;
      width: 1rem;
      height: 0px;
      transition: width .6s ease, opacity .6s ease;
  }

  :global(.slick-dots) {
    :global(li) {
      width: 1rem;
      height: .3rem;
      transition: width .6s ease;
    }
    :global(.slick-active) {
      width: 3.5rem;
    }
    :global(.slick-active button:before) {
      width: 3.5rem;
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
    .closeButton {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 50;
    }
    .popupSlider {
      z-index: 102;
      width: 100%;
      height: 100%;
      :global(.slick-slider) {
        height: inherit !important;
        display: flex;
        padding: 1rem 1rem;
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
      width: 4rem;
      height: 4rem;
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
