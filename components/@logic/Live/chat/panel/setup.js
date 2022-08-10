import { ref, computed } from '@nuxtjs/composition-api'

export default {
  name: 'live-chat-panel',
  props: {

  },
  setup (props, ctx) {
    const { emit } = ctx
    const newMessage = ref('')
    const sendMessage = () => {
      if (newMessage.value) {
        const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
        const replaced = newMessage.value.replaceAll(emojiRegex, '<span class="emoji">$1</span>')
        console.log(replaced)
        emit('sendText', replaced)
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
