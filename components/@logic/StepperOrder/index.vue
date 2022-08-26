<template>
  <transition :name="keyAnimation === 'prev' ? 'slideShow' : 'slideback'">
    <component
      :is="isCurrentPage"
      :header-items="headerItems"
      @changeStep="changeStep"
      @changeComponent="changeComponent"
      @toAddress="toAddress"
      @closeState="$emit('closeState')"
    />
  </transition>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'

export default {
  name: 'StepperOrder',
  props: {
    headerItems: Array,
    step: Number,
    currComp: String,
    keyAnimation: String
  },
  setup (props, { emit }) {
  const { store } = useContext()
  const isAddress = ref(false)
  const changeStep = (value) => {
    emit('changeStep', value)
  }

  const changeComponent = (value) => {
    emit('changeStep', 'increment')
    emit('changeComp', { key: value.value.key, effect: value.value.effect })
  }

  const toAddress = (value) => {
    isAddress.value = value
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
          if (isAddress.value) {
            return 'ChangeAddress'
          } else {
            return 'StepThreePlug'
          }
        }
      } else if (props.currComp === 'registration' && !store.state.authentication.authorizated) {
          switch (props.step) {
        case 1 :
          return 'FormAuthDefault'
        case 2 :
          return 'FormAuthLogin'
        case 3 :
          return 'FormAuthRecovery'
        }
    } else if (props.currComp === 'registration' && store.state.authentication.authorizated) {
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
      changeComponent,
      toAddress
    }
  }
}
</script>

<style scoped>

</style>
