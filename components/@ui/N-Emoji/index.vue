<template>
  <div>
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
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😄')">
              😄
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😡')">
              😡
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😂')">
              😂
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😢')">
              😢
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😎')">
              😎
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '👿')">
              👿
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '👽')">
              👽
            </div>
          </div>
          <div :class="$style.emojiContainer">
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😄')">
              😄
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😡')">
              😡
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😂')">
              😂
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😢')">
              😢
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '😎')">
              😎
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '👿')">
              👿
            </div>
            <div :class="$style.emoji" @click="$emit('emojiWrite', '👽')">
              👽
            </div>
          </div>
        </div>
        <div>
          asafasf
        </div>
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
.container {
    background: #F5F5F5;
    border-radius: 20px;
    padding: 1.8rem 1.7rem;
    margin: 2.5rem 0 0 0;
    .sliderContainer{
        display: flex !important;
        gap: 20px;
        flex-direction: column;
        .emojiContainer{
            display: flex !important;
            justify-content: space-between;
            .emoji {
                display: inline-block;
                font-size: 32px;
                line-height: 1;
                user-select: none;
            }
        }
    }
    :global(.slick-dots li button:before) {
        font-size: 10px;
    }
    :global(.slick-dots) {
        bottom: -45px;
    }
}
</style>
