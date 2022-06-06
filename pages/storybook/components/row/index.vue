<template>
  <div :class="$style.row">
    <div :class="$style.title">{{title}}</div>
    <div>
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StoryBookRow',
  props: {
    title: String
  }
}
</script>
<style lang="scss" module>
.row {
  //display: block;
  padding-bottom: 2rem;
  border-bottom: solid 1px $gray;
  width: 100%;
  & + .row {
    margin-top: 3rem;
  }
}
.title {
  color: $yellow;
  @include title-sm;

}
</style>
