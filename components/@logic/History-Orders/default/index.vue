<template>
  <div :class="$style.history">
    <div :class="$style.history__title">
      История заказов
    </div>
    <div v-if="hasCards">
      <History-Orders-Item v-for="(item) in orders.value" :order="item" :key='item.id'></History-Orders-Item>
    </div>
    <div v-else :class="$style.history__empty">
      Заказы отсутствуют
    </div>
  </div>
</template>

<script>
import { ref, useAsync, useContext, computed } from '@nuxtjs/composition-api'
export default {
  name: 'HistoryOrders',
  setup () {
    const { store } = useContext()
    const orders = ref([])
    orders.value = useAsync(async () => {
      try {
        const data = await store.dispatch('orders/getOrders')
        return data.data
      } catch (e) {
        console.log(e)
      }
    })

    const hasCards = computed(() => {
      console.log(orders.value)
      if (orders.value.length !== 0) {
        return true
      } else {
        return false
      }
    })

    return {
      orders,
      hasCards
    }
  }
}
</script>

<style lang="scss" module>
  .history {
    width: 100%;
    padding: 1.8rem;
    border-radius: 1rem;
    background-color: #ffffff;
    &__title {
      color: $fontColorDefault;
      font-size: 1.8rem;
      margin-bottom: 2.8rem;
      font-weight: 600;
    }
    &__empty {
      font-size: 2.4rem;
      font-weight: 600;
      text-align: center;
    }
  }
</style>
