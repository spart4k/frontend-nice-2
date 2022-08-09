<template>
  <div :class="$style.wrapper">
    <vue-bottom-sheet
      :overlay="false"
      :effect="$mq === 'sm' ? 'fx-default' : effect"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :swipe-able="$mq === 'sm'"
      :is-full-screen="fullscreen"
      :rounded="$mq === 'sm'"
      v-on="$attrs"
      @closed="$emit('closed')"
    >
      <client-only>
        <n-button-close
          color="#222222"
          background-color="rgba(34, 34, 34, 0.1)"
          name="close"
          :class="$style.close"
          @click="$emit('closeMenu')"
        />
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
    effect: String,
    fullscreen: {
      type: Boolean
    }
  },
  setup () {
    // const opened = () => {
    //   // document.body.style.position = 'fixed'
    //   // document.body.style.left = 0
    //   // document.body.style.top = 0
    //   // document.body.style.right = 0
    //   // document.body.style.bottom = 0
    //   document.body.cssText = 'position: fixed; left: 0; right: 0; top: 0; bottom: 0;'
    // }
    return {
      // opened
    }
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
  :global(.bottom-sheet__pan[data-v-61ac11a0]) {
      padding-bottom: 20px;
      padding-top: 15px;
      height: 5rem;
  }
  :global(.bottom-sheet__card) {
    @media (min-width: $mobileWidth) {
      left: 0!important;
    }
  }
  :global(.bottom-sheet__content) {
    //overflow-y: auto !important;
    flex: 1;
  }
  :global(.bottom-sheet.opened .bottom-sheet__card.fx-slide-from-left) {
    @media (min-width: $mobileWidth) {
      transform: translate(0, 0) !important;
    }
  }
}
:global(.bottom-sheet__bar) {
  height: 6px !important;
  background: rgba(#222222, 0.2);
  @media (min-width: $mobileWidth) {
    display: none !important;
  }
}
</style>
