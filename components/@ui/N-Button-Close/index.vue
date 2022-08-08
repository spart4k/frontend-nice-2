<template>
  <div :class="$style.box" :style="{ backgroundColor: backgroundColor }" v-on="$listeners">
    <N-Icon :class="$style.icon" name="button-close" :style="{ color: color }" />
  </div>
</template>

<script>

export default {
  name: 'NButtonClose',
  components: {
  },
  props: {
    color: { type: String, default: 'white' },
    backgroundColor: { type: String, default: 'rgba(255, 255, 255, 0.2)' }
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
    // background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 106;
    cursor: pointer;
    .icon {
        // color: white;
    }
}
</style>
