<template>
  <div :class="$style.row">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NRow'
}
</script>

<style scoped lang="scss" module>
.row {
  margin-bottom: 2.5rem;
}
</style>
