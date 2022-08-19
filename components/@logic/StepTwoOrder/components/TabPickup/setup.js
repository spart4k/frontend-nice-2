import { ref } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { email, required, phone, onlyNumeric } from '~/utills/validations'

export default {
  name: 'TabDelivery',
  setup (_, ctx) {
    const activePayment = ref('card')
    const selectItems = [
      { text: 'Нижний Новгород', value: 1 },
      { text: 'Samara', value: 2 }
    ]
    const { emit } = ctx
    const basketItem = {
      title: 'Провод midi/midi 0.2m синий',
      price: 3200,
      pivot: {
        quantity: 2
      },
      images: [
        { src: 'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs' }
      ]
    }

    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: '', validations: { required } },
          email: { default: '', validations: { email, required } },
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
      selectItems,
      basketItem,
      paymentsMethodSelect,
      activePayment,
      formData,
      $errors,
      $v,
      $touched
    }
  }
}
