<template>
  <div :class="$style.chip">
    <slot />
  </div>
</template>
<script lang="js">
export default {
  name: 'NChip'
}
</script>
<style lang="scss" module>
.chip {
  display: inline-block;
  padding: .8rem 1.2rem;
  border: solid 2px $blueBlack2;
  border-radius: $border-radius-2;
  color: $blueBlack2;
  font-weight: 600;
  @include text-md;
}
</style>
