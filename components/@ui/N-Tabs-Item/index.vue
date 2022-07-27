<template>
  <li
    :class="$style.item"
    :style="{backgroundColor: BLAND_COLOR[item.slug] }"
  >
    <span>{{ item.title }}</span>
  </li>
</template>

<script src="./setup.js"></script>

<style scoped module lang="scss" src="./style.scss"></style>
