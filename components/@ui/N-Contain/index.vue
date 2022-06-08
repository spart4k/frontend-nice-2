<template>
  <div :class="$style.contain">
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
  padding: 1.8rem;
  border-radius: $border-radius-1;
  background-color: $white;
}
</style>
