import { ref, useContext, computed } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, required, phone, onlyNumeric } from '~/utills/validations'

export default {
  name: 'TabDelivery',
  setup (_, ctx) {
    const { store } = useContext()
    const activePayment = ref('card')
    const basketData = ref(store.state.basket.basket)
    const basketPrice = computed(() => { return store.state.basket.basketSum })
    const { emit } = ctx

    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: '', validations: { required } },
          email: { default: store.state.authentication.user.email, validations: { email, required } },
          phone: { default: '', validations: { phone, required, onlyNumeric } }
        }
      })

    const paymentsMethodSelect = [
      { text: 'Картой', icon: 'card-stepper', value: 'card' },
      { text: 'Наличными', icon: 'money-stepper', value: 'money' },
      { text: 'Оплата менеджеру', icon: 'phone-stepper', value: 'phone' }
    ]
    const submit = () => {
      if (!validate()) { return }
      emit('changeStep', 'increment')
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
      basketPrice
    }
  }
}
