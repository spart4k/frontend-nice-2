<template>
  <div :class="$style.item">
    <div :class="$style.order">
      Заказ №{{ $props.order.id }}
    </div>
    <div :class="$style.title">
      <!-- Кабель переходник, 1 шт. -->
    </div>
    <div :class="$style.price">
      {{ $props.order.delivery_price + $props.order.cards_sum }}
    </div>
    <div :class="$style.status">
      {{ $props.order.status.status_name }}
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  name: 'HistoryOrdersItem',
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const id = ref(props.order.id)

    return {
      id
    }
  }
}
</script>

<style lang="scss" module>
  .item {
    width: 100%;
    display: flex;
    background: #F5F5F5;
    border-radius: 20px;
    padding: 1.5rem;
    flex-direction: column;
    .order {
      @include button;
      color: $fontColorDefault;
    }
    .title {
      @include regular-text;
      color: $fontColorDefault;
      margin-top: 1rem;
    }
    .price {
      @include regular-text-bold;
      color: $fontColorDefault;
      margin-top: .5rem;
    }
    .status {
      @include regular-text;
      margin-top: 1rem;
    }
  }
</style>
