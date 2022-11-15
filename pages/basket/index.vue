<template>
  <n-intro no-preview>
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
            {{ row.cards_sum }}р.
          </div>
        </div>
        <div :class="$style.last_view">
          <div :class="$style.last_view_title">
            Последние просмотренные
          </div>
          <div :class="$style.last_view_items">
            <ul v-if="userInfo && userInfo.length" :class="$style.last_view_list">
              <li v-for="views in userInfo" :key="views.id" :class="$style.last_view_item">
                <!-- <nuxt-link :to="`/card/${views.card_id}`">
                  <template v-if="views.card && views.card.images.length">
                    <n-lazy-img :src="`${$axios.defaults.baseURL}/${views.card.images[0].src}`" :alt="views.card.title" />
                  </template>
                </nuxt-link> -->
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
      <N-Fixed-Button v-if="cards && cards.length" fz="md" @clickButton="sendBasket">
        Заказать за {{ row.cards_sum }}
      </N-Fixed-Button>
    </div>
  </n-intro>
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
    // store.dispatch('authentication/getUserInfo')

    const incrementBasket = (value) => {
      const params = {
        card_id: value,
        quantity: 1,
        calc: true
      }
      store.dispatch('basket/addBasket', params)
    }

    const decrementBasket = (value) => {
      const params = {
        card_id: value,
        quantity: -1,
        calc: true
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
  color: $white;
  width: 100%;
  // margin-top: $headerHeight;
}
.rows {
  position: relative;
  margin-bottom: 3rem;
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
    font-size: 2.4rem;
  }
  &_price {
    @include text-style-h1;
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
    @include text-style-h1;
    @include Bankir-Retro;
  }
}
.last_view_title {
  margin-bottom: 1.25rem;
  @include regular-text;
}
.last_view_list {
  display: flex;
  padding: 0;
  width: 100%;
  height: 10.1rem;
  overflow-x: auto;
  margin: 0;
}
.last_view_item {
  width: 7.5rem;
  flex-shrink: 0;
  list-style: none;
  & + & {
    margin-left: 2rem;
  }
}
</style>
