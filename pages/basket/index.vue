<template>
  <div :class="$style.wrapper">
    <N-Background :description="description" />
    <ul v-if="row" :class="$style.list">
      <li v-for="card in row" :key="card.id" :class="$style.item">
        <N-Basket-Row
          :item="card"
          @decrement="decrementBasket"
          @increment="incrementBasket"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'NBasket',
  setup () {
    const description = ref({
      background: ''
    })
    const { store } = useContext()
    const row = computed(() => store.state?.basket?.basket?.data?.cards)
    const incrementBasket = (value) => {
      const params = {
        card_id: value,
        quantity: 1
      }
      store.dispatch('basket/addBasket', params)
    }
    const decrementBasket = (value) => {
      const params = {
        card_id: value,
        quantity: -1
      }
      store.dispatch('basket/addBasket', params)
    }
    return {
      description,
      row,
      incrementBasket,
      decrementBasket
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  @include container;
}
.list {
  position: relative;
  padding: 0;
  list-style: none;
  li + li {
    border-top: 1px solid rgba(255, 255, 255, 0.56);
    padding-top: 1.5rem;
    margin-top: 1.5rem;
  }
}

</style>
