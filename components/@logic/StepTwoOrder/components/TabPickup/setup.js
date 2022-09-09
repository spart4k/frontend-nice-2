import { ref, useContext, computed, nextTick } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, required, phone, onlyNumeric } from '~/utills/validations'

export default {
  name: 'TabDelivery',
  setup (_, ctx) {
    const { store } = useContext()
    const activePayment = ref('card')
    const basketData = ref(store.state.basket.basket)
    const basketPrice = computed(() => { return store.state.basket.basketSum })
    const tinkoffPay = ref(null)
    const tinkoffPrice = ref()
    const orderId = ref()
    const loading = ref(false)
    const totalPrice = computed(() => { return basketPrice.value })
    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: '', validations: { required } },
          email: { default: store.state.authentication.user.email, validations: { email, required } },
          phone: { default: store.state.authentication.user.phone, validations: { phone, required, onlyNumeric } }
        }
      })

    const paymentsMethodSelect = [
      { text: 'Картой', icon: 'card-stepper', value: 'card' },
      { text: 'Наличными', icon: 'money-stepper', value: 'money' },
      { text: 'Оплата менеджеру', icon: 'phone-stepper', value: 'phone' }
    ]
    const submit = async (event) => {
      if (activePayment.value === 'card') {
        try {
          if (!validate()) { return }
          loading.value = true
          const params = {
            delivery_place_id: 5,
            pay_type: 1,
            address_id: null,
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
      } else {
        // dohyarit'
        store.commit('menu/changeKeyMenu', {
          key: 'basket',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 3 })
      }
    }
    return {
      submit,
      paymentsMethodSelect,
      activePayment,
      formData,
      $errors,
      $v,
      $touched,
      basketData,
      basketPrice,
      tinkoffPrice,
      orderId,
      tinkoffPay,
      totalPrice,
      loading
    }
  }
}
