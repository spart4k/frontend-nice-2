let socket = null
try {
  socket = new WebSocket('wss://itisthenice.com/websocket')
  socket.onerror = function (event) {
    console.error(event)
    this.$toast.error("Ошибка: WebSocket connection to 'wss://itisthenice.com/websockets' failed: Unexpected response code: 400", { position: 'bottom-right', icon: true })
  }
} catch (e) {
  console.error('Sorry, the web socket at "%s" is un-available', e)
}
export default socket
