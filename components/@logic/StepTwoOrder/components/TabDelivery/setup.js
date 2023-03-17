import { ref, computed, useContext, nextTick, onMounted, watch, onUnmounted, useAsync } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import useForm from '~/compositions/useForm'
import { email, phone, required, onlyNumeric } from '~/utills/validations'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'TabDelivery',
  components: { vSelect },
  setup (_, ctx) {
    // const { emit } = ctx
    const { store } = useContext()
    const addressItem = computed(() => {
      if (store.state.authentication.selectedAddress) {
        return store.state.authentication.selectedAddress
      } else {
        return store.state.authentication.adress[0][0]
      }
    })
    const selectedAddress = computed(() => { return store.state.authentication.selectedAddress })
    const activePayment = ref('card')
    const basketData = ref(store.state.basket.basket)
    const basketPrice = computed(() => { return store.state.basket.basketSum })
    const menuAddress = ref(null)
    const tinkoffPay = ref(null)
    const tinkoffPrice = ref()
    const orderId = ref()
    const loading = ref(false)
    const pickupPoint = ref()
    const pickupPointArray = ref([])
    const address = ref('')
    const render = ref(true)
    const city = ref()
    const cityCode = ref(0)
    const cityId = ref(0)
    const citiesArray = ref([])
    const noErrorCity = ref(true)
    const fullCityArray = ref([])
    const defaultArray = ref([])
    const addressId = ref(0)
    const deliveryValue = ref('courier')
    const totalWeight = ref(0)
    const deliveryChange = (val) => {
      deliveryValue.value = val
      getCdekPrice()
      if (deliveryValue.value === 'courier') {
        pickupPoint.value = ''
      } else {
        address.value = ''
      }
    }
    const deliveryPrice = ref(0)
    const totalPrice = computed(() => { return (basketPrice.value + deliveryPrice.value) })
    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: store.state.authentication.user.fullname, validations: { required } },
          email: { default: store.state.authentication.user.email, validations: { email, required } },
          phone: { default: store.state.authentication.user.phone, validations: { phone, required, onlyNumeric } }
        }
      })
    const paymentsMethodSelect = [
      { text: 'Картой', icon: 'card-stepper', value: 'card' }
    ]
    const submit = async () => {
      try {
        if (!validate()) { return }
        loading.value = true
        if (store.state.authentication.adress[0].length) {
          if ((city.value !== store.state.authentication.adress[0][0].city.name || address.value !== store.state.authentication.adress[0][0].address) && deliveryValue.value === 'courier') {
            const params = {
              user_address: address.value,
              city_id: cityId.value
            }
            const response = await store.dispatch('authentication/addAdress', params)
            addressId.value = response.data.id
          }
        } else {
          const params = {
            user_address: address.value,
            city_id: cityId.value
          }
          const response = await store.dispatch('authentication/addAdress', params)
          addressId.value = response.data.id
        }
        const params = {
          delivery_place_address: deliveryValue.value === 'courier' ? null : pickupPoint.value,
          delivery_price: deliveryPrice.value,
          city_id: deliveryValue.value === 'courier' ? null : cityId.value,
          weight_sum: totalWeight.value,
          address_id: deliveryValue.value === 'courier' ? addressId.value : null,
          pay_type: 1,
          email: formData.email,
          phone: Number(formData.phone.replace('+7', '8').replace('(', '').replace(')', '')),
          FIO: formData.name
        }
        const result = await store.dispatch('shop/createNewOrder', params)
        if (!result.data.error) {
          store.commit('authentication/setUserFullname', formData.name)
          tinkoffPrice.value = result.data.cards_sum + result.data.delivery_price
          orderId.value = String(result.data.id)
          store.commit('basket/lastOrderChange', result.data.id)
          nextTick(() => {
            ctx.refs.tinkoffPay.click()
          })
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

    const fetchCities = async () => {
      const cityData = {
        entity: 'cities',
        page: 1,
        count: 10
      }
      const responseCity = await store.dispatch('search/searchCities', cityData)
      defaultArray.value = responseCity.data.data
      responseCity.data.data.forEach((item) => {
        citiesArray.value.push(item.name)
      })
      responseCity.data.data.forEach((item) => {
        fullCityArray.value.push(item)
      })
    }

    const searchPickupPoint = () => {
      console.log('asd')
    }

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
          defaultArray.value = []
          citiesArray.value = []
          fullCityArray.value = []
          defaultArray.value = responseCity.data.data
          responseCity.data.data.forEach((item) => {
            citiesArray.value.push(item.name)
          })
          responseCity.data.data.forEach((item) => {
            fullCityArray.value.push(item)
          })
        } catch (e) {
        }
      })
    }

    const getCdekPrice = async (val) => {
      fullCityArray.value.forEach((item) => {
        if (item.name === city.value) {
          cityCode.value = item.code
          cityId.value = item.id
        }
      })
      let data
      if (deliveryValue.value === 'courier') {
        data = {
          tariff: 137,
          from_code: 414,
          to_code: cityCode.value,
          weight: totalWeight.value
        }
      } else {
        data = {
          tariff: 136,
          from_code: 414,
          to_code: cityCode.value,
          weight: totalWeight.value
        }
      }
      const response = await store.dispatch('basket/calcDeliverySum', data)
      if (response) {
        deliveryPrice.value = response.total_sum
      } else {
        deliveryPrice.value = 0
        noErrorCity.value = false
      }
    }

    const getCdekOffices = async () => {
      fullCityArray.value.forEach((item) => {
        if (item.name === city.value) {
          cityCode.value = item.code
          cityId.value = item.id
        }
      })
      pickupPointArray.value = []
      const response = await store.dispatch('basket/getDeliveryPoints', cityCode.value)
      response.forEach((item) => {
        pickupPointArray.value.push(item.location.address)
      })
    }

    watch(() => city.value, async () => {
      noErrorCity.value = true
      await getCdekPrice()
      await getCdekOffices()
    })

    watch(() => basketData.value, async () => {
      totalWeight.value = 0
      basketData.value.forEach((item) => {
        totalWeight.value += item.weight * item.pivot.quantity
      })
      await getCdekPrice()
    })

    onMounted(() => {
      fetchCities()
      basketData.value.forEach((item) => {
        totalWeight.value += item.weight * item.pivot.quantity
      })
      if (store.state.authentication.adress[0][0] && store.state.authentication.adress[0][0].city.name) {
        city.value = store.state.authentication.adress[0][0].city.name
        cityCode.value = store.state.authentication.adress[0][0].city.code
        cityId.value = store.state.authentication.adress[0][0].city.id
        addressId.value = store.state.authentication.adress[0][0].id
        address.value = store.state.authentication.adress[0][0].address
        render.value = false
        nextTick(() => {
          render.value = true
        })
      }
      window.addEventListener('keydown', subminOnEnter)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', subminOnEnter)
    })

    return {
      paymentsMethodSelect,
      activePayment,
      menuAddress,
      formData,
      $errors,
      $touched,
      addressItem,
      selectedAddress,
      $v,
      submit,
      tinkoffPay,
      basketData,
      basketPrice,
      totalPrice,
      loading,
      tinkoffPrice,
      orderId,
      subminOnEnter,
      deliveryChange,
      deliveryValue,
      fetchCities,
      citiesArray,
      defaultArray,
      searchCity,
      city,
      pickupPoint,
      pickupPointArray,
      searchPickupPoint,
      address,
      fullCityArray,
      getCdekPrice,
      getCdekOffices,
      totalWeight,
      deliveryPrice,
      cityCode,
      render,
      cityId,
      addressId,
      noErrorCity
    }
  }
}
