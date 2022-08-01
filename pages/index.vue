<template>
  <n-intro :description="introTitle">
    <!--      <TransitionGroup name="home" tag="div">-->
    <NGridCard
      v-if="cards.value && cards.value.data"
      :items="cards.value.data"
      @clickTag="clickTag"
    />
    <!--    <div v-if="cards.value && cards.value.data">-->
    <!--      {{ cards.value && cards.value.data }}-->
    <!--    </div>-->
    <!--      </transitiongroup>-->
    <!--      <client-only>-->
    <!--        <n-lazy-pagination-->
    <!--          @lazyPagination="lazyPagination"-->
    <!--        />-->
    <!--      </client-only>-->
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
    store.commit('content/clearBgIntro')

    cards.value = useAsync(async () => {
      try {
        const response = await fetchData()
        totalPage.value = response?.data.last_page
        return response.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.fullPath)
    store.commit('content/clearBgIntro')
    const metaInfo = cards.value
    head(useMeta, metaInfo.value)

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
  flex-wrap: wrap;
  justify-content: center;
  .col:first-child {
    margin-right: 2rem;
  }
  .col {
    width: 100%;
    max-width: 53.2rem;
  }
  &__item {
    margin-bottom: 2rem;
  }
}
</style>
