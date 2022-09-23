<template>
  <div :class="$style.container">
    <img
      v-show="ready"
      loading="lazy"
      :src="src"
      :class="[$style.img, detailPage && $style.detailPage]"
      :alt="alt"
      @load="onImgLoad"
    >
    <N-Loading v-show="!ready" :class="$style.loading" black />
  </div>
</template>

<script>
import { ref, onMounted } from '@nuxtjs/composition-api'

export default {
  name: 'NLazyLogo',
  props: {
    src: String,
    alt: String,
    detailPage: Boolean
  },
  setup (props) {
    const ready = ref(false)
    const onImgLoad = () => {
      ready.value = true
    }

    onMounted(() => {
      // const image = new Image()
      // image.onload = () => {
      //   console.log('asd')
      //   ready.value = true
      // }
      // image.src = props.src
    })
    return {
      ready,
      onImgLoad
    }
  }
}
</script>

<style scoped module>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 10px;
  /* object-fit: contain; */
}
.detailPage {
  object-fit: contain;
}
.loading {
  width: 4rem;
  height: 4rem;
  display: block;
}
</style>
