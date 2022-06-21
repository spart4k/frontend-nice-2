<template>
  <n-contain>
    <form @submit.prevent="onSubmit">
      <n-text-field v-model="formData.name" :class="$style.input" title="Имя" />
      <n-text-field v-model="formData.surname" :class="$style.input" title="Фамилия" />
      <n-text-field :readOnly="true" v-model="formData.email" :class="$style.input" title="Email" />
      <n-text-area v-model="formData.address" :class="$style.input" title="Адрес с городом и индексом" />
      <n-button :class="$style.button" :type-button="v$.$invalid ? 'disable' : '' " type="submit">
        <n-loading v-if="loading" />
        <template v-else>Сохранить изменения</template>
      </n-button>
    </form>
  </n-contain>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref, useContext } from '@nuxtjs/composition-api'
import { useToast } from 'vue-toastification/composition'
export default {
  name: 'FormProfileDefault',
  setup () {
    const { store, $toast } = useContext()
    const loading = ref(false)
    const toast = useToast()
    const formData = ref({
      name: '',
      surname: '',
      address: '',
      email: 'test@test.ru'
    })
    const rules = {
      name: { required },
      surname: { required },
      address: { required },
      email: { required }
    }
    const v$ = useVuelidate(rules, formData)
    const onSubmit = () => {
      loading.value = true
      v$.value.$touch()

      if (v$.value.$invalid) {
        return
      }
      store.dispatch('user/changeUserInfo', formData)
      .then((res) => {
        $toast.success('Информация сохранена', { position: 'bottom-right', icon: true })
        loading.value = false
      })
    }
    return {
      formData,
      onSubmit,
      loading,
      v$,
      toast
    }
  }
}
</script>
<style lang="scss" module>
.button {
  width: 100%;
}
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
