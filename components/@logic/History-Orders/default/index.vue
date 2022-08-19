<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      История заказов
    </div>
    <div class="">
      <div v-if="true">
        <History-Orders-Item />
      </div>
      <div v-else :class="$style.empty">
        Заказы отсутствуют
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useAsync, useContext, computed, watch } from '@nuxtjs/composition-api'
export default {
  name: 'HistoryOrders',
  setup () {
    const { store } = useContext()
    const orders = ref([])
    const cardsLength = ref(0)
    orders.value = useAsync(async () => {
      try {
        const data = await store.dispatch('orders/getOrders')
        return data.data
      } catch (e) {
        console.log(e)
      }
    })

    const hasCards = computed(() => {
      if (orders.value.length !== 0) {
        return true
      } else {
        return false
      }
    })
    watch(() => orders.value, (newValue) => { cardsLength.value = newValue.length })
    return {
      orders,
      hasCards,
      cardsLength
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  padding: 0 1.5rem;
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin: 1.5rem 0 2rem;
  }
  .empty {
    @include regular-text;
    color: $fontColorDefault;
    opacity: 0.5;
    text-align: center;
  }
}
</style>
