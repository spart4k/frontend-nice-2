<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Мы отправили код на номер<br>
      {{ $props.titleTel }}
    </h2>

    <form @submit.prevent="onSubmit">
      <n-text-field
      @input="checkValue"
      :errCustom="errResponse"
      :error="v$.code.$errors"
      v-model="formData.code"
      placeholder="Введите код"
      type="number"
      title="Код из СМС" />
      <n-button :typeButton="v$.$invalid ? 'disable' : '' "  :class="$style.button" type="submit">
        <n-loading v-if="loading"></n-loading>
        <template v-else>Подтвердить</template>
      </n-button>
    </form>
  </div>
</template>
<script lang="js">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, ref, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuthConfirmation',
  props: {
    titleTel: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const { store } = useContext()
    const { emit } = ctx
    const rules = {
      code: { required }
    }
    const formData = reactive({
      code: ''
    })
    const errResponse = ref('')
    const v$ = useVuelidate(rules, formData)
    const loading = ref(false)
    const onSubmit = () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        return
      }
      loading.value = true
      store.dispatch('authentication/sendCode', {
        phone: props.titleTel,
        sms_code: +formData.code
      })
      .then((res) => {
          loading.value = false
          if (res.status === 200) {
            emit('closePopup')
          } else {
            console.log(res.message)
            if (res.message === 'Wrong sms code') {
              errResponse.value = 'Неверный код'
            }
          }
      })
    }
    const checkValue = () => {
      if (errResponse) {
        errResponse.value = ''
      }
    }

    return {
      formData,
      onSubmit,
      errResponse,
      checkValue,
      loading,
      v$
    }
  }
}
</script>
<style lang="scss" module>
.wrapper {
  margin-top: 2.7rem;
}
.button {
  width: 100%;
  margin-top: 2.3rem;
}
.title {
  width: 100%;
  font-weight: 600;
  margin-bottom: 1.8rem;
  color: $fontColorDefault;
  @include text;
}
</style>
