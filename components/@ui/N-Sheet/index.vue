<template>
  <div :class="$style.container">
    <component :is="proxyCurrentComp" @changeComponent="changeComponent" />
    <!-- <FormProfileDefault /> -->
    <!-- <FormAuthLogin /> -->
    <!-- <FormAuthDefault /> -->
    <!-- <FormAuthRecovery /> -->
    <!-- <N-Sheet-Search /> -->
    <!-- <HistoryOrdersDefault /> -->
  </div>
</template>

<script>
import { ref, computed } from '@nuxtjs/composition-api'

export default {
  name: 'NSheet',
  props: {
    stepProp: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const step = ref(props.stepProp)

    const changeComponent = (key) => {
      if (key === 'increment') {
        step.value += 1
      } else {
        step.value -= 1
      }
    }
    const proxyCurrentComp = computed(() => {
      switch (step.value) {
        case 0 :
          return 'FormAuthDefault'
        case 1 :
          return 'FormAuthLogin'
        case 2 :
          return 'FormAuthRecovery'
        default:
          return 'FormAuthDefault'
      }
    })
    return {
      changeComponent,
      proxyCurrentComp,
      step
    }
  }
}
</script>

<style scoped lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem 6rem;
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 2.7rem;
  }
  .inputContainer{
    display: flex;
    flex-direction: column;
    margin: 2rem 0 2.5rem;
    gap: 2.5rem;
  }
  .noRegistered {
    margin-top: 2.4rem;
  }
}
:global(.bottom-sheet__content) {
  height: auto !important;
}
</style>
