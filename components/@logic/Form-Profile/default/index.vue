<template>
  <n-contain>
    <form @submit.prevent="onSubmit">
      <n-text-field v-model="formData.name" :valueInfo="formData.name" placeholder="Имя" :class="$style.input" title="Имя" />
      <n-text-field v-model="formData.surname" :valueInfo="formData.surname" :class="$style.input" placeholder="Фамилия" title="Фамилия" />
      <n-text-field :readOnly="true" v-model="formData.email" :class="$style.input" placeholder="Email"  title="Email" />
      <n-text-field
      :readOnly="true"
      mask="+7 (###) ###-##-##"
      md-fz
      placeholder="Телефон"
      v-model="formData.phone"
      :valueInfo="formData.phone"
      :class="$style.input"
      title="Телефон" />
      <n-text-area placeholder="Адрес с городом и индексом" v-model="formData.address" :class="$style.input" title="Адрес с городом и индексом" />
      <n-button :class="$style.button" :type-button="v$.$invalid ? 'disable' : '' " type="submit">
        <n-loading v-if="loading" />
        <template v-else>Сохранить изменения</template>
      </n-button>
      <small @click="logout">Выйти из профиля</small>
    </form>
  </n-contain>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref, useContext, useRouter, computed, watch } from '@nuxtjs/composition-api'
import { useToast } from 'vue-toastification/composition'
export default {
  name: 'FormProfileDefault',
  setup () {
    const { store, $toast } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const toast = useToast()
    const formData = ref({
      name: '',
      surname: '',
      address: '',
      email: 'test@test.ru',
      phone: ''
    })
    const rules = {
      name: { required },
      surname: { required },
      address: { required }
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
    const logout = () => {
      store.dispatch('authentication/logout')
      // .then(() => { this.router.push('/') })
      router.push('/')
    }
    store.dispatch('authentication/getUserInfo')
    const userData = computed(() => {
      const user = store.state.authentication.user
      return user
    })

    watch(userData, (currentValue, oldValue) => {
      formData.value.name = currentValue.name
      formData.value.surname = currentValue.surname
      formData.value.email = currentValue.email
      formData.value.phone = currentValue.phone
      formData.value.address = currentValue.address
    })

    return {
      formData,
      onSubmit,
      loading,
      v$,
      toast,
      logout,
      userData
    }
  }
}
</script>
<style lang="scss" module>
.button {
  width: 100%;
  height: 5.1rem;
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
