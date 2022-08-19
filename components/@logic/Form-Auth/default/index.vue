<template>
  <form @submit.prevent="submit">
    <div :class="$style.wrapper">
      <h2 :class="$style.title">
        Вход и регистрация
      </h2>
      <n-text-field
        v-model="formData.name"
        :error="$errors.name[0]"
        :class="$style.input"
        placeholder="Nice"
        title="Ник"
        :color-border="'blueBorder'"
        type="text"
      />
      <n-text-field
        v-model="formData.email"
        :error="$errors.email[0]"
        :class="$style.input"
        placeholder="mail@example.com"
        title="Email"
        :color-border="'blueBorder'"
        type="email"
      />
      <n-text-field
        v-model="formData.firstPass"
        :error="$errors.firstPass[0]"
        :class="$style.input"
        placeholder=""
        title="Пароль"
        :color-border="'blueBorder'"
        type="password"
      />
      <n-text-field
        v-model="formData.secondPass"
        :error="$errors.secondPass[0]"

        :class="$style.input"
        placeholder=""
        title="Повторите пароль"
        :color-border="'blueBorder'"
        type="password"
      />
      <n-button
        :class="$style.button"
        :disabled="$v.$invalid && $touched "
        background-color="#5289C5"
        type="submit"
        @click="submit"
      >
        <!-- <n-loading v-if="loading" /> -->
        <template>
          Регистрация
        </template>
      </n-button>
      <n-button
        type-button="wide"
        color="#5289C5"
        background-color="transparent"
        :class="$style.buttonTologin"
        @click="$emit('changeStep', 'increment')"
      >
        Уже зарегистрированы?
      </n-button>
    </div>
  </form>
</template>
<script lang="js">
import useForm from '~/compositions/useForm'
import { email, required, sameAs, strongPassword, nameLength } from '~/utills/validations'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: '', validations: { required, nameLength } },
          email: { default: '', validations: { required, email } },
          firstPass: { default: '', validations: { required, password: strongPassword() } },
          secondPass: { default: '', validations: { required, sameAs: sameAs(() => formData.firstPass) } }
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
  .wrapper {
    padding: 0 1.5rem;
    .title {
      @include text-style-h2;
      color: $fontColorDefault;
      text-align: center;
      margin: 1.5rem 0 2rem;
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
}
</style>
