<template>
  <form @submit.prevent="onSubmit">
    <div>
      <h2 :class="$style.title">
        Восстановить пароль
      </h2>
      <h3 :class="$style.subtitle">
        Мы отправим письмо на указанный email с новым паролем
      </h3>
      <div :class="$style.inputContainer">
        <N-Text-Field v-model="formData.email" title="Email" placeholder="mail@example.com" type="email" color="#5289C5" />
      </div>
      <N-Button :class="$style.button" :type-button="v$.$invalid ? 'disable' : ''" background-color="#5289C5">
        <n-loading v-if="loading" />
        <template v-else>
          Восстановить пароль
        </template>
      </N-Button>
    </div>
  </form>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { reactive, ref } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const formData = reactive({
      email: ''
    })

    const loading = ref(false)
      const rules = {
        email: { required, email }
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

<style scoped lang="scss" module>
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 2.7rem;
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
</style>
