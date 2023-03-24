import { ref, useContext, computed, nextTick, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, required, phone, onlyNumeric } from '~/utills/validations'

export default {
  name: 'TabPickup',
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
          name: { default: store.state.authentication.user.fullname, validations: { required } },
          email: { default: store.state.authentication.user.email, validations: { email, required } },
          phone: { default: store.state.authentication.user.phone, validations: { phone, required, onlyNumeric } }
        }
      })

    const paymentsMethodSelect = [
      { text: 'Картой', icon: 'card-stepper', value: 'card' },
      { text: 'Наличными', icon: 'money-stepper', value: 'money' },
      { text: 'Оплата менеджеру', icon: 'phone-stepper', value: 'phone' }
    ]
    const submit = async () => {
      if (activePayment.value === 'card') {
        try {
          if (!validate()) { return }
          loading.value = true
          const params = {
            pay_type: 1,
            email: formData.email,
            phone: Number(formData.phone.replace('+7', '8').replace('(', '').replace(')', '')),
            FIO: formData.name,
            address_id: null,
            delivery_price: 0,
            delivery_type: 0,
            delivery_point: null
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
      } else {
        store.commit('menu/changeKeyMenu', {
          key: 'basket',
          effect: 'fx-slide-from-left'
        })
        try {
          if (!validate()) { return }
          loading.value = true
          const params = {
            pay_type: activePayment.value === 'money' ? 2 : 3,
            email: formData.email,
            phone: Number(formData.phone.replace('+7', '8').replace('(', '').replace(')', '')),
            FIO: formData.name,
            address_id: null,
            delivery_price: 0,
            delivery_type: 0,
            delivery_point: null
          }
          const result = await store.dispatch('shop/createNewOrder', params)
          if (!result.data.error) {
            store.commit('authentication/setUserFullname', formData.name)
            store.commit('basket/setBasket', [])
            store.commit('basket/setBasketSum', 0)
            orderId.value = String(result.data.id)
            store.commit('basket/lastOrderChange', result.data.id)
            store.commit('menu/changeKeyMenu', {
              key: 'basket',
              effect: 'fx-slide-from-left'
            })
            store.commit('menu/changeStepMenu', { step: 3 })
          }
        } catch (e) {
        } finally {
          loading.value = false
        }
        store.commit('menu/changeStepMenu', { step: 3 })
      }
    }
    const subminOnEnter = (e) => {
      if (e.key === 'Enter') {
        submit()
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', subminOnEnter)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', subminOnEnter)
    })
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
      loading,
      subminOnEnter
    }
  }
}
