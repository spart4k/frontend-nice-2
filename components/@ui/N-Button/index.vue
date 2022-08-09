<template>
  <button :class="[$style[typeButton], $style.btn]" :style="{ color: color, backgroundColor: backgroundColor }" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'NButton',
  props: {
    typeButton: {
      type: String,
      default: '',
      required: false
    },
    color: {
      type: String,
      default: 'white'
    },
    backgroundColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss" module>
  .btn{
    box-sizing: border-box;
    cursor: pointer;
    border: none;
    border-radius: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @include button;
    transition: background-color .2s;
    padding: 1.4rem 3.7rem;
  }
  .sub {
    background: transparent;
    border: 1px solid $blueBlack2;
    color: $blueBlack2;
  }
  .disable {
    opacity: 0.5;
    pointer-events: none;
  }
  .pink {
    background-color: $pink2;
  }
  .transparent {
    background-color: transparent;
    border: none;
    padding: 0;
    &:hover {
      background-color: transparent;
    }
  }
  .wide {
    width: 100%;
  }
  .left {
    padding: 0;
    background-color: transparent;
  }
</style>
