import { ref} from '@nuxtjs/composition-api'

export default {
  name: 'live',
  props: {
    messages: Array,
    song: [Array, Object]
  },
  setup (props, ctx) {
    const { emit } = ctx
    const scrollTrigger = ref(false)

    const scrollDown = () => {
      scrollTrigger.value = !scrollTrigger.value
    }
    const sendMessage = (val) => {
      emit('sendMessage', val)
      scrollDown()
    }
    return {
      scrollDown,
      sendMessage,
      scrollTrigger
    }
  }
}
