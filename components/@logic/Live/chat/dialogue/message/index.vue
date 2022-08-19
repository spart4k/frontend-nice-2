<template>
  <div :class="$style.message">
    <div :class="$style.author">
      {{ $props.message.author }}
    </div>
    <div v-html="$props.message.body" :class="$style.body">
      {{ $props.message.body }}
    </div>
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
