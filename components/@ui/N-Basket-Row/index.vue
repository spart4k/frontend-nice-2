<template>
  <li :class="$style.product">
    <div :class="$style.product__img">
      <N-Lazy-Img :src="require('~/assets/img/cabel.jpeg')" alt="изоображение товара" />
    </div>
    <div :class="$style.product__description">
      <h3 :class="$style.product__title">
        {{ item.title }}
      </h3>
      <div v-if="!readonly" :class="$style.product__select">
        <n-select
          :select-items="selectItems"
          :position-arrow="{ right: '1.3rem' }"
        />
      </div>
      <div v-else :class="$style.count">
        1 шт
      </div>
      <div :class="$style.product__price">
        {{ item.price }}р.
      </div>
      <div v-if="!readonly" :class="$style.product__iconDelete">
        <n-icon name="delete" />
      </div>
    </div>
  </li>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'

export default {
  name: 'NBasketRow',
  props: {
    item: {
      type: Object
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const countProducts = ref(0)
    const selectItems = [
      { text: '1шт', value: 1 },
      { text: '2шт', value: 2 },
      { text: '3шт', value: 3 },
      { text: '4шт', value: 4 }
    ]
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
      selectItems,

      decrement,
      increment
    }
  }
}
</script>

<style lang="scss" module src="./style.scss"></style>
