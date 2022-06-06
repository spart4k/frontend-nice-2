<template>
  <div v-html="require(`~/static/icon/icon-${name}.svg?raw`)" />
</template>
<script lang="js">
export default {
  name: 'NIcon',
  props: {
    name: {
      type: String,
      default: 'image'
    }
  }
}
</script>

<style scoped>
h1 {
  background-color: red;
}
</style>
