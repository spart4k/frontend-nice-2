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
import { ref, useContext, useAsync } from '@nuxtjs/composition-api'
import { pagination } from '~/plugins/pagination'
export default {
  name: 'IndexPage',
  setup () {
    const { store } = useContext()
    // const page = ref(1)
    const cards = ref([])

    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: 'main'
    })
    // store.commit('content/changeState', { key: 'logoBg', value: 'main' })
    const fetch = (currentPage) => {
      const params = {
        page: currentPage
      }
      const response = store.dispatch('main/getData', params)
      return response
    }

    const { page, getData } = pagination(fetch, cards.value)

    const lazyPagination = ($state) => {
      getData($state)
    }

    cards.value = useAsync(async () => {
      try {
        const response = await fetch()
        return response.data.data
      } catch (e) {
        console.log(e)
      }
    })

    return {
      introTitle,
      cards,
      page,
      lazyPagination
    }
  }
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
