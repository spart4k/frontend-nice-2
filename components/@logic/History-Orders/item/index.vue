<template>
  <div :class="$style.item">
    <div :class="$style.order">Заказ №223</div>
    <div :class="$style.title">Кабель переходник, 1 шт.</div>
    <div :class="$style.price">3 500 р.</div>
    <div :class="$style.status">Доставка</div>
    <!-- <div :class="$style.item__head">
      <div :class="$style.item__date">
        24.03.22
      </div>
      <div :class="$style.item__status"> -->
        <!-- {{ $props.order.statusRu }} -->
        <!-- cnfnec
      </div>
    </div>
    <div> -->
      <!-- <div v-for="(item) in $props.order.basket.cards" :key="item.key" :class="$style.item__info"> -->
        <!-- <div>{{ item.title }}</div> -->
        <!-- <div>{{ item.price }}р.</div> -->
      <!-- </div> -->
      <!-- <div :class="$style.item__info">
        <div> item.title </div>
        <div> item.price р.</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'HistoryOrdersItem',
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {

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
