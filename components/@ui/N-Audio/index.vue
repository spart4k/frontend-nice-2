<template>
  <audio
    controls
    src="/media/cc0-audio/t-rex-roar.mp3"
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
