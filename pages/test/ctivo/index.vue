<template>
  <n-intro :description="introTitle">
    <div :class="$style.cards">
      <div v-for="(card) in cards.value" :key="card.id" :class="$style.cards__item">
        <N-Card-Read
          :data="card"
          :author="{ src: require('~/assets/img/testPlug.jpg') }"
          :amount-comment="32"
        />
      </div>
      <n-lazy-pagination
        v-if="cards.length > 0"
        @lazyPagination="lazyPagination"
      />
    </div>
    </div>
  </n-intro>
</template>

<script>
import { ref, useContext, useAsync } from '@nuxtjs/composition-api'
import { pagination } from '~/plugins/pagination'

export default {
  name: 'NMusic',
  layout: 'default',
  setup () {
    const { store } = useContext()
    const introTitle = ref({
      title: 'ЧТИВО',
      subtitle: 'чето там про чтиво про про чтиво чтиво ',
      background: 'ctivo'
    })
    const cards = ref([])

    const fetch = (currentPage) => {
      const params = {
        page: currentPage,
        section_id: 1
      }
      const response = store.dispatch('pages/getData', params)
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
      page,
      cards,
      lazyPagination
    }
  }
}
</script>

<style scoped lang="scss" module>
.cards {
  &__item {
    margin-bottom: 2rem;
  }
}
</style>
