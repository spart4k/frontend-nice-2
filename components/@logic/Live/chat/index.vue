<template>
  <div class="chat" :class="$style.chat">
    <live-chat-dialogue :messages="messages" />
    <live-chat-panel v-if="$store.state.authentication.authorizated" @sendText="($event) => $emit('sendMessage', $event)" @sendSticker="($event) => $emit('sendSticker', $event)" />
    <N-Plug v-else style="margin-bottom: 0;" @login="login" @registration="registration" />
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
