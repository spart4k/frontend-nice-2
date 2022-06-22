<template>
  <div :class="[$style.button__add_basket, $style[`fz_${fz}`]]">
    <N-Button :disabled="disabled" @click="$emit('clickButton')">
      <slot />
    </N-Button>
  </div>
</template>

<script>
export default {
  name: 'NFixedButton',
  props: {
    disabled: Boolean,
    fz: String
  }
}
</script>

<style scoped lang="scss" module>
.button__add_basket {
  background-color: rgba($black, 0.8);
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  @include container;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    background-color: $yellow2;
    color: $black;
    @include montserratMedium;
    @include text;
  }
  .fz_md {
    @include text-md;
  }
}
</style>
