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
          message_text: 'Да кого вы слушаете))'
        }
      ]
    }
    const sendMessage = (message) => {
      const newMessage = {
        author: 'Aleksey',
        message_text: message
      }
      // wsSendEcho(newMessage)
      const ws = new WebSocket('ws://192.168.1.19:8999')
      ws.onmessage = (event) => {
        console.log(event.data)
      }
      ws.send(JSON.stringify({ user_id: 9, message_text: 'zxczxc' }))
      messages.value.push(newMessage)
    }

    // const myWs = new WebSocket('ws://localhost:9000')
    // myWs.onmessage = function (message) {
    //   // messages.value.push(message.data)
    //   console.log(message)
    // }
    // const wsSendEcho = (value) => {
    //   console.log(value)
    //   myWs.send(JSON.stringify({ action: 'ECHO', data: value.toString() }))
    // }

    onMounted(() => {
      initMesassage()
    })
    return {
      messages,
      initMesassage,
      sendMessage
      // wsSendEcho
    }
  }
}
