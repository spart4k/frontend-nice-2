<template>
  <div :class="$style.item">
    <div :class="$style.order">
      Заказ №{{ $props.order.id }}
    </div>
    <div :class="$style.status" :style="{ color: color }">
      {{ $props.order.status.status_name }}
    </div>
    <div :class="$style.title">
      {{ description }}
    </div>
    <div :class="$style.price">
      {{ $props.order.delivery_price + $props.order.cards_sum }} р.
    </div>
    <div :class="$style.status">
      Детализация отправлена на адрес электоронной почты
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@nuxtjs/composition-api'
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
    const description = computed(() => {
      if (props.order?.basket?.cards) {
        const string = ref('')
        props.order.basket.cards.forEach((item) => {
          string.value += item.title + ', ' + item.pivot.quantity + 'шт. '
          if (item.pivot.details) {
            console.log(item.pivot.details)
            string.value += JSON.parse(item.pivot.details).начало + ', ' + JSON.parse(item.pivot.details).конец + ', ' + JSON.parse(item.pivot.details).длина + 'см. '
          }
        })
        return string.value
      }
    })
    const color = computed(() => {
      if (props.order.status.id === 1) { return '#222222' }
      if (props.order.status.id === 2) { return '#222222' }
      if (props.order.status.id === 3) { return '#DCB247' }
      if (props.order.status.id === 4) { return '#b2d266' }
      if (props.order.status.id === 5) { return '#73CA55' }
      if (props.order.status.id === 6) { return '#73CA55' }
      if (props.order.status.id === 7) { return '#D13C33' }
      if (props.order.status.id === 8) { return '#222222' }
    })
    return {
      id,
      color,
      description
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
