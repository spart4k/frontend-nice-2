<template>
  <div ref="container" :class="$style.container">
    <components
      :is="isCurrentPage"
      @changeStep="changeStep"
    />
  </div>
</template>

<script>
import { computed, onMounted, ref, useContext, watch } from '@nuxtjs/composition-api'
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
    const container = ref(null)
    const page = ref(0)
    const { store } = useContext()
    const changeStep = (key) => {
      if (key === 'increment') {
        page.value += 1
      } else {
        page.value -= 1
      }
    }
    watch(() => store.state.stepperOrder.isShowBottomSheet, () => {
      page.value = 0
    })
    onMounted(() => {
      container.value.addEventListener('scroll', (e) => {
        e.preventDefault()
        console.log(e)
      })
    })
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
      changeStep,
      container
    }
  }
}
</script>

<style lang="scss" module>
.container {
  padding-top: 3rem;
  padding-bottom: 1rem;
  height: 100%;
  overflow-y: auto;
  @include paddings;
  overscroll-behavior-y: contain !important;
  transform: translate3d(0px, 0, 0);
  color: $fontColorDefault;
}
</style>
