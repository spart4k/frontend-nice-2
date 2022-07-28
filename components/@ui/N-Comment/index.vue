<template>
  <div :class="$style.comment">
    <h2 :class="$style.name">LeXa</h2>
    <p :class="$style.time">5 часов назад</p>
    <p :class="$style.text">Отличный освежающий вкус n n n n n  n n n    n n n n n n n n n n n v nv v v nv nvjffrvfrvfrnvrfnvrnfvmm frkvmfrvkrfmvkofrvfrvfrvrfv hdf bdbhf dhbf d vfdbv bhdfbvbdfbhvf</p>
  </div>
</template>
<script lang="js">
export default {
  name: 'NComment',
  props: {
  }
}
</script>
<style lang="scss" module>
  .comment {
  .name {
    color: $fontColorDefault;
    @include regular-text-bold;
    }
  .time{
    margin: 0.3rem 0 0.5rem;
    color: $fontColorDefault;
    opacity: 0.4;
    @include regular-text-small;
    }
  .text {
    color: $fontColorDefault;
    @include regular-text;
    }
  }
  div+.comment{
    margin-top: 2rem;
  }
</style>
