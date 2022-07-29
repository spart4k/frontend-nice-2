<template>
  <div :class="$style.blackout">
    <div :class="$style.box">
      <N-Icon :class="$style.icon" name="button-play" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'NButtonPlay',
  components: {
  },
  props: {
  },
  setup (props) {
  }
}
</script>

<style scoped lang="scss" module>
.blackout{
position: absolute;
height: 100%;
width: 100%;
background: rgba(0, 0, 0, 0.3);
z-index: 5;
    .box{
        position: absolute;
        width: 8rem;
        height: 8rem;
        background: rgba(34, 34, 34, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        left: calc(50% - 4rem);
        top: calc(50% - 4rem);
        z-index: 6;
    }
}
</style>
