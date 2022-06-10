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
    border: none;
    border-radius: .4rem;
    background-color: $blueBlack;
    padding: 1.565rem 5.5rem;
    color: $white;
    font-weight: 600;
    @include text;
    transition: background-color .2s;
    &:hover {
      background-color: rgba($blueBlack, .9);
    }
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
