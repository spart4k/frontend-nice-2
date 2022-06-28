<template>
  <div :class="$style.product">
    <div :class="$style.product__img">
      <N-Lazy-Img :src="`${$axios.defaults.baseURL}${item.images[0].src}`" alt="изоображение товара" />
    </div>
    <div :class="$style.product__description">
      <h3 :class="$style.product__title">
        {{ item.title }}
      </h3>
      <div :class="$style.product__title">
        {{ item.price }}р.
      </div>
      <div :class="$style.product__change_count">
        <div :class="$style.product__buttons">
          <n-button type-button="transparent" @click="decrement">
            <n-icon name="minus" />
          </n-button>
          <div :class="$style.product__count">
            {{ item.pivot.quantity }}
          </div>
          <n-button type-button="transparent" @click="increment">
            <n-icon name="plus" />
          </n-button>
        </div>

        <div :class="$style.product__total_price">
          {{ totalPrice }}р
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'

export default {
  name: 'NBasketRow',
  props: {
    item: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const countProducts = ref(0)
    const decrement = () => {
      // if (countProducts.value === 0) { return }
      emit('decrement', props.item.pivot.card_id)
    }
    const increment = () => {
      emit('increment', props.item.pivot.card_id)
    }
    const totalPrice = computed(() => props.item?.pivot?.price * props?.item?.pivot?.quantity)
    return {
      countProducts,
      totalPrice,

      decrement,
      increment
    }
  }
}
</script>

<style lang="scss" module src="./style.scss"></style>
