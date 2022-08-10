<template>
  <div :class="$style.wrapper">
    <vue-bottom-sheet
      :overlay="false"
      :effect="$mq === 'sm' ? 'fx-default' : effect"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :swipe-able="$mq === 'sm'"
      :is-full-screen="windowWidth>450"
      :rounded="$mq === 'sm'"
      v-on="$attrs"
      @closed="$emit('closed')"
    >
      <client-only>
        <!-- <n-icon name="close" :class="$style.close" @click="$emit('closeMenu')" /> -->
        <div>
          <N-Button-Close :class="$style.close" color="#222222" background-color="rgba(34, 34, 34, 0.1)" @click="$emit('closeMenu')" />
        </div>
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
    maxWidth: String,
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
    overflow: auto !important;
  }
  :global(.bottom-sheet__bar) {
    height: 6px !important;
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
:global(.bottom-sheet__bar) {
  height: 6px !important;
  background: rgba(#222222, 0.2);
  @media (min-width: $mobileWidth) {
    display: none !important;
  }
}
</style>
