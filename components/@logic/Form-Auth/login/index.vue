<template>
  <form @submit.prevent="onSubmit">
    <n-text-field
    v-model.trim="formData.tel"
    :error="v$.tel.$errors"
    mask="+7 (###) ###-##-##"
    md-fz
    :class="[ $style.input ]"
    title="Телефон"
    placeholder="+7 (777) 777-77-77 "
     />
    <n-button :class="$style.button" :typeButton="!filledTel ? 'disable' : '' " type="submit">
      <n-loading v-if="loading"></n-loading>
      <template v-else>Войти</template>
    </n-button>
    <n-button :class="$style.button" typeButton="sub" @click="returnRegister">
      Назад
    </n-button>
  </form>
</template>
<script lang="js">
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { reactive, ref, useContext, computed } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const { store } = useContext()
    const { emit } = ctx
    const formData = reactive({
      tel: ''
    })
    const rules = {
      tel: { required, minLength: minLength(18) }
    }

    const loading = ref(false)
    const errorTel = ref(false)
    const filledTel = computed(() => {
      const number = formData.tel.replace(/\D/g, '')
      if (number.length === 11) {
        return true
      } else {
        return false
      }
    })
    const v$ = useVuelidate(rules, formData)
    const onSubmit = () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        return
      }
      loading.value = true
      emit('saveTel', formData.tel)
      const number = '+' + formData.tel.replace(/\D/g, '')
      store.dispatch('authentication/getSms', number)
      .then((res) => {
        const code = res.data['sms code']
        emit('saveCode', code)
        loading.value = false
        emit('input', 2)
      })
    }
    const returnRegister = () => {
      emit('input', 0)
    }

    return {
      formData,
      onSubmit,
      returnRegister,
      loading,
      errorTel,
      filledTel,
      v$
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
      height: 5.1rem;
    }
  }
</style>
