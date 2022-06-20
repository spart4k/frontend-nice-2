<template>
  <n-intro :description="introTitle">
    <n-preloader v-if="loading" />
    <template v-if="cards.value">
      <SectionCards
        v-for="card in cards.value.data"
        :id="card.section_id"
        :key="card.id"
        :card="card"
        @clickTag="clickTag"
      />
    </template>
    <client-only>
      <n-lazy-pagination
        @lazyPagination="lazyPagination"
      />
    </client-only>
  </n-intro>
</template>

<script>
import { ref, useAsync, useContext, useRouter } from '@nuxtjs/composition-api'

export default {
  name: 'NShop',
  setup (_, ctx) {
    const { $store } = ctx.root
    const { route } = useContext()
    const router = useRouter()

    const cards = ref([])
    const loading = ref(false)
    const introTitle = ref({
      title: 'Главная3',
      subtitle: 'творческое объединение',
      background: ''
    })

    const fetchData = async () => {
      const response = await $store.dispatch('shop/getData')
       return response.data
    }
    const lazyPagination = () => {
      console.log(222)
    }
    const clickTag = (value) => {
      router.push({ path: '/tags', query: { tag: value } })
    }

    cards.value = useAsync(fetchData, route.value.path)

    return {
      introTitle,
      cards,
      loading,
      clickTag,
      lazyPagination
    }
  }
}
</script>

<style scoped>

</style>
