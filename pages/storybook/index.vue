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
    return {
      NCard
    }
  }
}

</script>
<style lang="scss" module>
.storybook {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $gray;
}
</style>
