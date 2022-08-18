<template>
  <img
    v-if="ready"
    loading="lazy"
    :src="src"
    :class="$style.img"
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
    alt: String
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
  height: auto;
  display: block;
}
</style>
