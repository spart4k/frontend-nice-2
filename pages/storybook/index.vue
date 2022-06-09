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
    <Row flex title="Карточка Default">
      <N-Card-Default
        v-bind="NCard"
        :amount-comment="32"
      />
      <N-Card-Music-Detail
        v-bind="NCard"
        :amount-comment="32"
      />
      <N-Card-Default
        v-bind="NCard"
        :amount-comment="32"
        :images="[{ src: require('~/assets/img/testPlug.jpg') }, { src: require('~/assets/img/testPlug.jpg') }]"
      />
    </Row>
    <Row title="Карточка с видео">
      <N-Card-Default
        v-bind="NCard"
        :images="null"
        :video="NCard.video"
      />
    </Row>
    <Row title="Карточка с главной страницы списком">
      <N-Card-General
        v-bind="NCard"
        :chips="['видео', 'музыка', 'хэштэг']"
      />
    </Row>
    <Row title="Карточка чтение">
      <N-Card-Read
        :author="cardRead.author"
        :description="cardRead.description"
        :books="cardRead.books"
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
    <Row title="Audio">
      <N-Audio />
    </Row>
    <Row title="Contain">
      <N-Contain>
        Фамилия Обломов не связана со словом «облом».
        5 фактов о литературе из школьной программы, которых вы не знал. Обломов не связана со словом «облом».
        5 фактов о литературе из школьной программы, которых вы не знал. Фамилия Обломов не связана со словом «облом».
        5 фактов о литературе из школьной программы, которых вы не знал.
      </N-Contain>
    </Row>
    <Row title="Popup общий">
      <button @click="openPopup">
        open
      </button>
      <NPopup v-model="activePopup" />
    </Row>
    <Row title="TextField">
      <N-Text-Field v-model="valTextField" />
      {{ valTextField }}
      <N-Text-Field v-model="valTextField" md-fz />
    </Row>
    <Row>
      <N-Text-Area v-model="valTextArea" />
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
    const activePopup = ref(false)
    const valTextField = ref('')
    const valTextArea = ref('')

    const NCard = ref({
      images: [{ src: require('~/assets/img/testPlug.jpg') }],
      video: require('~/assets/video/testPlug.mp4'),
      title: 'Название альбома',
      description: 'Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал',
      chips: ['музыка'],
      amountComment: 0,
      audio: [
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '123' },
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '1233' },
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '12321' }
      ]
    })

    const sliderItem = ref([
      { src: './img_slider.jpeg' },
      { src: '/img_slider-2.jpeg' },
      { src: '/img_slider.jpeg' },
      { src: '/img_slider-2.jpeg' }
    ])
    const author = {
      name: 'Адрюша Евкакий',
      src: ''
    }

    const cardRead = {
      author: { ...author },
      description: 'Биография автора на 250 символов максимум.  Биография автора на 250 знаков максимум.',
      books: [
        {
          title: 'Название книги',
          description: 'Фамилия Обломов не связана со словом «облом». ' +
          '5 фактов о литературе из школьной программы, которых вы не знал. Обломов не связана со словом «облом». ' +
          '5 фактов о литературе из школьной программы, которых вы не знал. Фамилия Обломов не связана со словом «облом». ' +
          '5 фактов о литературе из школьной программы, которых вы не знал.'
        },
        {
          title: 'Название книги',
          description: 'Фамилия Обломов не связана со словом «облом». ' +
            '5 фактов о литературе из школьной программы, которых вы не 1знал. Обломов не связана со словом «облом». ' +
            '5 фактов о литературе из школьной программы, которых вы не знал. Фамилия Обломов не связана со словом «облом». ' +
            '5 фактов о литературе из школьной программы, которых вы не знал.'
        }
      ]
    }

    const openPopup = () => {
      activePopup.value = true
    }

    return {
      NCard,
      sliderItem,
      author,
      cardRead,
      activePopup,
      valTextField,
      valTextArea,
      openPopup
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
