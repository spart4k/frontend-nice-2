<template>
  <img
    v-if="ready"
    loading="lazy"
    :src="src"
    :class="[$style.img, detailPage && $style.detailPage]"
    :alt="alt"
  >
  <N-Loader v-else img />
</template>

<script>
import { ref, onMounted } from '@nuxtjs/composition-api'

export default {
  name: 'RImg',
  props: {
    src: String,
    alt: String,
    detailPage: Boolean
  },
  setup (props) {
    const ready = ref(true)

    onMounted(() => {
      const image = new Image()
      image.onload = () => {
        ready.value = true
      }
      image.src = props.src
    })
    return {
      ready
    }
  }
}
</script>

<style scoped module>
.img {
  width: 100%;
  height: 100%;
  display: block;
  /* object-fit: contain; */
}
.detailPage {
  object-fit: contain;
}
</style>
