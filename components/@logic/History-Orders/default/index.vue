<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      История заказов
    </div>
    <div class="">
      <div v-if="loading" :class="$style.nothing">
        <n-loading purple :class="$style.loading" />
      </div>
      <div v-else-if="order">
        <History-Orders-Item v-for="(item,index) in orders" :key="index" :order="item" />
      </div>
      <div v-else :class="$style.empty">
        Заказы отсутствуют
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useAsync, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'HistoryOrders',
  setup () {
    const { store } = useContext()
    const loading = ref(false)
    const orders = useAsync(async () => {
      const params = {
      }
      try {
        loading.value = true
        const data = await store.dispatch('orders/getOrders', params)
        loading.value = false
        return data.data
      } catch (e) {
        console.log(e)
      }
    })

    return {
      orders,
      loading
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
