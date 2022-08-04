<template>
  <div :class="$style.box">
    <N-Icon :class="$style.icon" name="button-close" />
  </div>
</template>

<script>

export default {
  name: 'NButtonClose',
  components: {
  },
  props: {
  },
  setup (props) {
  }
}
</script>

<style scoped lang="scss" module>
.box{
    position: absolute;
    width: 3.2rem;
    height: 3.2rem;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    right: 1rem;
    top: 1rem;
    z-index: 106;
    cursor: pointer;
    .icon {
        color: white;
    }
}
</style>
