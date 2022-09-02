import { ref, computed, useContext } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, phone, required, onlyNumeric } from '~/utills/validations'

export default {
  name: 'TabDelivery',
  setup (_, ctx) {
    // const { emit } = ctx
    const { store } = useContext()
    const addressItem = computed(() => { return store.state.authentication.adress })
    const activePayment = ref('card')
    const basketData = ref(store.state.basket.basket)
    const basketPrice = computed(() => { return store.state.basket.basketSum })
    const menuAddress = ref(null)
    const totalPrice = computed(() => { return (basketPrice.value + 300) })
    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: '', validations: { required } },
          email: { default: store.state.authentication.user.email, validations: { email, required } },
          phone: { default: '', validations: { phone, required, onlyNumeric } }
        }
      })
    const paymentsMethodSelect = [
      { text: 'Картой', icon: 'card-stepper', value: 'card' }
    ]
    const submit = async () => {
      try {
        if (!validate()) { return }
        await console.log('zxc')
        // loading.value = true
        // const params = {
        //   TerminalKey: '1658916651586DEMO',
        //   Amount: String(totalPrice.value) + '00',
        //   OrderId: '4',
        //   DATA: {
        //     Phone: formData.phone,
        //     Email: formData.email
        //   }
        // }
        // await store.dispatch('shop/tinkoff', params)
        // if (!result.data.error) {
        //   emit('closeState')
        // }
      } catch (e) {
          console.log(e)
      } finally {
        // loading.value = false
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
      $v,
      submit,
      basketData,
      basketPrice,
      totalPrice
      // tinkoff
    }
  }
}
