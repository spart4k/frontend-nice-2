<template>
  <n-intro :description="introTitle">
    <template v-for="card in cards.value">
      <SectionCards :id="id" :key="card.id" :card="card" @clickTag="clickTag" />
    </template>
    <!--    <SectionCards :id="id" :cards="cards" @clickTag="clickTag" />-->
  </n-intro>
</template>

<script>
import { ref, useRoute, useAsync, useContext, computed, useRouter } from '@nuxtjs/composition-api'

export default {
  name: 'NMusic',
  layout: 'default',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { store } = useContext()
    const cards = ref([])
    const id = computed(() => Number(route.value.query.id))

    const introTitle = ref({
      title: 'ВИДЕО2',
      subtitle: 'чето там про видео про видео про видео',
      background: route.value.params.slug
    })

    const fetchData = (currentPage) => {
      const params = {
        page: currentPage,
        section_id: id.value,
        tag_id: route.value.query.tag ? route.value.query.tag : ''
      }
      const response = store.dispatch('pages/getData', params)
      return response
    }
    const clickTag = (value) => {
      router.push({ path: 'tags', query: { tag: value, id: id.value } })
    }
    store.commit('content/changeBgIntro', route.value.params.slug)
    cards.value = useAsync(async () => {
      try {
        const response = await fetchData()
        return response.data.data
      } catch (e) {
        console.log(e)
      }
    }, Math.random())

    return {
      introTitle,
      cards,
      clickTag,
      id
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
}
</style>
