<template>
  <div
    v-if="$props.value"
    :class="$style.wrapper"
    @click="close"
  >
    <N-Contain :class="$style.popup">
      <slot />
    </N-Contain>
  </div>
</template>
<script lang="js">
export default {
  name: 'NPopup',
  props: {
    value: Boolean
  },
  setup (props, ctx) {
    const { emit } = ctx
    const close = () => {
      emit('input', false)
    }
    return {
      close
    }
  }
}
</script>
<style lang="scss" module>
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    background-color: rgba($black, .7);
    padding-left: 2.2rem;
    padding-right: 2.2rem;
    padding-bottom: 3.5rem;
    .popup {
      margin-top: 14.7rem;
    }
  }
</style>
