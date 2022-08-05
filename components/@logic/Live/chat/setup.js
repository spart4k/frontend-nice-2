import { ref, onMounted } from '@vue/composition-api'

export default {
  name: 'live-chat',
  props: {

  },
  setup (_, props) {
    const messages = ref([])
    const initMesassage = () => {
      messages.value = [
        {
          author: 'Илья',
          body: 'Да кого вы слушаете))'
        }
      ]
    }
    const sendMessage = (message) => {
      const newMessage = {
        author: 'Aleksey',
        body: message
      }
      messages.value.push(newMessage)
    }
    onMounted(() => {
      initMesassage()
    })
    return {
      messages,
      initMesassage,
      sendMessage
    }
  }
}
