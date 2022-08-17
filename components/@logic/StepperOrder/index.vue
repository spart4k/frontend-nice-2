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
    emit('changeStep', 'increment')
    emit('changeComp', { key: value.value.key, effect: value.value.effect })
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
          if (props.step) {
            return 'StepThreePlug'
          } else {
            return 'ChangeAddress'
          }
        }
      } else if (props.currComp === 'registration' && true) {
          switch (props.step) {
        case 1 :
          return 'FormAuthDefault'
        case 2 :
          return 'FormAuthLogin'
        case 3 :
          return 'FormAuthRecovery'
        }
    } else if (props.currComp === 'registration' && !true) {
          switch (props.step) {
        case 1 :
          return 'FormProfileDefault'
        case 2 :
          return 'History-OrdersDefault'
        }
    } else if (props.currComp === 'search') {
          switch (props.step) {
        case 1 :
          return 'Search-Cards'
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
