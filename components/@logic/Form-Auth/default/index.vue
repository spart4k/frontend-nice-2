<template>
  <form @submit.prevent="onSubmit">
    <n-text-field v-model="formData.name" :class="$style.input" title="Никнем" />
    <n-text-field v-model="formData.email" :class="$style.input" title="Email" />
    <n-text-field mask="+7 (###) ###-##-##" md-fz :class="$style.input" title="Телефон" />
    <n-button @click="openLogin" :class="$style.button" >
      Войти
    </n-button>
    <n-button :class="$style.button" type="submit">
      Зарегистрироваться
    </n-button>
  </form>
</template>
<script lang="js">
import { reactive } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const { emit } = ctx
    const formData = reactive({
      name: '',
      email: '',
      tel: ''
    })
    const openLogin = () => {
      emit('input', 1)
      emit('saveTel', formData.tel)
    }
    const onSubmit = () => {
      emit('input', 2)
    }
    return {
      formData,
      onSubmit,
      openLogin
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
      width: 100%;
      margin-top: 2.7rem;
    }
  }
</style>
