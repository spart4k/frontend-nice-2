import { onMounted } from '@nuxtjs/composition-api'

export default {
  name: 'live-chat',
  props: {
    messages: Array
  },
  setup (_, props) {
    // const messages = ref([])
    // const { store } = useContext()
    // const loading = ref(true)
    // const ws = new WebSocket('wss://test.itisthenice.com/websocket')
    // ws.onmessage = async (event) => {
    //   if (loading.value) {
    //     messages.value = JSON.parse(event.data)
    //     loading.value = false
    //   } else {
    //     await messages.value.push(JSON.parse(event.data))
    //     if (messages.value.length > 99) {
    //       messages.value.shift()
    //     }
    //   }
    // }

    // const sendMessage = (message) => {
    //   ws.send(JSON.stringify({ user_id: store?.state?.authentication?.user?.id, message_text: message }))
    // }

    // const sendSticker = (val) => {
    //   ws.send(JSON.stringify({ user_id: store?.state?.authentication?.user?.id, message_text: null, sticker_id: val }))
    // }

    onMounted(() => {
    })
    return {
      // messages,
      // sendSticker,
      // loading,
      // sendMessage
    }
  }
}