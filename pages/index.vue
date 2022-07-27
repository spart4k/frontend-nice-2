<template>
  <n-intro :description="introTitle">
    <div v-if="cards.value && cards.value.data" :class="$style.cards">
      <!--      <TransitionGroup name="home" tag="div">-->
      <!--        <div v-for="(card) in cards.value.data" :key="card.id" :class="$style.cards__item">-->
      <!--          <section-cards :id="card.section.id" :key="card.id" :card="card" @clickTag="($event) => clickTag($event, card.section.id)" />-->
      <!--        </div>-->
      <!--      </transitiongroup>-->
      <!--      <TransitionGroup name="home" tag="div">-->
      <div :class="$style.col">
        <div v-for="(card) in cards.value.data.slice(0, cards.value.data.length / 2)" :key="card.id" :class="$style.cards__item">
          <section-cards :id="card.section.id" :key="card.id" :card="card" @clickTag="($event) => clickTag($event, card.section.id)" />
        </div>
      </div>
      <div :class="$style.col">
        <div v-for="(card) in cards.value.data.slice(cards.value.data.length / 2, -1)" :key="card.id" :class="$style.cards__item">
          <section-cards :id="card.section.id" :key="card.id" :card="card" @clickTag="($event) => clickTag($event, card.section.id)" />
        </div>
      </div>
      <!--      </transitiongroup>-->
      <client-only>
        <n-lazy-pagination
          @lazyPagination="lazyPagination"
        />
      </client-only>
    </div>
  </n-intro>
</template>
<script>
import { ref, defineComponent, useContext, useRoute, useRouter, useAsync, useMeta } from '@nuxtjs/composition-api'
import { pagination } from '~/plugins/pagination'
import { head } from '@/components/scripts/head.js'
export default defineComponent({
  name: 'IndexPage',
  setup () {
    const { store } = useContext()
    const router = useRouter()
    const route = useRoute()
    const cards = ref([])
    const totalPage = ref(0)

    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
    })

    const pageInfo = ref({})
    // store.commit('content/changeState', { key: 'logoBg', value: 'main' })
    const fetchData = (currentPage) => {
      const params = {
        page: currentPage
      }
      const response = store.dispatch('main/getData', params)
      return response
    }

    pageInfo.value = useAsync(async () => {
      try {
        const response = await fetchData()
        return response.data
      } catch (e) {
        console.log(e)
      }
    })
    // useMeta(() => (
    //  head({
    //    title: pageInfo.value.value.seo_title,
    //    descrp: pageInfo.value.value.seo_description,
    //  })
    // ))
    const metaInfo = pageInfo.value
    head(useMeta, metaInfo.value)

    store.commit('content/clearBgIntro')

    cards.value = useAsync(async () => {
      try {
        const response = await fetchData()
        totalPage.value = response?.data.last_page
        return response.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.path)

    store.commit('content/clearBgIntro')

    const { page, getData, dataPagination } = pagination(fetchData)

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
      pageInfo,
      clickTag
    }
  },
  head: {},
  watchQuery: ['page']
})
</script>
<style lang="scss" module>
.cards {
  width: 100%;
  display: flex;
  .col {
    width: 53.2rem;
  }
  &__item {
    margin-bottom: 2rem;
  }
}
</style>
