<template>
  <div :class="$style.wrapper">
    <div :class="$style.fullscreen" @click="popupChange">
      <N-Icon name="fullscreen" :class="$style.fullscreenButton" />
    </div>
    <div :class="$style.slider_top">
      <template v-if="sliderItem.length > 1">
        <div :class="$style.originalSlider">
          <VueSlickCarousel
            ref="c1"
            :dots="true"
            :infinite="true"
            :focus-on-select="true"
            :adaptive-height="true"
            @beforeChange="syncSlidersTop"
          >
            <div v-for="(item, index) in sliderItem" :key="index" :class="$style.item">
              <img v-if="item.file_type_id === 1" :src="`${$axios.defaults.baseURL}/${item.src}`" alt="">
            </div>
          </VueSlickCarousel>
        </div>
      </template>
      <template v-else>
        <div :class="$style.originalSliderSingle">
          <div v-for="(item, index) in sliderItem" :key="index" :class="$style.item">
            <img v-if="item.file_type_id === 1" :src="`${$axios.defaults.baseURL}/${item.src}`" alt="">
          </div>
        </div>
      </template>
      <portal to="sliderPopup">
        <div :style="{zIndex: popup ? 10000 : -10}" :class="$style.overlay" @click="popupChange">
          <N-Button :background-color="'rgba(255, 255, 255, 0.4)'" type-button="small" :class="$style.closeButton">
            <N-Icon :class="$style.icon" name="close" />
          </N-Button>
          <div :class="$style.popupSlider" @click.stop>
            <VueSlickCarousel
              ref="c2"
              :dots="true"
              :infinite="true"
              :focus-on-select="true"
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
      const wrap = document.getElementById('__nuxt')
      if (popup.value) {
        wrap.classList.add('noScroll')
        document.body.style.overflow = 'hidden'
      } else {
        wrap.classList.remove('noScroll')
        document.body.style.overflow = 'auto'
      }
    }
    const syncSlidersBottom = (value, sliderTwo) => {
      if (sliderTwo) {
        c1.value.goTo(sliderTwo)
      }
    }
    const syncSlidersTop = (value, sliderOne) => {
      c2.value.goTo(sliderOne)
    }
    return {
      c1,
      c2,
      popup,
      popupChange,
      syncSlidersBottom,
      syncSlidersTop
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
  .originalSlider {
    :global(.slick-list) {
      // height: 100% !important;
      margin: auto 0;
      width: 100%;
    }
  }
  .originalSliderSingle {
    img {
      height: 100%;
      object-fit: contain;
    }
  }
  .fullscreen {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    z-index: 10;
    height: 3.2rem;
    width: 3.2rem;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    .fullscreenButton {
      width: 1.6rem;
      height: 1.6rem;
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
      background-color: rgba(255,255,255,0.1);
      background-repeat: no-repeat;
      background-size: .9rem;
      border-radius: 50%;
      width: 3.2rem;
      height: 3.2rem;
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
    // z-index: 100;
    // background-color: rgba(51, 51, 51, 1);
    background-color: rgb(0, 0, 0);
    .closeButton {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 50;
      width: 3.2rem;
      height: 3.2rem;
      .icon{
        width: 1.3rem;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    .popupSlider {
      z-index: 102;
      width: 100%;
      height: 100%;
      :global(.slick-dots li button:before) {
        content: '';
        border: .15rem solid #ffffff;
        border-radius: 3px;
        line-height: 0px;
        position: absolute;
        width: 1rem;
        height: 0px;
        transition: width .6s ease, opacity .6s ease;
      }
      :global(.slick-dots) {
        bottom: 20px !important;
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
      :global(.slick-slider) {
        height: inherit !important;
        display: flex;
        padding: 1rem 1rem;
        touch-action: auto!important;
        :global(.slick-list) {
          height: 100% !important;
          margin: auto 0;
          width: 100%;
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
      background-color: rgba(255,255,255,0.1);
      background-repeat: no-repeat;
      border-radius: 50%;
      background-size: .9rem;
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
      @media (max-width: $tabletWidth) {
        display: none !important;
      }
      // top: 95%;
    }
    & > :global(.slick-next) {
      transform: rotate(180deg) translateY(50%);
      right: 2.5rem;
      @media (max-width: $tabletWidth) {
        display: none !important;
      }
      // top: 95%;
    }
  }
}
</style>

//slick-list
//slick-slider
