<template>
  <div :class="$style.storybook">
    <Row title="title">
      Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал
    </Row>
    <Row title="title">
      Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал
    </Row>
    <Row title="Автор">
      <N-Author name="Алексей Ельцин" />
    </Row>
    <Row title="Иконки">
      <N-Icon name="plus" />
      <N-Icon name="message" />
      <N-Icon name="minus" />
    </Row>
    <Row title="title">
      <div :class="$style.slider">
        <N-Slider :slider-item="sliderItem" />
      </div>
    </Row>
    <Row title="Comment">
      <N-Comment :current="43" />
    </Row>
    <Row title="Карточка Default">
      <N-Card-Default
        v-bind="NCard"
        :amount-comment="32"
      />
    </Row>
    <Row title="Карточка с видео">
      <N-Card-Default
        v-bind="NCard"
        :img="''"
        :video="NCard.video"
      />
    </Row>
    <Row title="Карточка с главной страницы списком">
      <N-Card-General
        v-bind="NCard"
        :chips="['видео', 'музыка', 'хэштэг']"
      />
    </Row>
    <Row title="Карточка альбомы">
      <N-Card-Album
        v-bind="NCard"
        author="Сергей Николаев"
      />
    </Row>
    <Row title="Chip">
      <N-Chip>искусство</N-Chip>
    </Row>
  </div>
</template>
<script>
import { ref } from '@nuxtjs/composition-api'
import Row from './components/row/index'

export default {
  name: 'StoryBook',
  components: {
    Row
  },
  setup () {
    const NCard = ref({
      img: require('~/assets/img/testPlug.jpg'),
      video: require('~/assets/video/testPlug.mp4'),
      title: 'Название альбома',
      description: 'Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал',
      chips: ['музыка'],
      amountComment: 0
    })

    const sliderItem = ref([
      { src: './img_slider.jpeg' },
      { src: '/img_slider-2.jpeg' },
      { src: '/img_slider.jpeg' },
      { src: '/img_slider-2.jpeg' }
    ])
    return {
      NCard,
      sliderItem
    }
  }
}

</script>
<style lang="scss" module>
.storybook {
  display: flex;
  flex-direction: column;
  background-color: #c2b6b6;
}
.slider {
  width: 33.5rem;
  margin: 0 auto;
  border: 1px solid white;
  padding-bottom: 100px;
  border-radius: 10px;
  background-color: $gray;
  overflow: hidden;
}
</style>
