<template>
  <div :class="$style.chat" >
    <live-chat-dialogue :messages="messages"></live-chat-dialogue>
    <live-chat-panel @sendText="sendMessage"></live-chat-panel>
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
