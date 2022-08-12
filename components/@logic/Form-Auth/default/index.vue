<template>
  <form @submit.prevent="onSubmit">
    <h2 :class="$style.title">
      Вход и регистрация
    </h2>
    <n-text-field
      v-model="formData.name"
      :class="$style.input"
      placeholder="Nice"
      title="Ник"
      color="#5289C5"
      type="text"
    />
    <n-text-field
      v-model="formData.email"
      :class="$style.input"
      placeholder="mail@example.com"
      title="Email"
      color="#5289C5"
      type="email"
    />
    <n-text-field
      v-model="formData.firstPass"
      :class="$style.input"
      placeholder=""
      title="Пароль"
      color="#5289C5"
      type="password"
    />
    <n-text-field
      v-model="formData.secondPass"
      :class="$style.input"
      placeholder=""
      title="Повторите пароль"
      color="#5289C5"
      type="password"
    />
    <!-- <n-text-field
      v-model="formData.tel"
      mask="+7 (###) ###-##-##"
      :error="v$.tel.$errors"
      :class="$style.input"
      placeholder="Телефон"
      title="Телефон"
    /> -->
    <n-button :class="$style.button" :type-button="v$.$invalid ? 'disable' : '' " background-color="#5289C5" type="submit">
      <n-loading v-if="loading" />
      <template v-else>
        Регистрация
      </template>
    </n-button>
    <n-button type-button="wide" color="#5289C5" background-color="transparent" :class="$style.buttonTologin" @click="$emit('changeComponent', 'FormAuthLogin')">
      Уже зарегистрированы?
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
      name: '',
      email: '',
      firstPass: '',
      secondPass: ''
    })
    const loading = ref(false)
    const rules = {
      name: { required },
      email: { required, email },
      firstPass: { required },
      secondPass: { required }
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
      v$,
      onSubmit,
      loading
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
    width: 100%;
    margin-top: 2.5rem;
  }
  .buttonTologin {
    margin-top: 1rem;
  }
}
</style>
