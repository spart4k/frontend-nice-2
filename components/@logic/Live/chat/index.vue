<template>
  <div class="chat" :class="$style.chat" >
    <live-chat-dialogue :messages="messages"></live-chat-dialogue>
    <live-chat-panel v-if="true"  @sendText="sendMessage"></live-chat-panel>
    <N-Plug v-else @login="login" style="margin-bottom: 0;" @registration="registration" />
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
