<template>
  <div :class="[$style.wrapper, $style.bg]">
    <div :class="$style.overlay" :style="{backgroundColor: color}" />
  </div>
</template>

<script>

export default {
  name: 'NBackground',
  props: {
    description: {
      type: Object,
      default: () => {
        return {
          background: ''
        }
      }
    },
    hideImage: Boolean,
    isHomePage: Boolean,
    color: String
  },
  setup (props) {}
}
</script>

<style scoped lang="scss" module>
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-image: url('@/assets/img/background/index-background.jpg');
  background-size: cover;
}
.overlay {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  opacity: 0.35;
  z-index: 2;
  mix-blend-mode: hard-light;
}
</style>
