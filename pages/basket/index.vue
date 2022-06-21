<template>
  <div :class="$style.wrapper">
    <N-Background :description="description" />
    <div v-if="cards && cards.length" :class="$style.rows">
      <ul :class="$style.list">
        <li v-for="card in cards" :key="card.id" :class="$style.item">
          <N-Basket-Row
            :item="card"
            @decrement="decrementBasket"
            @increment="incrementBasket"
          />
        </li>
      </ul>
      <div :class="$style.total__sum">
        <div :class="$style.total__sum_text">
          ИТОГО
        </div>
        <div :class="$style.total__sum_price">
          {{ row.cards_sum }}
        </div>
      </div>
      <div :class="$style.last_view">
        <div :class="$style.last_view_title">
          Последние просмотренные
        </div>
        <div :class="$style.last_view_items">
          <ul v-if="userInfo && userInfo.length" :class="$style.last_view_list">
            <li v-for="views in userInfo" :key="views.id" :class="$style.last_view_item">
              <template v-if="views.card.images.length">
                <n-lazy-img :src="`${$axios.defaults.baseURL}${views.card.images[0].src}`" />
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else :class="$style.empty_basket">
      <h1>
        Корзина пуста
      </h1>
    </div>
    <N-Fixed-Button v-if="cards && cards.length" @clickButton="sendBasket">
      Заказать
    </N-Fixed-Button>
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
    const row = computed(() => store.state?.basket?.basket?.data)
    const cards = computed(() => row.value?.cards)
    const userInfo = computed(() => store.state.authentication.user.last_views)
    store.dispatch('auth/getUserInfo')

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

    const sendBasket = async () => {
     await store.dispatch('basket/sendBasket', row.value)
     await store.dispatch('basket/getBasket')
    }
    return {
      description,
      row,
      incrementBasket,
      decrementBasket,
      sendBasket,
      cards,
      userInfo
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  @include container;
  color: $white
}
.rows {
  position: relative;
}
.list {
  padding: 0;
  list-style: none;
  margin-bottom: 2.3rem;
  li {
    border-bottom: 1px solid rgba(255, 255, 255, 0.56);
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
.total__sum {
  @include Bankir-Retro;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5.3rem;
  &_text {
    @include subtitle-big;
  }
  &_price {
    @include title;
    color: $yellow;
  }
}
.empty_basket {
  position: relative;
  text-align: center;
  z-index: 2;
  color: $white;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    @include Bankir-Retro;
    @include title;
  }
}
.last_view_list {
  display: flex;
  padding: 0;
  width: 100%;
  overflow: auto;
}
.last_view_item {
  width: 7.5rem;
  max-height: 10.1rem;
  flex-shrink: 0;
  list-style: none;
  & + & {
    margin-left: 2rem;
  }
}
</style>
