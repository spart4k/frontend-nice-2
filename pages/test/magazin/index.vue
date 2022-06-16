<template>
  <div>
    <n-intro :description="introTitle">
      {{ cards.value }}
      <!--      <N-Card-MusicDetail :data="cards" />-->
    </n-intro>
  </div>
</template>

<script>
import { ref, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'

export default {
  name: 'NMusic',
  layout: 'default',
  setup () {
    const route = useRoute()
    const { store } = useContext()
    const cards = ref([])
    const fetch = (currentPage) => {
      const params = {
        page: currentPage,
        section_id: route.value.params.id
      }
      const response = store.dispatch('pages/getData', params)
      return response
    }
    cards.value = useAsync(async () => {
      try {
        const response = await fetch()
        return response.data.data
      } catch (e) {
        console.log(e)
      }
    })

    const introTitle = ref({
      title: 'МАГАЗИН',
      subtitle: 'чето про магазин чето про магазин чето про магазин чето про магазин чето про магазин чето про магазин',
      background: route.value.name
    })
    console.log(route.value)
    return {
      introTitle,
      cards
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
}
</style>
