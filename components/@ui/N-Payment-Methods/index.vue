<template>
  <li :class="[$style.item, active && $style.active]" v-on="$listeners">
    <div v-if="item.icon === 'phone-stepper'">
      <n-icon :name="item.icon" :class="[$style.iconLogo, !active && $style.iconLogoActive]" />
    </div>
    <div v-else :class="$style.icon">
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
  width: calc((100% / 3) - 1rem);
  height: 8rem;
  color: $fontColorDefault;
  padding: 1rem;
  border: .2rem solid $gray3;
  cursor: pointer;
  .text {
    color: inherit;
    text-align: center;
  }
  .icon {
    width: 3.5rem;
    height: 2.2rem;
  }
  .iconLogo {
    width: 1.98rem;
    height: 2.2rem;
    svg {
      height: 100%;
      width: 100%;
    }
    &.iconLogoActive {
      svg {
        path {
          fill: #222222;
        }
      }
    }
  }
  &.active {
    background-color: transparent;
    border-color: $pink2;
    .text {
      color: $pink2;
    }
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
