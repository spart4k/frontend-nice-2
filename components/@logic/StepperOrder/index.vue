<template>
  <transition :name="keyAnimation === 'prev' ? 'slideShow' : 'slideback'">
    <component
      :is="isCurrentPage"
      :header-items="headerItems"
      @changeStep="$emit('changeStep', 'increment')"
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
    keyAnimation: String
  },
  setup (props) {
    const isCurrentPage = computed(() => {
      switch (props.step) {
        case 0 :
          return 'n-nav-menu'
        case 1 :
          return 'StepOneBasket'
        case 2 :
          return 'StepTwoOrder'
        case 3 :
          return 'StepThreePlug'
        default:
          return 'n-nav-menu'
      }
    })

    return {
      isCurrentPage
    }
  }
}
</script>

<style scoped>

</style>
