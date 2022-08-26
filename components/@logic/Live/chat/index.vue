<template>
  <div class="chat" :class="$style.chat">
    <live-chat-dialogue :messages="messages" />
    <live-chat-panel v-if="true" @sendText="sendMessage" />
    <N-Plug v-else style="margin-bottom: 0;" @login="login" @registration="registration" />
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
