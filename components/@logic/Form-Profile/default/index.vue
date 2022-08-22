<template>
  <form>
    <div :class="$style.wrapper">
      <h2 :class="$style.title">
        Мой профиль
      </h2>
      <n-text-field
        v-model="formData.name"
        :value-info="formData.name"
        placeholder="Nice"
        :class="$style.input"
        title="Ник"
        :color-border="'pinkBorder'"
      />
      <n-text-field
        v-model="formData.phone"
        md-fz
        placeholder="Телефон"
        :value-info="formData.phone"
        :class="$style.input"
        title="Телефон"
        :color-border="'pinkBorder'"
        type="tel"
      />
      <n-text-field
        v-model="formData.email"
        :value-info="formData.email"
        :class="$style.input"
        placeholder="Email"
        title="Email"
        :color-border="'pinkBorder'"
      />
      <template v-if="true">
        <N-Adress :class="$style.adressComp" />
      </template>
      <template v-else>
        <div>
          <h3 :class="$style.inputTitle">
            Адрес
          </h3>
          <span :class="$style.adress">
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
      <N-Button :class="$style.noRegistered" type-button="wide" background-color="transparent" color="#C83F8E" @click.prevent="logout">
        Выйти из профиля
      </N-Button>
      <N-Button :class="$style.noRegistered" type-button="wide" background-color="transparent" color="#C83F8E" @click="$emit('changeStep', 'increment')">
        История заказов
      </N-Button>
    </div>
  </form>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref, useContext, computed, watch } from '@nuxtjs/composition-api'
import { useToast } from 'vue-toastification/composition'

export default {
  name: 'FormProfileDefault',
  setup () {
    const { store, $toast } = useContext()
    // const router = useRouter()
    const loading = ref(false)
    const toast = useToast()
    const formData = ref({
      name: '',
      // surname: '',
      email: 'test@test.ru',
      phone: ''
    })
    const rules = {
      name: { required },
      email: { required, email }
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
      // router.push('/')
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
  .wrapper {
    padding: 0 1.5rem;
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 1.5rem;
  }
  .subtitle {
    @include regular-text;
    color: $fontColorDefault;
    margin-top: 2.5rem;
    opacity: 0.5;
  }
  & > .input + .input {
    margin-top: 2.5rem;
  }
  & > .button {
    margin-top: 2.5rem;
  }
  .adressComp {
    margin-top: 2.5rem;
  }
  .citySelect {
      width: 100%;
      @include regular-text;
      color: $fontColorDefault;
      border: none;
      border-bottom: .2rem solid #C83F8E;
      outline: none;
      margin-bottom: 1.5rem;
      :global(.vs__dropdown-toggle) {
        border: none;
        padding: 0;
        :global(.vs__selected-options) {
          padding: 0;
          :global(.vs__search) {
            padding: 0;
            font-size: 1.4rem !important;
          }
          :global(.vs__selected) {
            margin: 0;
            padding: 0;
          }
        }
        :global(.vs__actions) {
          margin: 1.3rem 0;
          padding: 0;
          :global(.vs__open-indicator) {
            fill: #C83F8E
          }
          :global(.vs__clear) {
            display: none
          }
        }
      }
    }
  }
}
.inputTitle {
  @include regular-text;
  color: $fontColorDefault;
  opacity: 0.5;
  margin-bottom: 1rem;
}
.adress {
  @include regular-text;
  color: $fontColorDefault;
}
.noRegistered {
  margin-top: 1rem;
}
</style>
