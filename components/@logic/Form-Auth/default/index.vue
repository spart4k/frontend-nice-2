<template>
  <form @submit.prevent="onSubmit">
    <n-text-field
      v-model="formData.name"
      :error="v$.name.$errors"
      :class="$style.input"
      title="Никнем"
    />
    <n-text-field
      v-model="formData.email"
      :error="v$.email.$errors"
      :class="$style.input"
      title="Email"
    />
    <n-text-field
      v-model="formData.tel"
      mask="+7 (###) ###-##-##"
      :error="v$.tel.$errors"
      md-fz
      :class="$style.input"
      title="Телефон"
    />
    <n-button :class="$style.button" :type-button="v$.$invalid ? 'disable' : '' " type="submit">
      <n-loading v-if="loading" />
      <template v-else>
        Зарегистрироваться
      </template>
    </n-button>
    <n-button type-button="sub" :class="$style.button" @click="openLogin">
      Уже есть аккаунт
    </n-button>
  </form>
</template>
<script lang="js">
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { reactive, ref, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const { store } = useContext()
    const { emit } = ctx
    const formData = reactive({
      name: '',
      email: '',
      tel: ''
    })
    const openLogin = () => {
      emit('input', 1)
    }
    const loading = ref(false)
    const rules = {
      name: { required },
      email: { required, email },
      tel: { required, minLength: minLength(18) }
    }
    const v$ = useVuelidate(rules, formData)
    const onSubmit = () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        return
      }
      loading.value = true
      const number = '+' + formData.tel.replace(/\D/g, '')
      store.dispatch('auth/getSms', number)
      .then((res) => {
        console.log(res)
        emit('saveTel', formData.tel)
        loading.value = false
        emit('input', 2)
      })
    }

    return {
      formData,
      v$,
      onSubmit,
      loading,
      openLogin
    }
  }
}
</script>
<style lang="scss" module>
form {
  & > .input + .input {
    margin-top: 2.2rem;
  }
  .button {
    width: 100%;
    margin-top: 2.7rem;
  }
}
</style>
