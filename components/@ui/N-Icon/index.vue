<template>
  <div
    class="icon"
    @click="$emit('click', $event)"
    v-html="require(`~/static/icon/icon-${name}.svg?raw`)"
  />
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

<style lang="scss" scoped>
.icon {
  line-height: 0;
}
</style>
