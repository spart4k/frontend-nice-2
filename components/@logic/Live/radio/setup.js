import { ref } from '@vue/composition-api'

export default {
  name: 'live-radio',
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const audioSource = ref(null)
    const audioPause = ref(null)
    const audioPlay = ref(null)
    const audioPlaying = ref(false)
    const playAudio = () => {
      audioPlaying.value = true
      audioSource.value.play()
    }
    const pauseAudio = () => {
      audioPlaying.value = false
      audioSource.value.pause()
    }
    return {
      audioSource,
      audioPause,
      audioPlay,
      playAudio,
      pauseAudio,
      audioPlaying
    }
  }
}
