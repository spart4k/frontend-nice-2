import { ref, computed } from '@nuxtjs/composition-api'

export default {
  name: 'live-chat-panel',
  props: {

  },
  setup (props, ctx) {
    const { emit } = ctx
    const newMessage = ref('')
    const sendMessage = () => {
      console.log(newMessage.value)
      if (newMessage.value) {
        emit('sendText', newMessage.value)
        newMessage.value = ''
      }
    }
    const messageLength = computed(() => {
      return newMessage.value.length
    })
    return {
      sendMessage,
      newMessage,
      messageLength
    }
  }
}
