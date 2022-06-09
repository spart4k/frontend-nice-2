<template>
  <div :class="$style.product">
    <div :class="$style.product__img">
      <img :src="item.img" alt="изоображение товара">
    </div>
    <div :class="$style.product__description">
      <h3 :class="$style.product__title">
        {{ item.title }}
      </h3>
      <div :class="$style.product__title">
        {{ item.price }}
      </div>
      <div :class="$style.product__change_count">
        <div :class="$style.product__buttons">
          <n-button type-button="transparent" @click="decrement">
            <n-icon name="minus" />
          </n-button>
          <div :class="$style.product__count">
            {{ countProducts }}
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
      if (countProducts.value === 0) { return }
      countProducts.value -= 1
      emit('changeCount', countProducts.value)
    }
    const increment = () => {
      countProducts.value += 1
      emit('changeCount', countProducts.value)
    }

    const totalPrice = computed(() => props.item.price * countProducts.value)
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
