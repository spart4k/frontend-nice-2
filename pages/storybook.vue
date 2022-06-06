<template>
  <div :class="$style.icons">
    <N-Icon name="message" />
    <N-Icon name="minus" />
    <N-Icon name="plus" />
    <N-Icon name="arrow" />
  </div>
</template>
<script>
export default {
  name: 'StoryBook'
}
</script>

<style lang="scss" module>
  .icons {
    display: flex;
    background-color: gray;
  }
</style>
