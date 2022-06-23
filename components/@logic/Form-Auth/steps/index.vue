<template>
  <NPopup v-model="getActivePopup" class="auth" :title="getTitle">
    <div class="wrapper">
      <components
        :is="getComponent"
        v-model="step"
        :title-tel="titleTel"
        @closePopup="closePopup"
        @saveTel="saveTel"
      />
    </div>
  </NPopup>
</template>
<script lang="js">
import { computed, ref } from '@nuxtjs/composition-api'

export default {
  name: 'AuthSteps',
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const step = ref(0)
    const titleTel = ref('')
    const getComponent = computed(() => {
      if (step.value === 0) {
        return 'FormAuthDefault'
      } else if (step.value === 1) {
        return 'FormAuthLogin'
      } else if (step.value === 2) {
        return 'FormAuthConfirmation'
      }
    })
    const getTitle = computed(() => {
      if (step.value === 0) {
        return 'Регистрация'
      } else if (step.value === 1) {
        return 'Вход'
      } else if (step.value === 2) {
        return 'Подтверждение'
      }
    })
    const saveTel = (tel) => {
      titleTel.value = tel
    }
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
      closePopup,
      getTitle,
      titleTel,
      saveTel
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
      margin-bottom: 1rem;
      color: $fontColorDefault;
  }
  .wrapper {
    margin-top: 2.7rem;
  }

</style>
