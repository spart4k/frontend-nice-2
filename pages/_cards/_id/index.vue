<template>
  <div :class="$style.wrapper">
    <N-Background :description="description" />
    <SectionCards
      v-if="card"
      :id="card.section_id"
      :key="card.id"
      detail-page
      :card="card"
      @clickTag="clickTag"
    />
  </div>
</template>

<script>
import { ref, useAsync, useContext, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DetailCards',
  layout: 'default',
  setup () {
    const introTitle = ref({
      title: 'Главная1233',
      subtitle: 'творческое объединение',
      background: ''
    })
    const { route, store } = useContext()
    // const fetchData = async () => {
    //   try {
    //     const response = await store.dispatch('detailPage/getData', route.value.params.id)
    //     return response.data
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    const description = ref({
      background: ''
    })
    const lazyPagination = () => {
      console.log(222)
    }
    const clickTag = () => {
      console.log(222)
    }

    const card = useAsync(async (ctx) => {
      try {
        const response = await store.dispatch('detailPage/getData', route.value.params.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.params.id)

    return {
      introTitle,
      card,
      lazyPagination,
      clickTag,
      description
    }
  }
})
</script>

<style scoped module lang="scss">
.wrapper {
  background-image: url('@/assets/img/background/ctivo-background.jpg');
  margin-top: var(--header-height);
}
</style>
