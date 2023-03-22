<template>
  <form>
    <div :class="$style.wrapper">
      <h2 :class="$style.title">
        Мой профиль
      </h2>
      <n-text-field
        v-model="formData.nickname"
        placeholder="Nice"
        :class="$style.input"
        :error="$errors.nickname[0]"
        title="Ник"
        :color-border="'pinkBorder'"
      />
      <n-text-field
        v-model="formData.phone"
        md-fz
        placeholder="Телефон"
        :class="$style.input"
        :error="$errors.phone[0]"
        mask="+7(###)#######"
        title="Телефон"
        :color-border="'pinkBorder'"
      />
      <n-text-field
        v-model="formData.email"
        :class="$style.input"
        :error="$errors.email[0]"
        placeholder="Email"
        title="Email"
        :color-border="'pinkBorder'"
      />
      <template v-if="addressItem[0]">
        <div :class="$style.adressComp">
          <h3 :class="$style.inputTitle">
            Адрес
          </h3>
          <span v-if="addressItem[0]" :class="$style.adress">
            {{ addressItem[0].city ? `${addressItem[0].city.name}, ` : '' }}{{ addressItem[0].address ? addressItem[0].address : '' }}
          </span>
          <N-Button :class="$style.noRegistered" type-button="wide" background-color="transparent" color="#C83F8E" @click.prevent="changeAddress">
            Изменить адрес
          </N-Button>
        </div>
      </template>
      <template v-else>
        <p :class="$style.subtitle">
          Адрес
        </p>
        <v-select
          v-model="city"
          v-debounce:350ms="searchCity"
          :options="citiesArray"
          :class="$style.citySelect"
        >
          <template #no-options="{ }">
            Подождите.
          </template>
        </v-select>
        <n-text-field v-model="adress" :class="$style.input" placeholder="Улица, дом, квартира" color="#C83F8E" />
      </template>
      <n-button
        :class="$style.button"
        background-color="#C83F8E"
        type="submit"
        :disabled="$v.$invalid && $touched "
        @click.prevent="submit"
      >
        <n-loading v-if="loading" />
        <template v-else>
          Сохранить изменения
        </template>
      </n-button>
      <N-Button :class="$style.noRegistered" type-button="wide" background-color="transparent" color="#C83F8E" @click.prevent="logout">
        Выйти из профиля
      </N-Button>
      <N-Button :class="$style.noRegistered" type-button="wide" background-color="transparent" color="#C83F8E" @click.prevent="$emit('changeStep', 'increment')">
        История заказов
      </N-Button>
    </div>
  </form>
</template>
<script>
import { ref, useContext, onMounted, useAsync, computed } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import useForm from '~/compositions/useForm'
import { phone, required, onlyNumeric, email } from '~/utills/validations'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'FormProfileDefault',
  components: {
    vSelect
  },
  setup (props, ctx) {
    const { store } = useContext()
    const { emit } = ctx
    const addressItem = computed(() => {
      if (store.state.authentication.adress[0]) {
        return store.state.authentication.adress[0]
      }
    })
    const loading = ref(false)
    const { formData, validate, $errors, $v, $touched } = useForm(
    {
      fields: {
        email: { default: store.state.authentication.user.email, validations: { email, required } },
        phone: { default: store.state.authentication.user.phone, validations: { phone, required, onlyNumeric } },
        nickname: { default: store.state.authentication.user.nickname, validations: { required } }
      }
    })

    const submit = async ({ commit }) => {
      try {
        if (!validate()) { return }
        loading.value = true
        const userData = {
          email: formData.email,
          nickname: formData.nickname,
          phone: formData.phone.replace('+7', '').replace('(', '').replace(')', ''),
          city_id: 1
        }
        const result = await store.dispatch('authentication/editUserData', userData)
        if (!result.error) {
          store.commit('authentication/setUserInfo', userData)
        }
      } catch (e) {

      } finally {
        changeAdress()
        loading.value = false
      }
    }

    const logout = () => {
      store.dispatch('authentication/logout')
    }

    const changeAddress = () => {
      emit('toAddress', true)
      store.commit('menu/changeKeyMenu', {
        key: 'basket',
        effect: 'fx-slide-from-left'
      })
      store.commit('menu/changeStepMenu', { step: 3 })
    }

    const removeAddress = (value, index) => {
      useAsync(async () => {
        try {
          const removeResponce = await store.dispatch('authentication/removeAdress', value)
          if (!removeResponce.error) {
            store.commit('authentication/removeUserAdress', index)
          }
        } catch (e) {
        }
      })
    }

    const adress = ref()
    const city = ref()
    const citiesArray = ref([])
    const cityId = ref([])
    const defaulArray = ref([])
    const searchCity = (val) => {
      useAsync(async () => {
        const cityData = {
          entity: 'cities',
          page: 1,
          count: 10,
          searchField: val
        }
        try {
          const responseCity = await store.dispatch('search/searchCities', cityData)
          defaulArray.value = []
          citiesArray.value = []
          defaulArray.value = responseCity.data.data
          responseCity.data.data.forEach((item) => {
            citiesArray.value.push(item.name)
          })
        } catch (e) {
        }
      })
    }
    const fetchCities = async () => {
      const cityData = {
        entity: 'cities',
        page: 1,
        count: 10
      }
      const responseCity = await store.dispatch('search/searchCities', cityData)
      defaulArray.value = responseCity.data.data
      responseCity.data.data.forEach((item) => {
        citiesArray.value.push(item.name)
      })
    }
    const changeAdress = async () => {
      if (!addressItem.value[0] && adress.value && city.value) {
        defaulArray.value.forEach((item) => {
          if (item.name === city.value) {
            cityId.value = item.id
          }
        })
        const params = {
          user_address: adress.value,
          city_id: cityId.value
        }
        try {
          await store.dispatch('authentication/addAdress', params)
        } catch (e) {
        }
      }
    }
    onMounted(() => {
      store.commit('menu/changelastStepKey', 'registration')
      fetchCities()
    })

    return {
      formData,
      submit,
      loading,
      logout,
      addressItem,
      $errors,
      $touched,
      $v,
      removeAddress,
      changeAddress,
      searchCity,
      fetchCities,
      citiesArray,
      cityId,
      defaulArray,
      adress,
      city,
      changeAdress
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
            @media (max-width: $tabletWidth) {
              font-size: 16px !important;
            }
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
      :global(.vs__dropdown-option) {
        height: 4.5rem;
        display: flex;
        font-size: 1.6rem;
        align-items: center;
      }
      :global(.vs__dropdown-option--highlight) {
        background: #C83F8E;
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
