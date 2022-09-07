<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Ваша корзина
    </h2>
    <template v-if="basketPrice">
      <ul :class="$style.list">
        <n-basket-row v-for="(item, index) in basketData" :key="index" :item="item" @deleteFromBasket="deleteFromBasket(item, index)" />
      </ul>
      <div :class="$style.totalPrice">
        <div :class="$style.totalPrice__text">
          Итого
        </div>
        <div :class="$style.totalPrice__sum">
          {{ basketPrice }} р.
        </div>
      </div>
      <n-button
        :class="$style.btn"
        :type-button="'pink'"
        @click="$emit('changeStep', 'increment')"
      >
        Оформить заказ
      </n-button>
    </template>
    <template v-else>
      <div :class="$style.nothing">
        <p :class="$style.nothingToShow">
          Нет информации для отображения
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { useContext, useAsync, reactive, computed } from '@nuxtjs/composition-api'
export default {
  name: 'StepOne',
  setup () {
    const { store } = useContext()
    const basketData = reactive(store.state.basket.basket)
    const basketPrice = computed(() => { return store.state.basket.basketSum })
    const deleteFromBasket = (item, index) => {
      useAsync(async () => {
        const cardData = {
          card_id: item.pivot.card_id,
          quantity: item.pivot.quantity
        }
        try {
          const responseDelete = await store.dispatch('basket/deleteFromBasket', cardData)
          if (!responseDelete.error) {
            store.commit('basket/removeFromBasket', index)
          }
        } catch (e) {
          console.log(e)
        }
      })
    }
    return {
      basketData,
      basketPrice,
      deleteFromBasket
    }
  }
}
</script>

<style  lang="scss" module>
.wrapper {
  @include paddings;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  height: 100%;
  overflow-y: auto;
  @include paddings;
  overscroll-behavior-y: contain !important;
  transform: translate3d(0px, 0, 0);
  color: $fontColorDefault;
}
.title {
  margin-bottom: 2rem;
}
ul {
  padding-left: 0;
}
.list {
  border-radius: 2rem;
  margin-bottom: 3rem;
    li+li {
    margin-top: 2rem;
  }
}
.btn {
  width: 100%;
  margin-bottom: 2.5rem;
}
.totalPrice {
  margin-bottom: 3rem;
  &__text {
    margin-bottom: .5rem;
    @include button;
  }
  &__sum {
    margin-bottom: .5rem;
    @include text-style-h2;
  }
}
.title {
  text-align: center;
  @include text-style-h2;
}
.nothing{
  width: 100%;
  text-align: center;
  margin-top: 40vh;
  .nothingToShow {
    @include regular-text;
    color: $fontColorDefault;
    opacity: 0.5;
  }
}
</style>
