<template>
  <div />
</template>

<script>
import { onMounted, ref, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'NWebsocket',
  props: {
  },
  setup (_, props) {
    const messages = ref([])
    const { store } = useContext()
    const loading = ref(true)
    const ws = new WebSocket('wss://test.itisthenice.com/websocket', null, { headers: { Authorization: '92' } })
    ws.onmessage = async (event) => {
      if (JSON.parse(event.data).messageType === 'bank' && JSON.parse(event.data).status === 'CONFIRMED') {
        store.commit('menu/changeKeyMenu', {
          key: 'basket',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 3 })
      } else if (JSON.parse(event.data).messageType === 'ping') {
        ws.send(JSON.stringify({ messageType: 'pong', id: store.state.authentication.user.id }))
      } else if (JSON.parse(event.data).messageType === 'auth') {
        ws.send(JSON.stringify({ messageType: 'auth', token: store.state.authentication.token }))
      } else if (loading.value) {
        messages.value = JSON.parse(event.data)
        loading.value = false
      } else {
        await messages.value.push(JSON.parse(event.data))
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

    onMounted(() => {
    })
    return {
      messages,
      sendSticker,
      loading,
      sendMessage
    }
  }
}

</script>

<style  lang="scss" module>
</style>
