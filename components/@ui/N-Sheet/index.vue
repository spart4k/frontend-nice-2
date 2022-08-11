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
import { watch, ref } from 'vue-demi'
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSheet',
  props: {
    page: {
      type: String,
      default: 'FormProfileDefault'
    }
  },
  setup (props) {
    const proxyCurrentComp = ref(props.page)

    watch(() => props.page, () => {
      proxyCurrentComp.value = props.page
    })

    const changeComponent = (value) => {
      proxyCurrentComp.value = value
    }
    return {
      changeComponent,
      proxyCurrentComp
    }
  }
}
</script>

<style scoped lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem 6rem;
  .closeButton {
    top: 1.5rem;
    right: 1.5rem;
  }
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
