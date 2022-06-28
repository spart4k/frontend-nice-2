<template>
  <n-intro :description="introTitle">
    <div :class="$style.cards">
      <!--      <template v-for="card in cards">-->
      <!--        <component-->
      <!--          :is="componentsName[card.section.slug]"-->
      <!--          :key="card.id"-->
      <!--          :data="card"-->
      <!--          :amount-comment="32"-->
      <!--        />-->
      <!--        :author="{ src: require('~/assets/img/testPlug.jpg') }"-->
      <div v-for="(card) in cards.value" :key="card.id" :class="$style.cards__item">
        <template v-if="card.section.id === 1">
          <N-Card-MusicDetail :data="card" />
        </template>
        <template v-if="card.section.id === 3">
          <N-Card-Read
            :data="card"
            :author="{ src: require('~/assets/img/testPlug.jpg') }"
            :amount-comment="32"
          />
        </template>
      </div>
      <n-lazy-pagination
        v-if="cards.length > 0"
        @lazyPagination="lazyPagination"
      />
    </div>
  </n-intro>
</template>
<script>
import { ref, defineComponent, useContext, useAsync, useMeta } from '@nuxtjs/composition-api'
import { pagination } from '~/plugins/pagination'
import { head } from '@/components/scripts/head.js'
export default defineComponent({
  name: 'IndexPage',
  head: {},
  setup () {
    const { store } = useContext()
    // const page = ref(1)
    const cards = ref([])

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
    head(useMeta, pageInfo.value)
    const { page, getData } = pagination(fetch, cards.value)

    const lazyPagination = ($state) => {
      getData($state)
    }
    store.commit('content/clearBgIntro')
    cards.value = useAsync(async () => {
      try {
        const response = await fetchData()
        return response.data.data
      } catch (e) {
        console.log('s')
        console.log(e)
      }
    })

    return {
      introTitle,
      cards,
      page,
      lazyPagination,
      pageInfo
    }
  }
})
</script>
<style lang="scss" module>
.cards {
  width: 100%;
  &__item {
    margin-bottom: 2rem;
  }
}
</style>
