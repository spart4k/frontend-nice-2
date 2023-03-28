import { ref, onMounted, nextTick, computed, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'live-radio',
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    song: {
      type: [Array, Object],
      default: () => []
    }
  },
  setup (props, { emit }) {
    const { store } = useContext()
    const audioSource = ref(null)
    const audioPause = ref(null)
    const audioPlay = ref(null)
    const cardLink = computed(() => {
      if (props.song.link) {
        if (props.song.link === '/undefined/undefined') {
          return undefined
        } else {
          return props.song.link
        }
      }
    })
    const audioPlaying = computed(() => store.state.menu.audioPlaying)
    const marquee = ref(null)
    const marqueeLength = ref(null)
    const marqueeContent = ref(null)
    const marqueeContainerLength = ref(null)
    const isMarquee = ref(true)
    const closeBottom = () => {
      if (window.innerWidth < 450) {
        emit('closeState')
      }
    }
    const playAudio = () => {
      emit('playAudio')
      const audioCard = document.querySelector('.audioCard')
      if (audioCard) {
        audioCard.pause()
      }
      // console.log(audioCard)
      store.commit('menu/changeAudioPlaying', true)
    }
    const pauseAudio = () => {
      emit('pauseAudio')
      store.commit('menu/changeAudioPlaying', false)
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
      isMarquee,
      cardLink,
      closeBottom
    }
  }
}
