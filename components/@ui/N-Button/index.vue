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
      required: false
    }
  }
}
</script>

<style scoped lang="scss" module>
  .btn{
    cursor: pointer;
  }
  .transparent {
    background-color: transparent;
    border: none;
    padding: 0;
  }
</style>
