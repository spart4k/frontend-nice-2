<template>
  <form @submit.prevent="onSubmit">
    <h2 :class="$style.title">
      Вход
    </h2>
    <n-text-field
      v-model="formData.email"
      :class="$style.input"
      :error="$errors.email[0]"
      placeholder="mail@example.com"
      title="Email"
      :color-border="'blueBorder'"
      type="email"
    />
    <n-text-field
      v-model="formData.password"
      :class="$style.input"
      :error="$errors.password[0]"
      placeholder=""
      title="Пароль"
      :color-border="'blueBorder'"
      type="password"
    />
    <n-button
      :class="$style.recovery"
      type-button="left"
      color="#5289C5"
      @click="$emit('changeComponent', 'increment')"
    >
      Восстановить пароль
    </n-button>
    <n-button
      :class="$style.button"
      :disabled="$v.$invalid && $touched "
      background-color="#5289C5"
      type="submit"
      @click="submit"
    >
      <n-loading v-if="loading" />
      <template v-else>
        Войти
      </template>
    </n-button>
    <n-button
      :class="$style.button"
      color="#5289C5"
      background-color="transparent"
      @click="$emit('changeComponent', '')"
    >
      Еще не зарегистрированы?
    </n-button>
  </form>
</template>
<script lang="js">
import useForm from '~/compositions/useForm'
import { email, required } from '~/utills/validations'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
  const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          email: { default: '', validations: { email, required } },
          password: { default: '', validations: { required } }
        }
      })
    const submit = () => {
      if (!validate()) { return }
      console.log('ads')
    }

    return {
      formData,
      $errors,
      $touched,
      $v,
      submit
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
