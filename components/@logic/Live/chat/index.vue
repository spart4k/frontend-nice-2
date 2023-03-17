<template>
  <div class="chat" :class="$style.chat">
    <live-chat-dialogue :scrollTrigger="scrollTrigger" :messages="messages" />
    <live-chat-panel v-if="$store.state.authentication.authorizated && chatEnable" @sendText="sendMessage" @sendSticker="sendSticker" />
    <N-Plug v-else-if="!$store.state.authentication.authorizated" style="margin-bottom: 0;" @login="login" @registration="registration" />
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
