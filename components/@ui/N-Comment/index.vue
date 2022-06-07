<template>
  <div :class="$style.comment">
    <N-Icon name="message" />
    <span>{{ $props.current }}</span>
  </div>
</template>
<script lang="js">
export default {
  name: 'NComment',
  props: {
    current: {
      type: Number,
      default: null
    }
  }
}
</script>
<style lang="scss" module>
  .comment {
    display: flex;
    align-items: center;
    & > span {
      margin-left: .577rem;
      color: $fontColorDefault;
      @include text;
      font-weight: 600;
    }
  }
</style>
