<template>
  <n-contain>
    <form>
      <n-text-field v-model="formData.firstName" :class="$style.input" title="Имя" />
      <n-text-field v-model="formData.lastName" :class="$style.input" title="Фамилия" />
      <n-text-field v-model="formData.lastName" :class="$style.input" title="Email" />
      <n-text-area v-model="formData.address" :class="$style.input" title="Адрес с городом и индексом" />
      <n-button :class="$style.button" type="submit">
        Сохранить изменения
      </n-button>
    </form>
  </n-contain>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'FormProfileDefault',
  setup () {
    const { store } = useContext()
    const formData = ref({
      name: '',
      lastName: '',
      address: '',
      email: 'test@test.ru'
    })
    const rules = {
      firstName: { required },
      lastName: { required },
      address: { required }
    }
    const v$ = useVuelidate(rules, formData)
    const onSubmit = () => {
      loading.value = true
      v$.value.$touch()

      if (v$.value.$invalid) {
        return
      }
      store.dispatch('user/changeUserInfo', formData )
      .then((res) => {
        console.log(res)
        loading.value = false
      })
    }

    return {
      formData,
      loading,
      onSubmit,
      v$
    }
  }
}
</script>
<style lang="scss" module>
form {
  & > .input + .input {
    margin-top: 1.6rem;
  }
  & > .button {
    margin-top: 1.7rem;
  }
}
small {
  display: block;
  color: $orange;
  text-decoration: underline;
  text-align: center;
  margin-top: 2.1rem;
  margin-bottom: 2.8rem;
  font-weight: 600;
  @include text-md;
}
</style>
