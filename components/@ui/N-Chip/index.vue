<template>
  <div :class="$style.chip" v-on="$listeners">
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: .8rem 1.2rem;
  max-height: 3.1rem;
  border: solid 2px $blueBlack2;
  border-radius: $border-radius-2;
  color: $blueBlack2;
  @include text-md;
  @include montserratMedium;
}
</style>
