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
import { ref, useContext, computed, onMounted } from '@nuxtjs/composition-api'
// import socket from '@/compositions/socket'
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
  setup (props, { emit, root }) {
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
    let socket = null
    const websocketUrl = 'wss://itisthenice.com/websocket'
    try {
      socket = new WebSocket(websocketUrl)
      socket.onerror = function () {
        // root.$toast.error(`Ошибка: WebSocket connection to "${websocketUrl}" failed: Unexpected response code: 400`, { position: 'bottom-right', icon: true })
      }
    } catch (e) {
      console.error('Sorry, the web socket at "%s" is un-available', e)
    }
    const socketCloseListener = (event) => {
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data)
          if (data.messageType === 'bank' && data.status === 'CONFIRMED' && data.user_id === store.state.authentication.user.id) {
            store.commit('menu/changeKeyMenu', {
              key: 'basket',
              effect: 'fx-slide-from-left'
            })
            store.commit('menu/changeStepMenu', { step: 3 })
            store.commit('basket/resetBasket')
            store.commit('basket/setBasketSum', 0)
          } else if (loading.value && data.messageType === 'lastMessages') {
            messages.value = data.messageArray
            // song.value = data.currentSong
            if ('mediaSession' in navigator) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: song.value.title,
                artwork: [
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '96x96', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '128x128', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '192x192', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '256x256', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '384x384', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '512x512', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '1024x1024', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '2048x2048', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '4096x4096', type: 'image/png' }
                ]
              })
            }
            loading.value = false
          } else if (data.messageType === 'nextSong') {
            // song.value = data.data
            if ('mediaSession' in navigator) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: song.value.title,
                artwork: [
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '96x96', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '128x128', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '192x192', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '256x256', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '384x384', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '512x512', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '1024x1024', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '2048x2048', type: 'image/png' },
                  { src: `${root.$axios.defaults.baseURL}/${song.value.wrap}`, sizes: '4096x4096', type: 'image/png' }
                ]
              })
            }
            // emit('destroyTag')
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
      try {
        socket.send(JSON.stringify({ user_id: store.state.authentication.user.id, message_text: unescape(encodeURIComponent(message)), sticker_id: 1, messageType: 'chat' }))
      } catch (err) {
        console.log(err)
      }
    }

    const sendSticker = (val) => {
      try {
        socket.send(JSON.stringify({ user_id: store.state.authentication.user.id, message_text: null, sticker_id: val, messageType: 'chat' }))
      } catch (err) {
        console.log(err)
      }
    }
    class Connect {
      constructor () {
          this.#init()
      }

      #init () {
          this.clickHandler = this.clickHandler.bind(this)
      }

      clickHandler (e) {
          if (e.target.tagName === 'BUTTON') {
              const {
                  type
              } = e.target.dataset

              if (type === 'start-btn') {
                  this.startEvents()
              } else if (type === 'stop-btn') {
                  this.stopEvents()
              }

              this.changeDisabled()
          }
      }

      changeDisabled () {
          if (this.stopBtn.disabled) {
              this.stopBtn.disabled = false
              this.startBtn.disabled = true
          } else {
              this.stopBtn.disabled = true
              this.startBtn.disabled = false
          }
      }

      startEvents () {
          function getTimestampInSeconds () {
            return Math.floor(Date.now() / 1000)
          }
          this.eventSource = new EventSource(`${root.$axios.defaults.baseURL}/events/${getTimestampInSeconds()}`)

          this.eventLog = 'Accepting data from the server.'

          this.eventSource.addEventListener('nextSong', (e) => {
              const userData = JSON.parse(e.data)
              song.value = userData
              if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: userData.title,
                    artwork: [
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '96x96', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '128x128', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '192x192', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '256x256', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '384x384', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '512x512', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '1024x1024', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '2048x2048', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '4096x4096', type: 'image/*' }
                    ]
                })
              }
              // emit('destroyTag')
          })

          this.eventSource.addEventListener('currentSong', (e) => {
              const userData = JSON.parse(e.data)
              song.value = userData
              if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: userData.title,
                    artwork: [
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '96x96', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '128x128', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '192x192', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '256x256', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '384x384', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '512x512', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '1024x1024', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '2048x2048', type: 'image/*' },
                    { src: `${root.$axios.defaults.baseURL}/${userData.wrap}`, sizes: '4096x4096', type: 'image/*' }
                    ]
                })
              }
          })

          this.eventSource.addEventListener('error', (e) => {
            console.log(e)
            console.log('error')
            // const template = getTemplateError()
              // this.eventSource.close()

              // this.eventLog.textContent = `Got an error: ${e}`

              // this.changeDisabled()
          }, {once: true})
      }

      stopEvents () {
          this.eventSource.close()
          this.eventLog.textContent = 'Event stream closed by client.'
      }
    }

    onMounted(() => {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          socket.close()
        } else {
           socket = new WebSocket(websocketUrl)
           socketCloseListener()
        }
      })
      const app = new Connect('main')
      app.startEvents()
    })

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
