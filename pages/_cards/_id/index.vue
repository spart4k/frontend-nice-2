<template>
  <N-Intro no-preview>
    <div :class="$style.wrapper">
      <N-Background :description="description" hide-image />
      <template v-if="card">
        <SectionCards
          :id="card.section_id"
          :key="card.id"
          detail-page
          :card="card"
          @clickTag="clickTag"
        />
        <N-Fixed-Button v-if="card.is_product" :is-auth="isAuth" :check-auth="true" @clickButton="addBasket">
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
  </N-Intro>
</template>

<script>
import { ref, useAsync, useContext, defineComponent, useRouter, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DetailCards',
  layout: 'default',
  middleware: 'background',
  transition: 'home',
  setup () {
    const isAddedBasket = ref(false)
    const { route, store } = useContext()
    const router = useRouter()
    // const paramsId = computed(() => Number(route.value.params.id))
    const sections = computed(() => store?.state.content.sections)

    const description = computed(() => {
      return {
        background: bgName?.value?.slug
      }
      // title: bgName.value
    })

    const clickTag = (value) => {
      router.push({ path: '/tags', query: { tag: value } })
    }

    const card = useAsync(async () => {
      try {
        const response = await store.dispatch('detailPage/getData', route.value.params.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.params.id)

    const bgName = computed(() => {
      const find = sections.value?.find(item => Number(item.id) === +card.value?.section_id)
      return find
    })

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

    const isAuth = computed(() => {
      return store.state.authentication.authorizated
    })

    return {
      card,
      addBasket,
      clickTag,
      description,
      isAddedBasket,
      bgName,
      isAuth

    }
  }
})
</script>

<style scoped module lang="scss">
.wrapper {
  width: 100%;
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
  //padding: 2.4rem 0;
  button {
    height: 5.1rem;
    background-color: $yellow2;
    color: $black;
    @include montserratMedium;
    @include text;
  }
}
</style>
