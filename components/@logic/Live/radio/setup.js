import { ref, onMounted, nextTick, computed } from '@vue/composition-api'

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
    const marqueeLength = ref(null)
    const marqueeContent = ref(null)
    const marqueeContainerLength = ref(null)
    const isMarquee = ref(true)
    const playAudio = () => {
      audioPlaying.value = true
      audioSource.value.play()
    }
    const pauseAudio = () => {
      audioPlaying.value = false
      audioSource.value.pause()
    }
    const innerHeight = ref(null)
    const marqueeLengthComputed = computed(() => {
      return marqueeContent?.value?.offsetWidth
    })
    function handleMarquee () {
      isMarquee.value = true
      const speed = 1

      const container = marquee.value.querySelector('.inner')
      const content = marquee.value.querySelector('.marqueeContent')
      const elWidth = marqueeLength.value
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
      nextTick(() => {
          // Костыль для прорисовки шрифтов
          setTimeout(() => {
            marqueeLength.value = marqueeContent.value.getBoundingClientRect().width
            marqueeContainerLength.value = marquee.value.getBoundingClientRect().width
            if (marqueeLength.value >= marqueeContainerLength.value) {
              handleMarquee()
            } else {
              isMarquee.value = false
            }
          }, 1500)
      })

      window.addEventListener('resize', (e) => {
        innerHeight.value = window.innerHeight
      })
    })

    return {
      audioSource,
      audioPause,
      audioPlay,
      playAudio,
      pauseAudio,
      audioPlaying,
      marquee,
      innerHeight,
      marqueeLength,
      marqueeContent,
      marqueeLengthComputed,
      marqueeContainerLength,
      isMarquee
    }
  }
}
