<template>
  <div :class="$style.wrapper">
    <vue-bottom-sheet
      :overlay="false"
      :effect="$mq === 'sm' ? 'fx-default' : effect"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :swipe-able="$mq === 'sm' && touchEnable"
      :background-scrollable="$mq === 'sm' ? false : true && touchEnable"
      :background-clickable="true"
      :click-to-close="false"
      :is-full-screen="fullscreen"
      :rounded="$mq === 'sm'"
      :class="$style.bottomSheet"
      v-on="$attrs"
      @closed="$emit('closed')"
    >
      <!-- <client-only> -->
        <N-Button
          type-button="small"
          color="#222222"
          background-color="rgba(34, 34, 34, 0.1)"
          :class="$style.close"
          @click="$emit('closeMenu')"
        >
          <N-Icon name="close" :class="$style.closeButton" />
        </N-Button>
        <N-Button
          v-if="isShowButtonBack"
          type-button="small"
          :class="$style.back"
          color="#222222"
          background-color="rgba(34, 34, 34, 0.1)"
          @click="$emit('back')"
        >
          <N-Icon name="arrow-back" :class="$style.backButton" />
        </N-Button>
        <span ref="trigger">
          <slot />
        </span>
      <!-- </client-only> -->
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from '@nuxtjs/composition-api'

export default {
  name: 'NBottomSheet',
  props: {
    isShowButtonBack: Boolean,
    maxWidth: String,
    fullscreen: Boolean,
    maxHeight: {
      type: String,
      default: ''
    },
    effect: String
  },
  setup () {
    const windowWidth = ref()
    const trigger = ref()
    const touchEnable = ref(true)
    const windowWidthCount = () => {
      windowWidth.value = window.innerWidth
    }
    const scrollDown = () => {
      touchEnable.value = false
      window.addEventListener('touchend', scrollUp)
    }
    const scrollUp = () => {
      touchEnable.value = true
    }
    onMounted(() => {
      windowWidthCount()
      window.addEventListener('resize', windowWidthCount)
      trigger.value.addEventListener('touchstart', scrollDown)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', windowWidthCount)
      trigger.value.removeEventListener('touchstart', scrollDown)
    })
    return {
      windowWidth,
      windowWidthCount,
      trigger,
      scrollDown,
      scrollUp,
      touchEnable
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  .bottomSheet  {
    transform: translate3d(0, 0, 0);
  }
  .trigger {
    position: absolute;
    left: 0;
    width: 100%;
    height: calc(100% - 5rem);
  }
  position: relative;
  width: 37.5rem;
  .close, .back {
    position: absolute;
    top: 1.5rem;
  }
  .back {
    left: 1.5rem;
    .backButton {
      width: 1.8rem;
    }
  }
  .close {
    right: 1.5rem;
    z-index: 5;
    .closeButton {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
  :global(.bottom-sheet) {
    z-index: 9999 !important;
  }
  :global(.bottom-sheet__pan) {
      padding-bottom: 4rem !important;
      padding-top: 2rem !important;
      height: 5rem !important;
  }
  :global(.bottom-sheet__card) {
    overflow: hidden;
    @media (min-width: $mobileWidth) {
      left: 0!important;
    }
  }
  :global(.bottom-sheet__content) {
    overflow-y: unset !important;
    // transform: translate3d(0);

    // overflow-y: scroll !important;
    // overflow-x: hidden !important;
    // -webkit-overflow-scrolling: touch !important;
  }

  :global(.bottom-sheet.opened .bottom-sheet__card.fx-slide-from-left) {
    @media (min-width: $mobileWidth) {
      transform: translate(0, 0) !important;
    }
  }
  :global(.bottom-sheet.opened .bottom-sheet__card.fx-slide-from-right) {
    right: 0 !important;
    left: unset !important;
    @media (min-width: $mobileWidth) {
      transform: translate(0, 0) !important;
    }
  }
  :global(.bottom-sheet.closed .bottom-sheet__card.fx-slide-from-right) {
    right: 0 !important;
    left: unset !important;
  }
}
:global(.bottom-sheet__bar) {
  height: .4rem !important;
  background: rgba(0,0,0,.15) !important;
  // background: rgba(#222222, 0.2);
  @media (min-width: $mobileWidth) {
    display: none !important;
  }
}
</style>
