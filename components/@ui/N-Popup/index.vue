<template>
  <transition name='fade-fast'>
    <div
      v-if="$props.value"
      :class="$style.wrapper"
      @click="close"
    >
      <N-Contain :class="$style.popup" @click.stop>
        <div :class="$style.hat">
          <h2>{{ title }}</h2>
          <n-icon :class="$style.close" name="close" @click.stop="close" />
        </div>
        <slot />
      </N-Contain>
    </div>
  </transition>
</template>
<script lang="js">
import { watch } from '@nuxtjs/composition-api'
import NIcon from '~/components/@ui/N-Icon'

export default {
  name: 'NPopup',
  components: { NIcon },
  props: {
    value: Boolean,
    title: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const close = () => {
      emit('input', false)
    }
    watch(() => props.value, () => {
      const body = document.querySelector('body')
      if (props.value) {
        body.style.overflow = 'hidden'
        console.log('hidden')
        document.documentElement.style.overflow = 'hidden'
        return
      }
      body.style.overflow = 'visible'
      document.documentElement.style.overflow = 'visible'
    })
    return {
      close
    }
  }
}
</script>
<style lang="scss" module>
  .wrapper {
    position: fixed;
    z-index: 10;
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
    overflow: auto;
    .popup {
      margin-top: 10.7rem;
    }
    .hat {
      display: flex;
      align-items: center;
      color: $fontColorDefault;
    }
    .close {
      margin-left: auto;
      cursor: pointer;
    }
  }
</style>
