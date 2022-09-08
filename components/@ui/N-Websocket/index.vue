<template>
  <div />
</template>

<script>
import { onMounted, ref, useContext, watch } from '@nuxtjs/composition-api'

export default {
  name: 'NWebsocket',
  props: {
  message: String
  },
  setup (_, props) {
    const inpMes = ref(props.message)
    const messages = ref([])
    const { store } = useContext()
    const loading = ref(true)
    const ws = new WebSocket('wss://test.itisthenice.com/websocket')
    ws.onmessage = async (event) => {
    const data = JSON.parse(event.data)
      if (data.messageType === 'bank' && data.status === 'CONFIRMED' && data.status === 'CONFIRMED' && data.user_id === store.state.authentication.user.id) {
        store.commit('menu/changeKeyMenu', {
          key: 'basket',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 3 })
      } else if (loading.value && data.messageType === 'chat') {
          messages.value = data
          loading.value = false
        } else if (!loading.value && data.messageType === 'chat' && props.message) {
          await messages.value.push(data)
        if (messages.value.length > 99) {
          messages.value.shift()
        }
      }
    }

    const sendMessage = (message) => {
      ws.send(JSON.stringify({ user_id: store?.state?.authentication?.user?.id, message_text: message }))
    }

    const sendSticker = (val) => {
      ws.send(JSON.stringify({ user_id: store?.state?.authentication?.user?.id, message_text: null, sticker_id: val }))
    }

    watch(() => inpMes.value, () => {
      console.log(inpMes.value)
    })

    onMounted(() => {
      console.log(inpMes.value)
    })
    return {
      messages,
      sendSticker,
      loading,
      sendMessage,
      inpMes
    }
  }
}

</script>

<style  lang="scss" module>
</style>
