<template>
  <div :class="$style.box" v-on="$listeners">
    <N-Icon :class="$style.icon" name="close" :style="{ color: color }" />
  </div>
</template>

<script>

export default {
  name: 'NButtonClose',
  components: {
  },
  props: {
    color: { type: String, default: 'white' }
  },
  setup (props) {
  }
}
</script>

<style scoped lang="scss" module>
.box{
    width: 3.3rem;
    height: 3.2rem;
    background: rgba(34, 34, 34, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    .icon {
        width: 1.4rem;
        height: 1.4rem;
        // color: white;
    }
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
