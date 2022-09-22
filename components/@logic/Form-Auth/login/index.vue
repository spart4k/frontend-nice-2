<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Вход
    </h2>
    <form>
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
    </form>
    <n-button
      :class="$style.recovery"
      type-button="left"
      color="#5289C5"
      @click.prevent="toRecovery"
    >
      Восстановить пароль
    </n-button>
    <n-button
      :class="$style.button"
      :disabled="$v.$invalid && $touched "
      background-color="#5289C5"
      @click.prevent="submit"
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
      @click.prevent="$emit('changeStep', 'increment')"
    >
      Еще не зарегистрированы?
    </n-button>
  </div>
</template>
<script lang="js">
import { useContext, ref, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, required } from '~/utills/validations'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const { emit } = ctx
    const { store } = useContext()
    const loading = ref(false)
    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          email: { default: '', validations: { email, required } },
          password: { default: '', validations: { required } }
        }
      })
    const submit = async () => {
      try {
        if (!validate()) { return }
        loading.value = true
        const loginData = { email: formData.email, password: formData.password }
        const result = await store.dispatch('authentication/login', loginData)
        if (!result.data.error) {
          emit('closeState')
          setTimeout(() => {
            store.dispatch('authentication/verifyToken')
            store.dispatch('basket/getBasket')
          }, 300)
        }
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }

    const focusLogin = () => {
      console.log('asd')
    }

    const toRecovery = () => {
      if (!store.state.menu.isShowBottomMenu) {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 3 })
        store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
      } else if (store.state.menu.isShowBottomMenu) {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 3 })
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
      toRecovery,
      focusLogin,
      subminOnEnter
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
        margin-top: 1rem;
        width: 100%;
        height: 5rem;
      }
        .recovery {
        margin: 2.5rem 0;
        font-size: 1.4rem !important;
      }
    }
</style>
