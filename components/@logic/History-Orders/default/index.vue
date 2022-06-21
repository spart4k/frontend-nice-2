<template>
  <div :class="$style.history">
    <div :class="$style.history__title">
      История заказов
    </div>
    <div>
      <History-Orders-Item v-for="(item) in orders.value" :order="item" :key='item.id'></History-Orders-Item>
    </div>
  </div>
</template>

<script>
import { ref, useAsync, useContext } from '@nuxtjs/composition-api'
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

    return {
      orders
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
  }
</style>
