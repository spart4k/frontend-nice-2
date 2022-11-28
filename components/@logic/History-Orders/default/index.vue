<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      История заказов
    </div>
    <div :class="$style.container">
      <div v-if="loading" :class="$style.nothing">
        <n-loading purple :class="$style.loading" />
      </div>
      <div v-else-if="orders" :class="$style.orderList">
        <History-Orders-Item v-for="(item,index) in orders.data" :key="index" :order="item" :class="$style.item" />
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
        page: 1,
        count: 100
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
  overflow-y: auto;
  overflow-x: hidden;
  transform: translate3d(0);
  height: 100%;
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
  .item+.item {
    margin-top: 2.5rem;
  }
  .orderList {
    margin-bottom: 2.5rem;
  }
  .container {
    width: 100%;
    // height: 100%;
    // overflow: hidden;
  }
  .nothing{
    width: 100%;
    height: 100%;
    text-align: center;
    margin: auto 0;
    .loading {
      display: block;
      margin: 0 auto
    }
    .nothingToShow {
      @include regular-text;
      color: $fontColorDefault;
      opacity: 0.5;
    }
  }
}
</style>
