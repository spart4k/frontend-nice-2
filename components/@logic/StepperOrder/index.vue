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
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '96x96', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '128x128', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '192x192', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '256x256', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '384x384', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '512x512', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '57x57', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '60x60', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '72x72', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '76x76', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '114x114', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '120x120', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '144x144', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '152x152', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '180x180', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '10x10', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '11x11', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '12x12', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '13x13', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '14x14', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '15x15', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '16x16', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '17x17', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '18x18', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '19x19', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '20x20', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '21x21', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '22x22', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '23x23', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '24x24', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '25x25', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '26x26', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '27x27', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '28x28', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '29x29', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '30x30', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '31x31', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '32x32', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '33x33', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '34x34', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '35x35', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '36x36', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '37x37', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '38x38', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '39x39', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '40x40', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '41x41', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '42x42', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '43x43', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '44x44', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '45x45', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '46x46', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '47x47', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '48x48', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '49x49', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '50x50', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '51x51', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '52x52', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '53x53', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '54x54', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '55x55', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '56x56', type: 'image/png' },
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
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '96x96', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '128x128', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '192x192', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '256x256', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '384x384', type: 'image/png' },
                  { src: `https://test.itisthenice.com/${song.value.wrap}`, sizes: '512x512', type: 'image/png' }
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
