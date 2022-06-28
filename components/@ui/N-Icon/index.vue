<template>
  <div
    :class="$style.icon"
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

<style lang="scss" scoped module>
.icon {
  line-height: 0;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
