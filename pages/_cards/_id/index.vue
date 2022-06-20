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
    <div :class="$style.button__add_basket">
      <N-Button>Добавить в корзину</N-Button>
    </div>
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
@include container;
  margin-bottom: 2rem;
}
.button__add_basket {
  background-color: rgba($black, 0.8);
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem 0;
  button {
    background-color: $yellow2;
    color: $black;
    @include montserratMedium;
    @include text;
  }
}
</style>
