<template>
  <div v-if="nickName" :class="$style.message">
    <p :class="$style.author">
      {{ nickName }}
    </p>
    <template v-if="$props.message.sticker && ($props.message.sticker.id !== 1)">
      <img
        :class="$style.sticker"
        :src="`${$axios.defaults.baseURL}/${message.sticker.src}`"
        alt=""
      >
    </template>
    <template v-else>
      <p :class="$style.body" v-html="decodeText" />
    </template>
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
