<template>
  <li :class="[$style.item, active && $style.active]" v-on="$listeners">
    <div :class="$style.icon">
      <n-icon :name="item.icon" />
    </div>
    <div :class="$style.text">
      {{ item.text }}
    </div>
  </li>
</template>

<script>
export default {
  name: 'NPaymentMethods',
  props: {
    item: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" module>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-shrink: 0;
  background-color: $gray3;
  border-radius: 2rem;
  width: 13rem;
  height: 8rem;
  color: $fontColorDefault;
  padding: 1rem;
  border: 2px solid $gray3;
  cursor: pointer;
  .text {
    color: inherit;
    text-align: center;
    .icon {
      width: 3.5rem;
      height: 2.2rem;
    }
  }
  &.active {
    background-color: transparent;
    border-color: $pink2;
    .icon {
      svg {
        path {
          fill: $pink2;
        }
      }
    }
  }

}
</style>
