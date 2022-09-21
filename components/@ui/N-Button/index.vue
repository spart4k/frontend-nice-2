<template>
  <button :class="[$style[typeButton], $style.btn, $props.disable && $style.disable]" :style="{ color: color, backgroundColor: backgroundColor }" v-on="$listeners">
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
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss" module>
  .btn{
    box-sizing: border-box;
    cursor: pointer;
    border: none;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include button;
    transition: background-color .2s;
    transition: scale .1s;
    padding: 1.4rem 3.7rem;
    &:disabled {
      opacity: 0.5;
    }
  }
  .btn:hover {
    // scale: 1.02;
  }
  .sub {
    background: transparent;
    border: .1rem solid $blueBlack2;
    color: $blueBlack2;
  }
  .disable {
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
  .small {
    padding: 0.9rem;
    width: 3.2rem;
    height: 3.2rem;
  }
  .play {
    padding: 0;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
</style>
