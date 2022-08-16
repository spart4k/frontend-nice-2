<template>
  <div :class="$style.container">
    <h1 :class="[$style.title]">
      {{ description.title }}
    </h1>
    <div>
      <N-Icon :class="$style.quote" name="quote" />
      <h2 :class="$style.subtitle">
        Читая, вы проживаете несколько жизней.
      </h2>
      <h3 :class="$style.author">
        – Уильям Стайрон
      </h3>
      <div :class="$style.image">
        <img :src="imageModule" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
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
    const imageModule = computed(() => {
      if (BLAND_IMAGE[props.image]) {
        return require(`~/assets/img/preview/${BLAND_IMAGE[props.image]}`)
      }
      return ''
    })

    return {
      imageModule,
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
  justify-content: center;
  height: 100%;
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
    width: 32.5rem;
    height: 32.5rem;
    overflow: hidden;
    margin: 1.7rem auto 0;
    img {
      height: 100%;
      width: 100%;
      pointer-events: none;
      user-select: none;
    }
  }
}

</style>
