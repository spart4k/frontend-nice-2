<template>
  <div :class="$style.row">
    <div :class="$style.title">
      {{ title }}
    </div>
    <div :class="[$style.body, $props.flex && $style.flex]">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'StoryBookRow',
  props: {
    title: {
      type: String,
      default: 'Заголовок'
    },
    flex: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" module>
.row {
  //display: block;
  padding-bottom: 2rem;
  border-bottom: solid .1rem $white;
  width: 100%;
  & + .row {
    margin-top: 3rem;
  }
}
.title {
  color: $yellow;
  @include title-sm;
}
.body {
  &.flex {
    display: flex;
    align-items: flex-start;
  }
}
</style>
