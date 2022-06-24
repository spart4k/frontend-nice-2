<template>
  <NPopup v-model="getActivePopup" class="auth" :title="getTitle">
    <div class="wrapper">
      <transition name="component-fade" mode="out-in">
        <components
          :is="getComponent"
          v-model="step"
          :title-tel="titleTel"
          :receivedCode="receivedCode"
          @closePopup="closePopup"
          @saveTel="saveTel"
          @saveCode="saveCode"
        />
      </transition>
    </div>
  </NPopup>
</template>
<script lang="js">
import { computed, ref, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'AuthSteps',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    savedCode: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const { store } = useContext()
    const step = ref(0)
    const titleTel = ref('')
    const receivedCode = ref('')
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
    const saveCode = (code) => {
      receivedCode.value = code.toString()
    }
    const getActivePopup = computed({
      get () {
        return props.value
      },
      set (val) {
        if (!val) {
          step.value = 0
          store.commit('authentication/showLogin', false)
        }
        emit('input', val)
      }
    })

    const closePopup = () => {
      step.value = 0
      store.commit('authentication/showLogin', false)
      emit('input', false)
    }

    return {
      getActivePopup,
      getComponent,
      step,
      closePopup,
      getTitle,
      titleTel,
      receivedCode,
      saveTel,
      saveCode
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
    overflow: hidden
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: .35s ease;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
    // transform: translateX(100%);
  }

</style>
