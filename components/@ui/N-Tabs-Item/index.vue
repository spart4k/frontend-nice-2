<template>
  <li
    :class="[$style.item, showAnimate && $style.showAnimate]"
    class="navSectionItem"
    :style="{backgroundColor: BLAND_COLOR[item.slug] }"
  >
    <nuxt-link :to="{ path: `/${item.slug}` }">
      {{ item.title }}
    </nuxt-link>
  </li>
</template>

<script src="./setup.js" lang="js"></script>
<style  module lang="scss" src="./style.scss"></style>
