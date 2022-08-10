<template>
  <form @submit.prevent="onSubmit">
    <h2 :class="$style.title">
      Мой профиль
    </h2>
    <n-text-field
      v-model="formData.name"
      :value-info="formData.name"
      placeholder="Nice"
      :class="$style.input"
      title="Ник"
      color="#C83F8E"
    />
    <!-- <n-text-field v-model="formData.surname" :value-info="formData.surname" :class="$style.input" placeholder="Фамилия" title="Фамилия" /> -->
    <n-text-field
      v-model="formData.phone"
      md-fz
      placeholder="Телефон"
      :value-info="formData.phone"
      :class="$style.input"
      title="Телефон"
      color="#C83F8E"
      type="tel"
    />
    <n-text-field
      v-model="formData.email"
      :value-info="formData.email"
      :class="$style.input"
      placeholder="Email"
      title="Email"
      color="#C83F8E"
    />
    <template v-if="true">
      <n-text-field v-model="formData.address" placeholder="Город, улица, дом" :class="$style.input" title="Адрес" color="#C83F8E" />
    </template>
    <template v-else>
      <div>
        <h3 :class="$style.inputTitle">
          Адрес
        </h3>
        <span :class="$style.address">
          443110 Самара, ул. Полевая, д. 45, кв.112
        </span>
        <N-Button :class="$style.noRegistered" type-button="wide" background-color="transparent" color="#C83F8E">
          Изменить адрес
        </N-Button>
      </div>
    </template>
    <n-button :class="$style.button" background-color="#C83F8E" :type-button="v$.$invalid ? 'disable' : '' " type="submit">
      <n-loading v-if="loading" />
      <template v-else>
        Сохранить изменения
      </template>
    </n-button>
    <N-Button :class="$style.noRegistered" type-button="wide" background-color="transparent" color="#C83F8E" @click="logout">
      Выйти из профиля
    </N-Button>
    <N-Button :class="$style.noRegistered" type-button="wide" background-color="transparent" color="#C83F8E">
      История заказов
    </N-Button>
    <!-- <small @click="logout">Выйти из профиля</small> -->
  </form>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
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
      // surname: '',
      address: '',
      email: 'test@test.ru',
      phone: ''
    })
    const rules = {
      name: { required },
      // surname: { required },
      email: { required, email },
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
      // formData.value.surname = currentValue.surname
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
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 2.7rem;
  }
  & > .input + .input {
    margin-top: 2.5rem;
  }
  & > .button {
    margin-top: 2.5rem;
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
.inputTitle {
  @include regular-text;
  color: $fontColorDefault;
  opacity: 0.5;
  margin-bottom: 1rem;
}
.address {
  @include regular-text;
  color: $fontColorDefault;
}
.noRegistered {
  margin-top: 1rem;
}
</style>
