<template>
  <n-intro :description="introTitle">
    <div v-if="cards.value && cards.value.data" :class="$style.cards">
      <TransitionGroup name="home" tag="div">
        <div v-for="(card) in cards.value.data" :key="card.id" :class="$style.cards__item">
          <section-cards :id="card.section.id" :key="card.id" :card="card" @clickTag="($event) => clickTag($event, card.section.id)" />
        </div>
      </transitiongroup>
      <client-only>
        <n-lazy-pagination
          @lazyPagination="lazyPagination"
        />
      </client-only>
    </div>
  </n-intro>
</template>
<script>
import { ref, useContext, useAsync, useRouter, useRoute } from '@nuxtjs/composition-api'
import { pagination } from '~/plugins/pagination'
export default {
  name: 'IndexPage',
  transition: 'home',
  setup () {
    const { store } = useContext()
    const router = useRouter()
    const route = useRoute()
    const cards = ref([])
    const totalPage = ref(0)

    const fetch = (currentPage) => {
      const params = {
        page: currentPage
      }
      const response = store.dispatch('main/getData', params)
      return response
    }
    cards.value = useAsync(async () => {
      try {
        const response = await fetch()
        totalPage.value = response?.data.last_page
        return response.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.path)

    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
    })
    store.commit('content/clearBgIntro')

    const { page, getData, dataPagination } = pagination(fetch)

    const lazyPagination = ($state) => {
      getData($state, cards.value.value.last_page)
      cards.value.value.data = [...cards.value.value.data, ...dataPagination.value]
    }
    const clickTag = (tag) => {
      router.push({ path: 'tags', query: { tag } })
    }

    return {
      introTitle,
      cards,
      page,
      lazyPagination,
      clickTag
    }
  },
  watchQuery: ['page']
}
</script>
<style lang="scss" module>
.cards {
  width: 100%;
  &__item {
    margin-bottom: 2rem;
  }
}
</style>
