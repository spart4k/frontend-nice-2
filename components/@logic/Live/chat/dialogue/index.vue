<template>
  <div :class="$style.dialogue">
      <div :class="$style.wrap">
        <live-chat-dialogue-message v-for="(message, index) in messages" :key="index" :message="message"/>
      </div>
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
