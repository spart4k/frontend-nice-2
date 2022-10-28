<template>
  <transition :name="keyAnimation === 'prev' ? 'slideShow' : 'slideback'">
    <component
      :is="isCurrentPage"
      :header-items="headerItems"
      :messages="messages"
      :song="song"
      @changeStep="changeStep"
      @changeComponent="changeComponent"
      @toAddress="toAddress"
      @closeState="$emit('closeState')"
      @sendMessage="sendMessage"
      @sendSticker="sendSticker"
      @playAudio="$emit('playAudio')"
      @pauseAudio="$emit('pauseAudio')"
    />
  </transition>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'

export default {
  name: 'StepperOrder',
  props: {
    headerItems: Array,
    step: Number,
    currComp: String,
    keyAnimation: String,
    basketData: Object
    // messages: Array
  },
  setup (props, { emit }) {
  const { store } = useContext()
  const isAddress = ref(false)
  const changeStep = (value) => {
    emit('changeStep', value)
  }

  const changeComponent = (value) => {
    emit('changeStep', 'increment')
    emit('changeComp', { key: value.value.key, effect: value.value.effect })
  }

  const toAddress = (value) => {
    isAddress.value = value
  }

  const isCurrentPage = computed(() => {
    if (props.step === 0 && !props.currComp) {
        return 'n-nav-menu'
    } else if (props.currComp === 'basket') {
          switch (props.step) {
        case 1 :
          return 'StepOneBasket'
        case 2 :
          return 'StepTwoOrder'
        case 3 :
          if (isAddress.value) {
            return 'ChangeAddress'
          } else {
            return 'StepThreePlug'
          }
        }
      } else if (props.currComp === 'registration' && !store.state.authentication.authorizated) {
          switch (props.step) {
        case 1 :
          return 'FormAuthLogin'
        case 2 :
          return 'FormAuthDefault'
        case 3 :
          return 'FormAuthRecovery'
        }
    } else if (props.currComp === 'registration' && store.state.authentication.authorizated) {
          switch (props.step) {
        case 1 :
          return 'FormProfileDefault'
        case 2 :
          return 'History-OrdersDefault'
        }
    } else if (props.currComp === 'search') {
          switch (props.step) {
        case 1 :
          return 'Search-Cards'
        }
    } else if (props.currComp === 'live-default') {
      return 'live-default'
    }
    })

    const messages = ref([])
    const song = ref([])
    const loading = ref(true)
    // const ws = new WebSocket('wss://test.itisthenice.com/websocket')
    // const ws = new WebSocket('ws://192.168.1.19:8999/websocket')
    const socket = new WebSocket('wss://test.itisthenice.com/websocket')
    const socketCloseListener = (event) => {
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data)
        console.log(data)
          if (data.messageType === 'bank' && data.status === 'CONFIRMED' && data.status === 'CONFIRMED' && data.user_id === store.state.authentication.user.id) {
            store.commit('menu/changeKeyMenu', {
              key: 'basket',
              effect: 'fx-slide-from-left'
            })
            store.commit('menu/changeStepMenu', { step: 3 })
            store.commit('basket/setBasket', [])
            store.commit('basket/setBasketSum', 0)
          } else if (loading.value && data.messageType === 'lastMessages') {
            messages.value = data.messageArray
            song.value = data.currentSong
            if ('mediaSession' in navigator) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: song.value.title,
                artwork: [
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, type: 'image/png' }
                ]
              })
            }
            loading.value = false
          } else if (data.messageType === 'nextSong') {
            song.value = data.data
            if ('mediaSession' in navigator) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: song.value.title,
                artwork: [
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, type: 'image/png' }
                ]
              })
            }
            emit('destroyTag')
          } else if (!loading.value) {
            await messages.value.push(data)
            if (messages.value.length > 99) {
              messages.value.shift()
            }
          }
        }
      socket.onclose = (event) => {
        if (event.code !== 1) {
          socketCloseListener()
        }
      }
    }
    socketCloseListener()

    const sendMessage = (message) => {
      socket.send(JSON.stringify({ user_id: store.state.authentication.user.id, message_text: unescape(encodeURIComponent(message)), sticker_id: 1, messageType: 'chat' }))
    }

    const sendSticker = (val) => {
      socket.send(JSON.stringify({ user_id: store.state.authentication.user.id, message_text: null, sticker_id: val, messageType: 'chat' }))
    }

    return {
      isCurrentPage,
      changeStep,
      changeComponent,
      toAddress,
      messages,
      sendSticker,
      loading,
      sendMessage,
      song
    }
  }
}
</script>

<style scoped>

</style>
