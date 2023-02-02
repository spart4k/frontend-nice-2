<template>
  <li
    :class="[$style.item, showAnimate && $style.showAnimate]"
    class="navSectionItem"
  >
    <nuxt-link :style="{backgroundColor: BLAND_COLOR[item.slug] }" :to="{ path: `/${item.slug}` }">
      {{ item.title }}
    </nuxt-link>
  </li>
</template>

<script src="./setup.js" lang="js"></script>
<style  module lang="scss" src="./style.scss"></style>
