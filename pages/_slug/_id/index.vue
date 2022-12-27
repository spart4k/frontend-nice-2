<template>
  <main :class="$style.main">
    <div :class="$style.wrapper">
      <N-Preloader v-if="!card" />
      <template v-if="card && section">
        <SectionCards
          :key="card.id"
          :section="section"
          detail-page
          :card="card.card"
          :comments="card.comments"
          @setStateLike="setLike"
          @clickTag="clickTag"
          @clickAuthor="clickAuthor"
        />
        <N-Button color="#222222" :background-color="'white'" :class="$style.back" @click="goToPrev()">
          <N-Icon name="back" :class="$style.backButton" />
          <p :class="$style.text">
            Назад
          </p>
        </N-Button>
        <!-- <N-Fixed-Button v-if="card.is_product" :is-auth="isAuth" :check-auth="true" @clickButton="addBasket">
          <template v-if="!isAddedBasket">
            Добавить в корзину
          </template>
          <template v-else>
            Перейти в корзину
          </template>
        </N-Fixed-Button> -->
      </template>
    </div>
  </main>
</template>

<script>
import { ref, useAsync, useContext, defineComponent, useRouter, useMeta, computed, onMounted, useFetch } from '@nuxtjs/composition-api'
// import { head } from '@/components/scripts/head.js'

export default defineComponent({
  name: 'DetailCards',
  layout: 'default',
  // middleware: 'background',
  // transition: 'home',
  setup () {
    const isAddedBasket = ref(false)
    const { route, store } = useContext()
    const router = useRouter()
    // const paramsId = computed(() => Number(route.value.params.id))
    const sections = computed(() => store?.state.content.sections)

    const description = computed(() => {
      return {
        background: bgName?.value?.slug
      }
    })
    const metaTags = ref({})
    const clickTag = (value) => {
      router.push({ path: `/tags/${value}` })
    }

    const clickAuthor = (value) => {
      router.push({ path: `/authors/${value}` })
    }
    const card = ref({
      card: {},
      comments: {}
    })
    const section = computed(() => {
      return card?.value?.card?.data?.section
    })
    const fetchData = async () => {
      const params = {
        card_id: route.value.params.id,
        count: 99
      }
      const responseCard = await store.dispatch('detailPage/getData', route.value.params.id)
      const responseComments = await store.dispatch('detailPage/getComments', params)
      return {
        responseCard,
        responseComments
      }
    }
    useAsync(async () => {
      try {
        const response = await fetchData()
        console.log(response)
        metaTags.value = {
          seo_title: response.responseCard.data?.data?.seo_title,
          seo_description: response.responseCard.data?.data?.seo_description,
          seo_image: response.responseCard.data?.seo_file_id?.data?.src
        }
        card.value = {
          card: response.responseCard.data,
          comments: response.responseComments.data
        }
        console.log(card.value)
        console.log(section.value)
        } catch (e) {
        }
      }, route.value.params.id)
    useFetch(() => {
      try {
        // const response = await fetchData()
        // card.value = {
        //   card: response.responseCard
        //   // comments: response.responseComments.data
        // }
        // console.log(response)
        } catch (e) {
        }
      }, route.value.params.id)
    useMeta(() => ({
        title: metaTags.value.seo_title,
        meta: [
          {
            hid: 'og:title',
            name: 'og:title',
            property: 'og:title',
            content: metaTags.value.seo_title
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: metaTags.value.seo_description
          },
          {
            hid: 'description',
            name: 'description',
            property: 'description',
            content: metaTags.value.seo_description
          }
        ]
    }))
    const bgName = computed(() => {
      console.log(sections.value)
      const find = sections.value?.data?.find(item => Number(item.id) === +card.value?.card.data?.section.id)
      return find
    })

    const addBasket = () => {
      if (!isAddedBasket.value) {
        isAddedBasket.value = true
        const params = {
          card_id: route.value.params.id,
          quantity: 1
        }
        store.dispatch('basket/addBasket', params)
      } else {
        router.push('/basket')
      }
    }

    const isAuth = computed(() => {
      return store.state.authentication.authorizated
    })

    onMounted(() => {
      store.commit('content/changeContentLoader', true)
      store.commit('content/setHeaderHidden', false)
      store.commit('content/setAnimate', false)
      store.commit('content/setSingleAnimation', false)
      store.commit('content/changeAnimationEnd', true)
    })
    const setLike = (state) => {
      console.log('set')
      console.log(state)
      card.value.card.data.liked = state
    }

    return {
      card,
      addBasket,
      clickTag,
      clickAuthor,
      description,
      isAddedBasket,
      bgName,
      isAuth,
      metaTags,
      section,
      setLike
    }
  },
  head: {},
  methods: {
    goToPrev () {
      this.$router.go(-1)
    }
  }
})
</script>

<style scoped module lang="scss">
.main {
  @include container;
}
.wrapper {
  width: 100%;
  padding-top: 10.3rem;
  padding-bottom: 4.5rem;
  @media (min-width: $tabletWidth) {
    padding-top: 19rem;
  }
  .back {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    cursor: pointer;
    @media (min-width: $tabletWidth) {
      margin: 2rem auto 0;
      width: 36.2rem;
    }
    .backButton {
      width: 1.3rem;
      height: 2.2rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      color: $fontColorDefault;
      @include button;
    }
  }
}
.button__add_basket {
  background-color: rgba($black, 0.8);
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  //padding: 2.4rem 0;
  button {
    height: 5.1rem;
    background-color: $yellow2;
    color: $black;
    @include button;
  }
}
</style>
