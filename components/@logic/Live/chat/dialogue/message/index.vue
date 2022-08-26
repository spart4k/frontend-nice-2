<template>
  <div :class="$style.message">
    <div :class="$style.author">
      {{ $props.message.user.nickname }}
    </div>
    <div v-html="$props.message.message_text" :class="$style.body">
      {{ $props.message.message_text }}
    </div>
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
