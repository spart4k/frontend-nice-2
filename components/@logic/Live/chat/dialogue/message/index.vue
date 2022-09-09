<template>
  <div v-if="$props.message.user.nickname" :class="$style.message">
    <div :class="$style.author">
      {{ $props.message.user.nickname }}
    </div>
    <template v-if="$props.message.sticker && ($props.message.sticker.id !== 20)">
      <img
        :class="$style.sticker"
        :src="`https://test.itisthenice.com/${message.sticker.src}`"
        alt=""
      >
    </template>
    <template v-else>
      <div :class="$style.body" v-html="decodeText" />
    </template>
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
