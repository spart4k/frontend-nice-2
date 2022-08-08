<template>
  <div :class="$style.wrapper">
    <vue-bottom-sheet
      :overlay="true"
      :effect="$mq === 'sm' ? 'fx-default' : effect"
      :max-width="maxWidth"
      :max-height="$mq === 'sm' ? '90%' : '100%'"
      :swipe-able="$mq === 'sm'"
      :is-full-screen="true"
      :rounded="$mq === 'sm'"
      v-on="$attrs"
      @closed="$emit('test')"
    >
      <client-only>
        <n-icon name="close" :class="$style.close" @click="$emit('closeMenu')" />
        <slot />
      </client-only>
    </vue-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: 'NBottomSheet',
  props: {
    maxWidth: String,
    maxHeight: {
      type: String,
      default: ''
    },
    effect: String
  }
}
</script>

<style lang="scss" module>
.wrapper {
  .close {
    position: absolute;
    z-index: 20;
    top: 1.5rem;
    right: 1.5rem;
    width: 3.2rem;
    height: 3.2rem;
    svg {
      width: 100%;
      height: 100%;
    }
    cursor: pointer;
  }
  :global(.bottom-sheet__card) {
    @media (min-width: $mobileWidth) {
      left: 0!important;
    }
  }
  :global(.bottom-sheet__content) {
    overflow: auto !important;
  }
  :global(.bottom-sheet__bar) {
    height: 6px;
    background: #222222;
    opacity: 0.2;
    @media (min-width: $mobileWidth) {
      display: none;
    }
  }
  :global(.bottom-sheet.opened .bottom-sheet__card.fx-slide-from-left) {
    @media (min-width: $mobileWidth) {
      transform: translate(0, 0) !important;
    }
  }
}

</style>
