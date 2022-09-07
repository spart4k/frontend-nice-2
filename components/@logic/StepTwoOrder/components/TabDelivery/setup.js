import { ref, computed, useContext, nextTick } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, phone, required, onlyNumeric } from '~/utills/validations'

export default {
  name: 'TabDelivery',
  setup (_, ctx) {
    // const { emit } = ctx
    const { store } = useContext()
    const addressItem = computed(() => {
      if (store.state.authentication.selectedAddress) {
        return store.state.authentication.selectedAddress
      } else {
        console.log(store.state.authentication.adress[0][0])
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
    const deliveryPrice = computed(() => {
      if (addressItem.value) {
        if (addressItem.value.city.name === 'Нижний Новгород') {
          return 300
        } else {
          return 1000
        }
      } else {
        return 0
      }
    })
    const totalPrice = computed(() => { return (basketPrice.value + deliveryPrice.value) })
    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: '', validations: { required } },
          email: { default: store.state.authentication.user.email, validations: { email, required } },
          phone: { default: store.state.authentication.user.phone, validations: { phone, required, onlyNumeric } }
        }
      })
    const paymentsMethodSelect = [
      { text: 'Картой', icon: 'card-stepper', value: 'card' }
    ]
    const submit = async (event) => {
        // ctx.refs.tinkoffPay.click()
      try {
        if (!validate()) { return }
        loading.value = true
        const params = {
          delivery_place_id: null,
          pay_type: 1,
          address_id: addressItem.value.id,
          email: formData.email,
          phone: Number(formData.phone.replace('+7', '8').replace('(', '').replace(')', '')),
          FIO: formData.name
        }
        const result = await store.dispatch('shop/createNewOrder', params)
        if (!result.data.error) {
          tinkoffPrice.value = result.data.cards_sum + result.data.delivery_price
          orderId.value = String(result.data.id)
          store.commit('basket/lastOrderChange', result.data.id)
          nextTick(() => {
            ctx.refs.tinkoffPay.click()
          })
        }
      } catch (e) {
          console.log(e)
      } finally {
        loading.value = false
      }
      // emit('changeStep', 'increment')
    }
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
      orderId
    }
  }
}
