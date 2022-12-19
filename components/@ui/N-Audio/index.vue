<template>
  <div :class="$style.container">
    <div ref="marquee" :class="[ $style.marquee, $style.name ]">
      <div class="inner" :class="[$style.inner, isMarquee ? $style.active : $style.noActive ]">
        <p ref="marqueeContent" :class="$style.marqueeContent" class="marqueeContent">
          {{ audioTitle }}
        </p>
      </div>
    </div>
    <!-- <div :class="$style.controlPanel">
    </div> -->
    <div :class="$style.audioContainer">
      <audio ref="audioSource"
      :src="src"
      preload="none"
      @canplay="isLoaded"
      :class="$style.audio"
      @timeupdate="onTimeUpdate"
      />
      <div :class="$style.time" :style="{width: timeWidth}">{{currentTimeShow}} / {{durationShow}}</div>
      <div :class="$style.progressBar">
        <div :class="$style.container" ref="container" >
          <input
          ref="inputTimeLine"
          :style="{backgroundSize: `${finished}% 100%`}"
          v-model="playbackTime"
          type="range"
          min="0"
          :class="$style.position"
          :max="duration"
          @input="changeBackground"
          />
        </div>
      </div>
      <div v-if="!audioStart" :class="$style.plug"></div>
    </div>
    <div :class="$style.control">
      <N-Loading v-if="loading" :class="$style.controlButtonLoading" black />
      <N-Icon v-else-if="!audioPlaying" :class="$style.controlButton" name="play" @click="playAudio" />
      <N-Icon v-else-if="audioPlaying" :class="$style.controlButton" name="pause" @click="pauseAudio" />
    </div>
  </div>
  <!-- <div>
    <div v-for="(item, index) in files" :key="index">
      <div v-if="item.file_type_id === 3" :class="$style.container">
        <div ref="marquee" :class="[ $style.marquee, $style.name ]">
          <div class="inner" :class="[$style.inner, isMarquee ? $style.active : $style.noActive ]">
            <p ref="marqueeContent" :class="$style.marqueeContent" class="marqueeContent">
              {{ item.title }}
            </p>
          </div>
        </div>
        <div :class="$style.control">
          <N-Loading v-if="loading" :class="$style.controlButtonLoading" black />
          <N-Icon v-else-if="!audioPlaying" :class="$style.controlButton" name="play" @click="playAudio(index)" />
          <N-Icon v-else-if="audioPlaying" :class="$style.controlButton" name="pause" @click="pauseAudio(index)" />
        </div>
        <audio ref="audioSource" :src="item.src" preload="none" @canplay="isLoaded" />
      </div>
    </div>
  </div> -->
</template>
<script lang="js">
import { ref, onMounted, nextTick, computed, onUnmounted, watch } from '@nuxtjs/composition-api'

export default {
  name: 'NAudio',
  props: {
    src: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    files: {
      type: Object
    },
    stop: {
      type: Number
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const audioPlaying = ref(false)
    const audioSource = ref(null)
    const audioTitle = computed(() => { return props.title.slice(0, -4) })
    const marquee = ref(null)
    const marqueeLength = ref(null)
    const marqueeContent = ref(null)
    const inputTimeLine = ref(null)
    const marqueeContainerLength = ref(null)
    const container = ref()
    const currentTimeShow = ref('00:00')
    const durationShow = ref('00:00')
    const isMarquee = ref(true)
    const loading = ref(false)
    const currentTime = ref(0)
    const audioStart = ref(false)
    const duration = ref(0)
    const playbackTime = ref(0)
    const finished = ref(0)
    const lock = ref(true)
    const timeWidth = ref('8.3rem')
    const changeBackground = (val) => {
      finished.value = (val.target.value / val.target.max) * 100
      audioSource.value.currentTime = (val.target.value / val.target.max) * audioSource.value.duration.toFixed(0)
    }
    const isLoaded = () => {
      loading.value = false
    }
    const playAudio = () => {
      audioStart.value = true
      if (!audioSource.value.readyState) {
        loading.value = true
      }
      emit('playAudio')
      setTimeout(() => {
        audioPlaying.value = true
        audioSource.value.play()
      }, 100)
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
    const onTimeUpdate = (val) => {
      if (audioStart.value) {
        finished.value = (inputTimeLine.value.value / inputTimeLine.value.max) * 100
        currentTime.value = audioSource.value.currentTime.toFixed(0)
        duration.value = audioSource.value.duration.toFixed(0)
        // if (audioSource.value.duration.toFixed(0) < 3600) {
        // currentTimeShow.value = new Date(audioSource.value.currentTime.toFixed(0) * 1000).toISOString().substring(14, 19)
        // durationShow.value = new Date(audioSource.value.duration.toFixed(0) * 1000).toISOString().substring(14, 19)
        currentTimeShow.value = secConverter(currentTime.value)
        durationShow.value = secConverter(duration.value)
        // } else {
          // timeWidth.value = '11.3rem'
          // currentTimeShow.value = new Date(audioSource.value.currentTime.toFixed(0) * 1000).toISOString().substring(11, 19)
          // durationShow.value = new Date(audioSource.value.duration.toFixed(0) * 1000).toISOString().substring(11, 19)
        // }
        if (lock.value) {
          playbackTime.value = currentTime.value
        }
      }
    }
    const secConverter = (val) => {
      let sec = val
      let minutes = 0
      if (Math.floor(sec / 60)) {
        minutes = Math.floor(sec / 60)
      }
      sec = sec - minutes * 60
      const time = `${minutes < 10 ? '0' : ''}${minutes}:${sec < 10 ? '0' : ''}${sec}`
      return time
    }
    const lockInput = () => {
      lock.value = false
    }
    const unlockInput = () => {
      lock.value = true
    }
    onMounted(() => {
      window.addEventListener('mousedown', lockInput)
      window.addEventListener('mouseup', unlockInput)
      nextTick(() => {
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
    onUnmounted(() => {
      window.removeEventListener('mousedown', lockInput)
      window.removeEventListener('mouseup', unlockInput)
    })

    watch(() => props.stop, () => {
      audioPlaying.value = false
      audioSource.value.pause()
    })

    return {
      audioPlaying,
      currentTimeShow,
      durationShow,
      playAudio,
      finished,
      pauseAudio,
      audioSource,
      audioStart,
      inputTimeLine,
      loading,
      isLoaded,
      audioTitle,
      duration,
      currentTime,
      container,
      changeBackground,
      marquee,
      innerHeight,
      marqueeLength,
      marqueeContent,
      marqueeLengthComputed,
      marqueeContainerLength,
      isMarquee,
      onTimeUpdate,
      playbackTime,
      lock,
      lockInput,
      unlockInput,
      timeWidth,
      secConverter
    }
  }
}
</script>
<style lang="scss" module>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: .2rem;
  background-image: linear-gradient(#222222, #222222);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1.4rem;
  width: 1.4rem;
  border-radius: 50%;
  background: #222222;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 1.4rem;
  width: 1.4rem;
  border-radius: 50%;
  background: #222222;
}

input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 1.4rem;
  width: 1.4rem;
  border-radius: 50%;
  background: #222222;
}

/* Input Track */
input[type=range]::-webkit-slider-runnable-track  {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type=range]::-moz-range-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-ms-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
.container {
  width: 100%;
  background: #F5F5F5;
  border-radius: 20px;
  padding: 0 1.5rem;
  position: relative;
  display: flex;
  height: 8rem;
  justify-content: center;
  gap: 1.5rem;
  flex-direction: column;
  overflow: hidden;
  .time {
    @include regular-text-small;
    opacity: 0.5;
    @media (max-width: $mobileWidth) {
      // width: 14.5rem;
    }
  }
  .audioContainer {
    position: relative;
    height: 1.5rem;
    width: 100%;
    display: flex;
    .plug {
      cursor: initial;
      width: 100%;
      height: 100%;
      z-index: 9;
      position: absolute;
    }
  }
  .audio {
    position: absolute;
    height: 100%;
    width: 105%;
    padding-right: 1rem;
    left: -0.3rem;
  }
  .progressBar{
    margin-left: 1.5rem;
    flex-grow: 1;
    margin-right: 6rem;
    @media (max-width: $mobileWidth) {
      flex-grow: 0;
      margin-right: 0;
    }
  }
  .container{
    width: 100%;
    height: 1.5rem;
    position: relative;
    padding: 0;
  }
  .control {
    margin: 1rem 0;
    position: absolute;
    height: calc(100% - 2rem);
    width: 8rem;
    top: 0;
    right: 0;
    background: linear-gradient(270deg, #F5F5F5 78.12%, rgba(245, 245, 245, 0) 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    .controlButton {
      margin-left: 4rem;
      cursor: pointer;
      width: 1.8rem;
      height: 1.8rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .controlButtonLoading{
      margin-left: 3rem;
      // width: 1.8rem;
      // height: 1.8rem;
    }
  }
}
.marquee {
    width: 100%;
  }
  .marquee .inner {
    position: relative;
    display: flex;
    color: $fontColorDefault;
    &.noActive {
      > * {
        padding: 0 0;
      }
    }
    &.active {
      > * {
        padding: 0 4rem 0 0;
      }
    }
  }
  .name {
    overflow: hidden;
    white-space: nowrap;
    @include regular-text-small;
    color: $fontColorDefault;
    position: relative;
  }
  .marquee .inner > * {
    white-space: nowrap;
    @include regular-text;
  }
  @keyframes marqueeTranslate {
    from {
      margin-left: -350%;
    }
    to {
      margin-left: 100%;
    }
  }
</style>
