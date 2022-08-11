import { ref, onMounted } from '@vue/composition-api'

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
    const marquee = ref(null)
    const playAudio = () => {
      audioPlaying.value = true
      audioSource.value.play()
    }
    const pauseAudio = () => {
      audioPlaying.value = false
      audioSource.value.pause()
    }

    function handleMarquee () {
      // console.log(marquee.value)
      const speed = 1
      // let lastScrollPos = 0
      // let timer

      const container = marquee.value.querySelector('.inner')
      const content = marquee.value.querySelector('.inner > *')
      // Get total width
      const elWidth = content.offsetWidth
      // console.log(elWidth)
      // Duplicate content
      const clone = content.cloneNode(true)
      container.appendChild(clone)

      let progress = 1
      function loop () {
        progress = progress - speed
        if (progress <= elWidth * -1) { progress = 0 }
        container.style.transform = 'translateX(' + progress + 'px)'
        container.style.transform += 'skewX(' + speed * 0.4 + 'deg)'

        window.requestAnimationFrame(loop)
      }
      loop()
    }
    onMounted(() => {
      handleMarquee()
    })

    return {
      audioSource,
      audioPause,
      audioPlay,
      playAudio,
      pauseAudio,
      audioPlaying,
      marquee
    }
  }
}
