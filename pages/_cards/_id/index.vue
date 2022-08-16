<template>
  <main :class="$style.main">
    <div :class="$style.wrapper">
      <template v-if="card">
        <SectionCards
          :id="card.section_id"
          :key="card.id"
          detail-page
          :card="card"
          @clickTag="clickTag"
        />
        <N-Button color="#222222" :background-color="'white'" :class="$style.back" @click="goToPrev()">
          <N-Icon name="back" />
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
import { ref, useAsync, useContext, defineComponent, useRouter, computed, useMeta } from '@nuxtjs/composition-api'
import { head } from '@/components/scripts/head.js'

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

    const clickTag = (value) => {
      router.push({ path: '/tags', query: { tag: value } })
    }

    const card = useAsync(async () => {
      try {
        const response = await store.dispatch('detailPage/getData', route.value.params.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.params.id)
    head(useMeta, card.value)
    const bgName = computed(() => {
      const find = sections.value?.find(item => Number(item.id) === +card.value?.section_id)
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

    return {
      card,
      addBasket,
      clickTag,
      description,
      isAddedBasket,
      bgName,
      isAuth

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
    padding-top: 15rem;
  }
  .back {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    @media (min-width: $tabletWidth) {
      margin: 2rem auto 0;
      width: 36.2rem;
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
