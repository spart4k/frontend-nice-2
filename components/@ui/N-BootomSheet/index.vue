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
        <N-Button-Icon
          icon-name="close"
          :class="$style.close"
          color="#222222"
          background-color="rgba(34, 34, 34, 0.1)"
          @click="$emit('closeMenu')"
        />
        <N-Button-Icon
          v-if="isShowButtonBack"
          icon-name="arrow-back"
          :class="$style.back"
          color="#222222"
          background-color="rgba(34, 34, 34, 0.1)"
          @click="$emit('back')"
        />
        <slot />
      </client-only>
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
    const windowWidthCount = () => {
      windowWidth.value = window.innerWidth
    }
    onMounted(() => {
      windowWidthCount()
      window.addEventListener('resize', windowWidthCount)
    })
    onUnmounted(() => {
      window.addEventListener('resize', windowWidthCount)
    })
    return {
      windowWidth,
      windowWidthCount
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  position: relative;
  width: 37.5rem;
  .close, .back {
    position: absolute;
    top: 1.5rem;
  }
  .back {
    left: 1.5rem;
  }
  .close {
    right: 1.5rem;
  }
  :global(.bottom-sheet__pan) {
      padding-bottom: 20px;
      padding-top: 15px;
      height: 5rem !important;
  }
  :global(.bottom-sheet__card) {
    @media (min-width: $mobileWidth) {
      left: 0!important;
    }
  }
  :global(.bottom-sheet__content) {
    overflow: auto !important;
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
