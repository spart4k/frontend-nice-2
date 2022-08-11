import { ref } from '@nuxtjs/composition-api'
import ChangeAddress from './components/ChangeAddress'
import useForm from '~/compositions/useForm'
import { email, phone, required } from '~/utills/validations'

export default {
  name: 'TabDelivery',
  components: {
    ChangeAddress
  },
  setup (_, ctx) {
    const { emit } = ctx
    const activePayment = ref('card')
    const menuAddress = ref(null)
    const { formData, validate, $errors, $v, $touched } = useForm(
      {
        fields: {
          name: { default: '', validations: { required } },
          email: { default: '', validations: { email, required } },
          phone: { default: '', validations: { phone, required } }
        }
      })
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
    const closedMenu = () => {
      menuAddress.value.$children[0].close()
    }
    const openMenu = () => {
      menuAddress.value.$children[0].open()
    }
    const paymentsMethodSelect = [
      { text: 'Картой', icon: 'card-stepper', value: 'card' }
    ]
    const submit = () => {
      if (!validate()) { return }
      emit('changeStep', 'increment')
    }
    return {
      basketItem,
      paymentsMethodSelect,
      activePayment,
      menuAddress,
      formData,
      $errors,
      $touched,
      $v,
      openMenu,
      closedMenu,
      submit
    }
  }
}
