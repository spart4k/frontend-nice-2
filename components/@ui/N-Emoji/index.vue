<template>
  <div class="accordion" :class="$style.emojiWrap">
    <div :class="$style.container">
      <VueSlickCarousel
        ref="c1"
        :arrows="false"
        :dots="true"
        :infinite="true"
        :focus-on-select="true"
      >
        <div :class="$style.sliderContainer">
          <div :class="$style.emojiContainer">
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😊')">
              😊
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😂')">
              😂
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😇')">
              😇
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😎️')">
              😎️
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '🤝')">
              🤝
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😉')">
              😉
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😛')">
              😛
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '🥳')">
              🥳
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😍')">
              😍
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😡')">
              😡
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😌')">
              😌
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😱')">
              😱
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😴')">
              😴
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '🤯')">
              🤯
            </div>
          </div>
        </div>
        <div :class="$style.stikerContainer">
          <img
            :class="$style.sticker"
            src="~/assets/img/sticker/sticker.png"
            alt=""
          >
          <img
            :class="$style.sticker"
            src="~/assets/img/sticker/sticker2.png"
            alt=""
          >
          <img
            :class="$style.sticker"
            src="~/assets/img/sticker/sticker3.png"
            alt=""
          >
          <img
            :class="$style.sticker"
            src="~/assets/img/sticker/sticker4.png"
            alt=""
          >
          <img
            :class="$style.sticker"
            src="~/assets/img/sticker/sticker5.png"
            alt=""
          >
        </div>
        <template #customPaging="">
          <div class="custom-dot">
            <N-Icon :class="$style.smileSvg" name="smile" />
            <N-Icon :class="$style.stikerSvg" name="sticker" />
          </div>
        </template>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  name: 'NEmoji',
    components: {
    VueSlickCarousel
  },
  props: {
  },
  setup () {
    return {
    }
  }
}
</script>

<style scoped lang="scss" module>
.emojiWrap {
  margin: 2.5rem 0 0 0;
}
.container {
    background: #F5F5F5;
    border-radius: 20px;
    padding: 1.8rem 0;
    // width: 33rem;
    .sliderContainer{
        display: flex !important;
        padding: 0 1.7rem;
        gap: 2rem;
        flex-direction: column;
        .emojiContainer{
            display: flex !important;
            justify-content: space-between;
            flex-wrap: wrap;
            row-gap: 2rem;
            gap: .6rem;
            padding: 0.6rem 0;
              @media (min-width: $tabletWidth) {
                gap: 1.4rem;
                flex-wrap: wrap;
                justify-content: flex-start;
              }
            .emoji {
                display: inline-block;
                font-size: 2.9rem;
                line-height: 1;
                user-select: none;
                cursor: pointer;
                @media (min-width: $tabletWidth) {
                  font-size: 3rem;
                }
            }
        }
    }
    .stikerContainer {
      padding: 0.8rem .2rem;
      display: flex !important;
      justify-content: space-around;
      .sticker {
        display: inline-block;
        width: 6.2rem;
        height: 6.2rem;
        user-select: none;
        cursor: pointer;
        @media (min-width: $tabletWidth) {
          height: auto;
        }
      }
    }
    :global(.slick-dots li){
      opacity: 0.1;
      margin: 0 .75rem;
      color: #222222;
      width: 2rem;
      height: 2rem;
    }
    :global(.slick-dots li):first-child {
      :global(.custom-dot){
        :global(div):last-child {
          display: none;
        }
        :global(div):first-child {
          :global(svg) {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }
    :global(.slick-dots li):last-child {
      :global(.custom-dot){
        :global(div):first-child {
          display: none;
        }
        :global(div):last-child {
          :global(svg) {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }

    :global(.slick-dots li button:before) {
        font-size: 1rem;
    }
    :global(.slick-dots) {
        bottom: -5.5rem;
    }
    :global(.slick-active) {
      opacity: 1 !important;
    }
    :global(.slick-track) {
      @media (min-width: $tabletWidth) {
        display: flex;
      }
    }
    :global(.slick-slide) {
      @media (min-width: $tabletWidth) {
        margin: auto 0;
      }
    }
}
</style>
