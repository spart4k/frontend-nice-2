<template>
  <header :class="$style.header">
    test
  </header>
</template>

<script lang="js">
export default {
  name: 'TheHeader',
  setup () {
  }
}
</script>

<style scoped lang="scss" module>
.header {
  background-color: red;
}
</style>
