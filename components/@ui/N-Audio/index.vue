<template>
  <!-- <audio
    controls
    :src="src"
  > </audio> -->
  <div :class="$style.container">
    <marquee behavior="scroll" direction="left" scrolldelay="60" :class="$style.marquee">
      <div :class="$style.title">
        {{ title }}
      </div>
    </marquee>
    <div :class="$style.control">
      <N-Icon v-if="!audioPlaying" :class="$style.controlButton" name="play" @click="playAudio" />
      <N-Icon v-else-if="audioPlaying" :class="$style.controlButton" name="pause" @click="pauseAudio" />
    </div>
    <audio ref="audioSource" :src="src" />
  </div>
</template>
<script lang="js">
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NMusic',
  props: {
    src: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const audioPlaying = ref(false)
    const audioSource = ref(null)
    const audio = ref(props.src)
    const name = ref(props.title)
    const playAudio = () => {
      audioPlaying.value = true
      audioSource.value.play()
    }
    const pauseAudio = () => {
      audioPlaying.value = false
      audioSource.value.pause()
    }
    return {
      audioPlaying,
      playAudio,
      pauseAudio,
      audioSource,
      name,
      audio
    }
  }
}
</script>
<style lang="scss" module>
// audio {
//   height: 3.37rem;
//   width: 100%;
// }
.container {
  width: 100%;
  background: #F5F5F5;
  border-radius: 20px;
  padding: 3.2rem 1.5rem;
  position: relative;
  display: flex;
  .control {
    margin: 1rem;
    position: absolute;
    height: calc(100% - 2rem);
    width: 6rem;
    top: 0;
    right: 0;
    background: linear-gradient(270deg, #F5F5F5 78.12%, rgba(245, 245, 245, 0) 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    .controlButton {
      margin-left: 3rem;
    }
  }
}
</style>
