<template>
  <div :class="$style.wrapper">
    <N-Background :description="description" />
    <template v-if="card">
      <SectionCards
        :id="card.section_id"
        :key="card.id"
        detail-page
        :card="card"
        @clickTag="clickTag"
      />
      <N-Fixed-Button v-if="card.is_product" @clickButton="addBasket">
        <template v-if="!isAddedBasket">
          Добавить в корзину
        </template>
        <template v-else>
          Перейти в корзину
        </template>
        <!--        {{ !isAddedBasket ? 'Добавить в корзину' : 'Добавлено' }}-->
      </N-Fixed-Button>
    </template>
  </div>
</template>

<script>
import { ref, useAsync, useContext, defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DetailCards',
  layout: 'default',
  setup () {
    const introTitle = ref({
      title: 'Test',
      subtitle: 'творческое объединение',
      background: ''
    })
    const isAddedBasket = ref(false)
    const { route, store } = useContext()
    const router = useRouter()

    const description = ref({
      background: ''
    })

    const clickTag = (value) => {
      router.push({ path: '/tags', query: { tag: value } })
    }

    const card = useAsync(async (ctx) => {
      try {
        const response = await store.dispatch('detailPage/getData', route.value.params.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.params.id)
    const addBasket = () => {
      if (!isAddedBasket.value) {
        isAddedBasket.value = true
        const params = {
          card_id: route.value.params.id,
          quantity: 1
        }
        store.dispatch('basket/addBasket', params)
      } else {
        router.push('/basket')
      }
    }

    return {
      introTitle,
      card,
      addBasket,
      clickTag,
      description,
      isAddedBasket
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
