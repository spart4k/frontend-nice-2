<template>
  <div
    :class="$style.contain"
    @click="$emit('click', $event)"
  >
    <slot />
  </div>
</template>
<script lang="js">
export default {
  name: 'NContain'
}
</script>
<style lang="scss" module>
.contain {
  display: inline-block;
  width: 100%;
  padding: 1.8rem;
  border-radius: $border-radius-1;
  background-color: $white;
}
</style>
