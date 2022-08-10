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
      // wsSendEcho(newMessage)
      messages.value.push(newMessage)
    }

    const myWs = new WebSocket('ws://localhost:9000')
    myWs.onmessage = function (message) {
      // messages.value.push(message.data)
      console.log(message)
    }
    const wsSendEcho = (value) => {
      console.log(value)
      myWs.send(JSON.stringify({ action: 'ECHO', data: value.toString() }))
    }
    onMounted(() => {
      initMesassage()
      myWs.onopen = function () {
        console.log('подключился')
      }
    })
    return {
      messages,
      initMesassage,
      sendMessage,
      wsSendEcho
    }
  }
}
