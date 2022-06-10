<template>
  <NPopup v-model="getActivePopup" title="Вход и регистрация">
    <components
      :is="getComponent"
      v-model="step"
      @closePopup="closePopup"
    />
  </NPopup>
</template>
<script lang="js">
import { computed, ref } from '@nuxtjs/composition-api'

export default {
  name: 'AuthSteps',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const step = ref(0)
    const getComponent = computed(() => !step.value ? 'FormAuthDefault' : 'FormAuthConfirmation')
    const getActivePopup = computed({
      get () {
        return props.value
      },
      set (val) {
        emit('input', val)
      }
    })

    const closePopup = () => {
      step.value = 0
      emit('input', false)
    }

    return {
      getActivePopup,
      getComponent,
      step,
      closePopup
    }
  }
}
</script>
