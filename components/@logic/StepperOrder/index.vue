<template>
  <transition :name="keyAnimation === 'prev' ? 'slideShow' : 'slideback'">
    <component
      :is="isCurrentPage"
      :header-items="headerItems"
      @changeStep="changeStep"
      @changeComponent="changeComponent"
    />
  </transition>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'StepperOrder',
  props: {
    headerItems: Array,
    step: Number,
    currComp: String,
    keyAnimation: String
  },
  setup (props, { emit }) {
  const changeStep = (value) => {
    emit('changeStep', value)
  }

  const changeComponent = (value) => {
    console.log(value)
    // currentShowComponents.value = value.key
    emit('changeStep', 'increment')
    emit('changeComp', value.key)
  }

    const isCurrentPage = computed(() => {
    if (props.step === 0 && !props.currComp) {
        return 'n-nav-menu'
    } else if (props.currComp === 'basket') {
          switch (props.step) {
        case 1 :
          return 'StepOneBasket'
        case 2 :
          return 'StepTwoOrder'
        case 3 :
          return 'StepThreePlug'
        }
      } else if (props.currComp === 'registration') {
          switch (props.step) {
        case 1 :
          return 'FormAuthDefault'
        case 2 :
          return 'FormAuthLogin'
        case 3 :
          return 'FormAuthRecovery'
        default:
          return 'FormAuthDefault'
        }
    } else if (props.currComp === 'live-default') {
      return 'live-default'
    }
    })
    return {
      isCurrentPage,
      changeStep,
      changeComponent
    }
  }
}
</script>

<style scoped>

</style>
