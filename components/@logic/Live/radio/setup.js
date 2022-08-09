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

    function handleMarquee () {
      const marquee = document.querySelectorAll('.marquee')
      const speed = 4
      // let lastScrollPos = 0
      // let timer

      marquee.forEach(function (el) {
        const container = el.querySelector('.inner')
        const content = el.querySelector('.inner > *')
        // Get total width
        const elWidth = content.offsetWidth

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
      })
    }
    handleMarquee()
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
