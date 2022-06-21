<template>
  <div :class="$style.button__add_basket">
    <N-Button :disabled="disabled" @click="$emit('clickButton')">
      <slot />
    </N-Button>
  </div>
</template>

<script>
export default {
  name: 'NFixedButton',
  props: {
    disabled: Boolean
  }
}
</script>

<style scoped lang="scss" module>
.button__add_basket {
  background-color: rgba($black, 0.8);
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem 0;
  button {
    background-color: $yellow2;
    color: $black;
    @include montserratMedium;
    @include text;
  }
}
</style>
