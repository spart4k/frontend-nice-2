<template>
  <div :class="$style.dialogue">
      <div :class="$style.wrap" ref="dialog">
        <live-chat-dialogue-message v-for="(message, index) in messageToView" :key="index" :message="message" />
      </div>
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
