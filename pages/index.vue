<template>
  <n-intro :description="introTitle">
    <div :class="$style.cards">
      <div v-for="(card) in cards.value" :key="card.id" :class="$style.cards__item">
        <SectionCards :id="card.section.id" :key="card.id" :card="card" @clickTag="($event) => clickTag($event, card.section.id)" />
      </div>
      <client-only>
        <n-lazy-pagination
          v-if="cards.length > 0"
          @lazyPagination="lazyPagination"
        />
      </client-only>
    </div>
  </n-intro>
</template>
<script>
import { ref, useContext, useAsync, useRouter } from '@nuxtjs/composition-api'
import { pagination } from '~/plugins/pagination'
export default {
  name: 'IndexPage',
  setup () {
    const { store } = useContext()
    const router = useRouter()
    // const page = ref(1)
    const cards = ref([])

    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
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
    const clickTag = (tag, section) => {
      router.push({ path: 'tags', query: { tag, id: section } })
      console.log(tag, section)
    }
    store.commit('content/clearBgIntro')
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
      lazyPagination,
      clickTag
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
