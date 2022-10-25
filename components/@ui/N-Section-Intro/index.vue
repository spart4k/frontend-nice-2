<template>
  <div :class="$style.container">
    <div>
      <h1 :class="[$style.title]">
        {{ description.title }}
      </h1>
      <N-Icon :class="$style.quote" name="quote" />
    </div>
    <div>
      <h2 v-if="description.text" :class="$style.subtitle">
        {{ description.text ? description.text : 'Comming soon' }}
      </h2>
      <h3 v-if="description.author" :class="$style.author">
        – {{ description.author ? description.author : 'Comming soon' }}
      </h3>
    </div>
    <div :class="$style.image">
      <img :src="imageModule" alt="">
    </div>
    <div :class="$style.arrowDownContainer">
      <N-Icon name="arrow-slider" class="arrow" :class="$style.arrowDown" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, useContext, ref } from '@nuxtjs/composition-api'
const BLAND_IMAGE = {
  muzyka: 'muzyka.png',
  video: 'video.png',
  ctivo: 'ctivo.png',
  iskusstvo: 'iskusstvo.png',
  kuxnia: 'kuxnia.png',
  magazin: 'magazin.png',
  foto: 'foto.png',
  odezda: 'odezda.png',
  meropriiatiia: 'meropriiatiia.png',
  efir: 'efir.png',
  moneta: 'moneta.png'
}
export default {
  name: 'NSectionIntro',
  props: {
    description: {
      type: Object
    },
    image: String
  },
  setup (props) {
    const { $gsap } = useContext()
    const scrollingContent = ref(null)
    const imageModule = computed(() => {
      if (BLAND_IMAGE[props.image]) {
        return require(`~/assets/img/preview/${BLAND_IMAGE[props.image]}`)
      }
      return ''
    })

    onMounted(() => {
      $gsap.to('.arrow', {
        scrollTrigger: {
          trigger: '.content',
          // start: `top ${top}`,
          start: 10,
          end: 100,
          scrub: true
        },
        y: -5,
        opacity: 0
      })
    })

    return {
      imageModule,
      scrollingContent,
      BLAND_IMAGE
    }
  }
}
</script>

<style scoped lang="scss" module>
.container {
  position: relative;
  color: $white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  .title {
    @include text-style-h1;
    margin-bottom: 4rem;
    text-align: center
  }
  .quote {
    text-align: center
  }
  .subtitle {
      @include button;
      margin: 1rem 0;
      text-align: center
  }
  .author {
    @include regular-text;
    text-align: center;
  }
  .image {
    // width: 32.5rem;
    // height: 32.5rem;
    height: 100%;
    overflow: hidden;
    margin: 0 auto 0;
    img {
      height: 100%;
      width: 100%;
      pointer-events: none;
      user-select: none;
      max-width: 320px;
      object-fit: contain;
    }
  }
  .arrowDownContainer{
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    @media (min-width: $tabletWidth) {
      display: none;
    }
    .arrowDown {
      transform: rotate(270deg) !important;
      height: 1.9rem;
      width: 1.3rem;
      margin-bottom: 2rem;
    }
  }
}

</style>
