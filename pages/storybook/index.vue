<template>
  <div :class="$style.storybook">
    <Row title="title">
      Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал
    </Row>
    <Row title="title">
      Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал
    </Row>
    <!-- <Row title="Автор">
      <N-Author name="Алексей Ельцин" />
    </Row> -->
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
    <!-- <Row flex title="Карточка Default">
      <N-Card-Default
        :images="[{ src: require('~/assets/img/testPlug.jpg') }, { src: require('~/assets/img/testPlug.jpg') }]"
        v-bind="NCard"
        :amount-comment="32"
      />
    </Row> -->
    <!-- <Row title="Карточка Defaul2">
      <N-Card-Music-Detail
        v-bind="NCard"
        :amount-comment="32"
      />
    </Row> -->
    <Row
      title="Карточка Default3"
    >
      <!-- <N-Card-Default
        v-bind="
          NCard"
        :amount-comment="32"
        :images="[{ src: require('~/assets/img/testPlug.jpg') }, { src: require('~/assets/img/testPlug.jpg') }]"
      /> -->
    </Row>
    <!-- <Row title="Карточка с видео">
      <N-Card-Default
        v-bind="NCard"
        :images="[{ src: require('~/assets/img/testPlug.jpg') }, { src: require('~/assets/img/testPlug.jpg') }]"
        :video="NCard.video"
      />
    </Row> -->
    <!-- <Row title="Карточка с главной страницы списком">
      <N-Card-General
        v-bind="NCard"
        :chips="['видео', 'музыка', 'хэштэг']"
      />
    </Row> -->
    <!--    <Row title="Карточка чтение">-->
    <!--      <N-Card-Read-->
    <!--        :author="cardRead.author"-->
    <!--        :description="cardRead.description"-->
    <!--        :books="cardRead.books"-->
    <!--      />-->
    <!--    </Row>-->
    <!-- <Row title="Карточка альбомы">
      <N-Card-Album
        v-bind="NCard"
        author="Сергей Николаев"
      />
    </Row> -->
    <Row title="Chip">
      <N-Chip>искусство</N-Chip>
    </Row>
    <!-- <Row title="ROW-BASKET">
      <div :class="$style.bakset">
        <n-basket-row
          v-for="(basketItem, index) in basketRow"
          :key="index"
          :item="basketItem"
          @changeCount="($event) => changeCount($event, index)"
        />
        {{ countAll }}
      </div>
    </Row> -->
    <Row title="Audio">
      <N-Audio />
    </Row>
    <Row title="Contain">
      <!-- <N-Contain>
        Фамилия Обломов не связана со словом «облом».
        5 фактов о литературе из школьной программы, которых вы не знал. Обломов не связана со словом «облом».
        5 фактов о литературе из школьной программы, которых вы не знал. Фамилия Обломов не связана со словом «облом».
        5 фактов о литературе из школьной программы, которых вы не знал.
      </N-Contain> -->
    </Row>
    <Row title="Popup общий">
      <button @click="openPopup">
        open
      </button>
      <NPopup v-model="activePopup" title="Вход и регистрация">
        <FormAuthDefault />
      </NPopup>
    </Row>
    <Row title="TextField">
      <N-Text-Field v-model="valTextField" title="Имя" />
      <N-Text-Field v-model="valTextField" title="шрифт побольше" md-fz />
      <N-Text-Field v-model="valTextField" title="телефон" mask="+7 (###) ###-##-##" md-fz />
    </Row>
    <Row title="TextArea">
      <!-- <N-Text-Area v-model="valTextArea" /> -->
    </Row>
    <Row title="Form-auth">
      <FormAuthDefault />
    </Row>
    <Row title="FormAuthConfirmation">
      <FormAuthConfirmation />
    </Row>
    <Row title="auth steps">
      <FormAuthSteps v-model="activeAuthSteps" />
      <n-button @click="activeAuthSteps = true">
        open
      </n-button>
    </Row>
    <Row title="auth steps">
      <n-button>button</n-button>
    </Row>
    <Row title="form profile">
      <Form-Profile-Default />
    </Row>
    <Row title="vTooltip">
      <!-- <N-Tooltip :class="$style.ml3">
        <N-Icon name="user" />
        <template #data>
          <N-Contain>
            <N-Audio :class="$style.widthAudio" />
          </N-Contain>
        </template>
      </N-Tooltip> -->
    </Row>
    <Row>
      <br>
      <br>
      <br>
      <br>
      <br>
    </Row>
  </div>
</template>
<script>
import { computed, ref, useRouter } from '@nuxtjs/composition-api'

export default {
  name: 'StoryBook',
  setup () {
    const activePopup = ref(false)
    const activeAuthSteps = ref(false)
    const valTextField = ref('')
    const valTextArea = ref('')
    const test = ref()
    const NCard = ref({
      images: [{ src: require('~/assets/img/testPlug.jpg') }],
      video: require('~/assets/video/testPlug.mp4'),
      title: 'Название поста',
      text: 'Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал',
      chips: ['музыка', 'хэштег', 'видео', 'искусство'],
      amountComment: 0,
      amountLike: 0,
      audio: [
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '123' },
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '1233' },
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '12321' }
      ]
    })

    const sliderItem = ref([
      { src: require('~/assets/img/img_slider-2.jpeg') },
      { src: require('~/assets/img/img_slider-2.jpeg') },
      { src: require('~/assets/img/img_slider-2.jpeg') },
      { src: require('~/assets/img/img_slider-2.jpeg') }
    ])
    const author = {
      name: 'Адрюша Евкакий',
      src: ''
    }

    const router = useRouter()
    const clickTag = (value) => {
      router.push({ path: '/tags', query: { tag: value } })
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

    const basketRow = ref([
      {
        title: 'Wine',
        price: 3000,
        count: 0,
        img: require('~/assets/img/basket-image.png')
      },
      {
        title: 'white wine',
        price: 500,
        count: 0,
        img: require('~/assets/img/basket-image.png')
      },
      {
        title: 'sweet wine ',
        price: 800,
        count: 0,
        img: require('~/assets/img/basket-image.png')
      }
    ])
    const changeCount = (value, index) => {
      basketRow.value[index].count = value
    }
    const countAll = computed(() => basketRow.value.reduce((acc, val) => acc + val.count * val.price, 0))
    return {
      NCard,
      sliderItem,
      basketRow,
      countAll,
      author,
      cardRead,
      activePopup,
      valTextField,
      valTextArea,
      test,
      activeAuthSteps,
      openPopup,
      changeCount,
      clickTag
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
  border: .1rem solid white;
  padding-bottom: 10rem;
  border-radius: 10px;
  background-color: $gray;
  overflow: hidden;
}
.bakset {
  width: 33.5rem;
  margin: 0 auto;
}
.ml3 {
  margin-left: 30rem;
}
.widthAudio {
  width: 29rem;
}
.rows {
  display: flex;
  flex-direction: column;
}
</style>
