<template>
  <div :class="$style.container">
    <components
      :is="isCurrentPage"
      @changeStep="changeStep"
    />
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'

export default {
  name: 'StepperOrder',
  components: {
    StepOne,
    StepTwo,
    StepThree
  },
  setup () {
    const page = ref(0)
    const changeStep = (key) => {
      if (key === 'increment') {
        page.value += 1
      } else {
        page.value -= 1
      }
    }
    const isCurrentPage = computed(() => {
      switch (page.value) {
        case 0 :
          return 'StepOne'
        case 1 :
          return 'StepTwo'
        case 2 :
          return 'StepThree'
        default:
          return 'StepOne'
      }
    })
    return {
      isCurrentPage,
      changeStep
    }
  }
}
</script>

<style lang="scss" module>
.container {
  padding-top: 3rem;
  @include paddings;
  color: $fontColorDefault;
}
</style>
