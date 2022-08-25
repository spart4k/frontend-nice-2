<template>
  <form>
    <div :class="$style.wrapper">
      <h2 :class="$style.title">
        Восстановить пароль
      </h2>
      <h3 :class="$style.subtitle">
        Мы отправим письмо на указанный email с новым паролем
      </h3>
      <div :class="$style.inputContainer">
        <N-Text-Field
          v-model="formData.email"
          title="Email"
          :error="$errors.email[0]"
          placeholder="mail@example.com"
          type="email"
          :color-border="'blueBorder'"
        />
      </div>
      <N-Button
        :class="$style.button"
        :disabled="$v.$invalid && $touched "
        background-color="#5289C5"
        @click.prevent="submit"
      >
        <n-loading v-if="false" />
        <template v-else>
          Восстановить пароль
        </template>
      </N-Button>
    </div>
  </form>
</template>

<script>
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
          email: { default: '', validations: { email, required } }
        }
      })
    const submit = () => {
      if (!validate()) { return }
      const recoveryData = { email: formData.email }
      store.dispatch('authentication/resetPassword', recoveryData)
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

<style scoped lang="scss" module>
.wrapper {
  padding: 0 1.5rem;
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 1.7rem;
  }
  .subtitle {
    @include regular-text;
    color: $fontColorDefault;
    text-align: center;
    opacity: 0.5;
    margin-top: 1rem;
  }
  .inputContainer{
    display: flex;
    flex-direction: column;
    margin: 1.3rem 0 2.5rem;
    gap: 2.5rem;
  }
  .button {
    width: 100%;
  }
}
</style>
