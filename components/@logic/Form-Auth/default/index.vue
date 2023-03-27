<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Вход и регистрация
    </h2>
    <form>
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
      <div :class="$style.personalData">
        <input v-model="personalData" type="checkbox">
        Я принимаю <a href="/assets/ProcessingPersonalData.pdf" download>Политику обработки персональных данных</a>
      </div>
    </form>
    <n-button
      :class="$style.button"
      :disabled="!personalData ? !personalData : $v.$invalid && $touched"
      background-color="#5289C5"
      @click.prevent="submit"
    >
      <n-loading v-if="loading" />
      <template v-else>
        Регистрация
      </template>
    </n-button>
    <n-button
      type-button="wide"
      color="#5289C5"
      background-color="transparent"
      :class="$style.buttonTologin"
      @click.prevent="$emit('changeStep', '')"
    >
      Уже зарегистрированы?
    </n-button>
  </div>
</template>
<script lang="js">
import { useContext, ref, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, required, sameAs, strongPassword, nameLength } from '~/utills/validations'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const { emit } = ctx
    const { store } = useContext()
    const loading = ref(false)
    const personalData = ref(false)
    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: '', validations: { required, nameLength } },
          email: { default: '', validations: { required, email } },
          firstPass: { default: '', validations: { required, password: strongPassword() } },
          secondPass: { default: '', validations: { required, sameAs: sameAs(() => formData.firstPass) } }
        }
      })
    const submit = async () => {
      try {
        if (!validate()) { return }
        loading.value = true
        const registerData = { email: formData.email, nickname: formData.name, password: formData.firstPass }
        const result = await store.dispatch('authentication/register', registerData)
        if (!result.data.error) {
          emit('closeState')
        }
      } catch (e) {
      } finally {
        loading.value = false
      }
    }
    const subminOnEnter = (e) => {
      if (e.key === 'Enter') {
        submit()
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', subminOnEnter)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', subminOnEnter)
    })
    return {
      formData,
      $errors,
      $touched,
      $v,
      loading,
      submit,
      subminOnEnter,
      personalData
    }
  }
}
</script>
<style lang="scss" module>
  .wrapper {
    padding: 0 1.5rem;
    .title {
      @include text-style-h2;
      color: $fontColorDefault;
      text-align: center;
      margin: 1.5rem 0 2rem;
    }
    .input + .input {
      margin-top: 2.5rem;
    }
    .button {
      width: 100%;
      margin-top: 2.5rem;
      height: 5rem;
    }
    .buttonTologin {
      margin-top: 1rem;
    }
    .personalData {
      margin-top: 2.5rem;
      @include regular-text;
      input {
        width: 1rem;
        height: 1rem;
      }
      a {
        color: $blue2;
      }
    }
  }
</style>
