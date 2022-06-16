<template>
  <div>
    <n-intro :description="introTitle">
      {{ $store.state.content.bgImages }}
      {{ $route.name }}
      <!--      <N-Card-MusicDetail :data="card" />-->
    </n-intro>
  </div>
</template>

<script>
import { ref, useRoute, useAsync, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'NMusic',
  layout: 'default',
  setup () {
    const route = useRoute()
    const { store } = useContext()
    const cards = ref([])
    const fetchData = (currentPage) => {
      const params = {
        page: currentPage
      }
      const response = store.dispatch('main/getData', params)
      return response
    }

    cards.value = useAsync(async () => {
      try {
        store.commit('content/changeState', { key: 'bgIntro', value: route.value.params.slug })
        const response = await fetchData()
        return response.data.data
      } catch (e) {
        console.log(e)
      }
    })
    const introTitle = ref({
      title: 'ВИДЕО2',
      subtitle: 'чето там про видео про видео про видео',
      background: route.value.params.slug
    })
    return {
      introTitle
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
}
</style>
