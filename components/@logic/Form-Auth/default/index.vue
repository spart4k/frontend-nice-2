<template>
  <N-Contain>
    <form @submit.prevent="onSubmit">
      <n-text-field v-model="formData.name" :class="$style.input" title="Имя" />
      <n-text-field v-model="formData.email" :class="$style.input" title="Email" />
      <n-text-field mask="+7 (###) ###-##-##" md-fz :class="$style.input" title="Телефон" />
      <n-button :class="$style.button" type="submit">
        Зарегистрироваться
      </n-button>
    </form>
  </N-Contain>
</template>
<script lang="js">
import { reactive } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuth',
  setup () {
    const formData = reactive({
      name: '',
      email: '',
      tel: ''
    })
    const onSubmit = () => {
      console.log(formData)
    }
    return {
      formData,
      onSubmit
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
    }
  }
</style>
