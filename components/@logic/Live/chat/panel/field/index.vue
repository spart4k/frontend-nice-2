<template>
  <div :class="$style.field">
    <input v-model="value" @input="inputValue" placeholder="Скажите что-то ...">
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
