<template>
  <div :class="$style.container">
    <div ref="marquee" :class="[ $style.marquee, $style.name ]">
      <div class="inner" :class="[$style.inner, isMarquee ? $style.active : $style.noActive ]">
        <p ref="marqueeContent" :class="$style.marqueeContent" class="marqueeContent">
          {{ title }}
        </p>
      </div>
    </div>
    <div :class="$style.control">
      <N-Loading v-if="loading" :class="$style.controlButtonLoading" black />
      <N-Icon v-else-if="!audioPlaying" :class="$style.controlButton" name="play" @click="playAudio" />
      <N-Icon v-else-if="audioPlaying" :class="$style.controlButton" name="pause" @click="pauseAudio" />
    </div>
    <audio ref="audioSource" :src="src" preload="none" @canplay="isLoaded" />
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
import { ref, onMounted, nextTick, computed } from '@vue/composition-api'

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
    },
    files: {
      type: Object
    }
  },
  setup (props, ctx) {
    const audioPlaying = ref(false)
    const audioSource = ref(null)
    const marquee = ref(null)
    const marqueeLength = ref(null)
    const marqueeContent = ref(null)
    const marqueeContainerLength = ref(null)
    const isMarquee = ref(true)
    const loading = ref(false)
    const isLoaded = () => {
      loading.value = false
    }
    const playAudio = () => {
      if (!audioSource.value.readyState) {
        loading.value = true
      }
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
      audioPlaying,
      playAudio,
      pauseAudio,
      audioSource,
      loading,
      isLoaded,

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
</script>
<style lang="scss" module>
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
