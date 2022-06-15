<template>
  <audio
    controls
    :src="src"
  >
    <!--    <code>audio</code> element.-->
  </audio>
</template>
<script lang="js">
export default {
  name: 'NMusic',
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" module>
audio {
  height: 3.37rem;
  width: 100%;
}
</style>
