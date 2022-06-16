<template>
  <form @submit.prevent="onSubmit">
    <n-text-field v-model.trim="formData.tel" mask="+7 (###) ###-##-##" md-fz :class="$style.input" title="Телефон" />
    <n-button :class="$style.button" type="submit">
      Войти
    </n-button>
    <n-button :class="$style.button" @click="returnRegister">
      Зарегистрироваться
    </n-button>
  </form>
</template>
<script lang="js">
import { reactive, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const { store } = useContext()
    const { emit } = ctx
    const formData = reactive({
      tel: '+79876543210'
    })
    const onSubmit = () => {
      formData.tel = '+' + formData.tel.replace(/\D/g, '')
      store.dispatch('auth/getSms', formData.tel)
      .then(() => {
        emit('input', 2)
      })
    }
    const returnRegister = () => {
      emit('input', 0)
    }
    return {
      formData,
      onSubmit,
      returnRegister
    }
  }
}
</script>
<style lang="scss" module>
  form {
    & > .input + .input {
      margin-top: 1.6rem;
    }
    .button {
      margin-top: 2.7rem;
      width: 100%;
    }
  }
</style>
