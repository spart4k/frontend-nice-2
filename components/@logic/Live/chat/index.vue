<template>
  <div :class="$style.chat" >
    <live-chat-dialogue></live-chat-dialogue>
    <live-chat-panel></live-chat-panel>
  </div>
</template>

<script>
export default {
  name: 'live-chat'

}
</script>
<style lang="scss" module src="./style.scss">
</style>
