<template>
  <button :class="[$style[typeButton], $style.btn]" v-on="$listeners">
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
    }
  }
}
</script>

<style scoped lang="scss" module>
  .btn{
    cursor: pointer;
    border: 1px solid $blueBlack;
    border-radius: .4rem;
    background-color: $blueBlack;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5.1rem;
    color: $white;
    font-weight: 600;
    @include text;
    transition: background-color .2s;
    max-width: 100%;
    transition: .2s;
    //&:hover {
    //  background-color: rgba($blueBlack, .9);
    //}
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
  .transparent {
    background-color: transparent;
    border: none;
    padding: 0;
    &:hover {
      background-color: transparent;
    }
  }
</style>
