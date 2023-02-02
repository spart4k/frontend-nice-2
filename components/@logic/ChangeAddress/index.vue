<template>
  <div :class="$style.container">
    <h3 :class="$style.title">
      Адрес
    </h3>
    <ul :class="$style.list">
      <li
        v-for="(item, index) in addressItem"
        :key="index"
        :class="[$style.item, currentItem === index && $style.active]"
        @click="setAddress(item, index)"
      >
        <div :class="$style.itemText">
          {{ item.city.name }}, {{ item.address }}
        </div>
        <n-button type-button="transparent" @click="removeAddress(item.id, index)">
          <n-icon name="delete" :class="$style.deleteButton" />
        </n-button>
      </li>
    </ul>
    <div :class="$style.city">
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
    </div>
    <n-button
      :class="$style.btn"
      :type-button="'pink'"
      @click="changeAdress"
    >
      Добавить
    </n-button>
    <n-button
      :class="$style.btnBack"
      color="#C83F8E"
      :type-button="'transparent'"
      @click="stepBack"
    >
      Назад
    </n-button>
  </div>
</template>

<script>
import { useAsync, useContext, ref, onMounted, computed } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import NButton from '~/components/@ui/N-Button'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'ChangeAddress',
  components: { NButton, vSelect },
  setup (props, { emit }) {
    const { store } = useContext()
    const currentItem = computed(() => { return store.state.authentication.selectedAddressIndex })
    const addressItem = computed(() => { return store.state.authentication.adress[0] })
    const lastStepKey = computed(() => { return store.state.menu.lastStepKey })

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
        const addAdress = await store.dispatch('authentication/addAdress', params)
        await store.commit('authentication/setSelectedAddress', addAdress.data)
        await store.commit('authentication/setSelectedAddressIndex', addressItem.value.length - 1)
        if (lastStepKey.value === 'basket') {
          emit('changeStep', '')
        } else {
          store.commit('menu/changeKeyMenu', {
            key: 'registration',
            effect: 'fx-slide-from-left'
          })
          store.commit('menu/changeStepMenu', { step: 1 })
        }
      } catch (e) {
      }
    }

    const setAddress = (value, index) => {
      store.commit('authentication/setSelectedAddress', value)
      store.commit('authentication/setSelectedAddressIndex', index)
    }

    const stepBack = () => {
      if (lastStepKey.value === 'basket') {
        emit('changeStep', '')
      } else {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 1 })
      }
    }
    onMounted(() => {
      fetchCities()
    })
    return {
      addressItem,
      currentItem,
      removeAddress,
      searchCity,
      fetchCities,
      citiesArray,
      cityId,
      defaulArray,
      adress,
      city,
      changeAdress,
      setAddress,
      stepBack,
      lastStepKey
    }
  }
}
</script>

<style lang="scss" module>
.container {
  overflow: auto;
  height: 100%;
  padding: 0 1.5rem;
  color: $fontColorDefault;
}
.title {
  text-align: center;
  @include text-style-h2;
  margin-bottom: 2rem;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}

.list {
  margin-bottom: 2rem;
}
.item {
  width: 100%;
  background-color: $gray3;
  border-radius: 2rem;
  margin-bottom: 2rem;
  //height: 4.8rem;
  cursor: pointer;
  border: .2rem solid transparent;

  padding: 1.7rem 1.5rem;

  display: flex;
  justify-content: space-between;
  @include regular-text;
  transition: background-color .3s ease, color .3s ease, border .3s ease;
  &.active {
    background-color: transparent;
    border-color: $pink2;
    color: $pink2;
  }
  .itemText {
    display: flex;
    align-items: center;
  }
  .deleteButton {
    height: 2.1rem;
    width: 2.1rem;
  }
}
.city {
  margin-bottom: 2.5rem;
  .subtitle {
    @include regular-text;
    color: $fontColorDefault;
    opacity: 0.5;
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
.btn {
  width: 100%;
  margin-bottom: 2.5rem;
}
.btnBack {
  color: $pink2;
  width: 100%;
}
</style>
