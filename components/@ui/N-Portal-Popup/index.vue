<template>
  <portal to="sliderPopup">
    <div :class="$style.overlay" @click="$emit('popupChange')">
    </div>
  </portal>
</template>

<script>

export default {
  name: 'NPortalPopup',
  components: {
  },
  props: {
  },
  setup (props) {
  }
}
</script>

<style scoped lang="scss" module>
.overlay{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(51, 51, 51, 0.78);
}
</style>
