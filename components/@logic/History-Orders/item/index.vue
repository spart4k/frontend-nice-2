<template>
  <div :class="$style.item">
    <div :class="$style.item__head">
      <div :class="$style.item__date">
        24.03.22
      </div>
      <div :class="$style.item__status">
        {{ $props.order.statusRu }}
      </div>
    </div>
    <div>
      <div v-for="(item) in $props.order.basket.cards" :key="item.key" :class="$style.item__info">
        <div>{{ item.title }}</div>
        <div>{{ item.price }}р.</div>
      </div>
    </div>
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
    font-size: 1.4rem;
    font-weight: 600;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0,0,0,.2);
    margin-bottom: 1.6rem;
    &:last-child {
      border-bottom: 0;
    }
    &__head {
      display: flex;
      margin-bottom: .7rem;
    }
    &__date {
      margin-right: 15px;
    }
    &__info {
      display: flex;
      justify-content: space-between;
      margin-bottom: .7rem;
    }
  }
</style>
