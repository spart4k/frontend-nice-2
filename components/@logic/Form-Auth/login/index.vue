<template>
  <form>
    <div :class="$style.wrapper">
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
        @click.prevent="$emit('changeStep', 'increment')"
      >
        Восстановить пароль
      </n-button>
      <n-button
        :class="$style.button"
        :disabled="$v.$invalid && $touched "
        background-color="#5289C5"
        @click.prevent="submit"
      >
        <n-loading v-if="false" />
        <template v-else>
          Войти
        </template>
      </n-button>
      <n-button
        :class="$style.button"
        color="#5289C5"
        background-color="transparent"
        @click.prevent="$emit('changeStep', '')"
      >
        Еще не зарегистрированы?
      </n-button>
    </div>
  </form>
</template>
<script lang="js">
import { useContext } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, required } from '~/utills/validations'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
  const { store } = useContext()
  const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          email: { default: '', validations: { email, required } },
          password: { default: '', validations: { required } }
        }
      })
    const submit = () => {
      if (!validate()) { return }
      const loginData = { email: formData.email, password: formData.password }
      store.dispatch('authentication/login', loginData)
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
        margin-top: 1rem;
        width: 100%;
      }
        .recovery {
        margin: 2.5rem 0;
        font-size: 1.4rem !important;
      }
    }
  }
</style>
