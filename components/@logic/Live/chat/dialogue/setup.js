import { onMounted, computed } from '@vue/composition-api'

export default {
  name: 'live-chat-dialogue',
  props: {
    messages: {
      type: [Object, Array],
      default: () => []
    }
  },
  setup (props, ctx) {
    const initMesassage = () => {

    }
    const messageToView = computed(() => {
      const newMessages = [
        ...props.messages
      ]
      return newMessages.reverse()
    })

    onMounted(() => {
      initMesassage()
    })
    return {
      initMesassage,
      messageToView
    }
  }
}
