<template>
  <form @submit.prevent="onSubmit">
    <h2 :class="$style.title">
      Вход
    </h2>
    <!-- <n-text-field
      v-model.trim="formData.tel"
      :error="v$.tel.$errors"
      mask="+7 (###) ###-##-##"
      md-fz
      :class="[ $style.input ]"
      title="Телефон"
      placeholder="+7 (777) 777-77-77 "
    /> -->
    <n-text-field
      v-model="formData.email"
      :class="$style.input"
      placeholder="mail@example.com"
      title="Email"
      color="#5289C5"
      type="email"
    />
    <n-text-field
      v-model="formData.password"
      :class="$style.input"
      placeholder=""
      title="Пароль"
      color="#5289C5"
      type="password"
    />
    <n-button :class="$style.recovery" type-button="left" color="#5289C5" @click="$emit('changeComponent', 'FormAuthRecovery')">
      Восстановить пароль
    </n-button>
    <n-button :class="$style.button" :type-button="v$.$invalid ? 'disable' : '' " background-color="#5289C5" type="submit">
      <n-loading v-if="loading" />
      <template v-else>
        Войти
      </template>
    </n-button>
    <n-button :class="$style.button" color="#5289C5" background-color="transparent" @click="$emit('changeComponent', 'FormAuthDefault')">
      Еще не зарегистрированы?
    </n-button>
  </form>
</template>
<script lang="js">
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { reactive, ref } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const formData = reactive({
      email: '',
      password: ''
    })
    const loading = ref(false)
    const rules = {
      email: { required, email },
      password: { required }
    }
    const v$ = useVuelidate(rules, formData)
    const onSubmit = () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        return
      }
      loading.value = true
    }

    return {
      formData,
      onSubmit,
      loading,
      v$
    }
  }
}
</script>
<style lang="scss" module>
  form {
    .title {
      @include text-style-h2;
      color: $fontColorDefault;
      text-align: center;
      margin: 2.7rem 0 2rem;
    }
    & > .input + .input {
      margin-top: 2.5rem;
    }
    .button {
      margin-top: 1rem;
      width: 100%;
    }
      .recovery {
      margin: 2.5rem 0;
      font-size: 1.4rem !important;
    }
  }
</style>
