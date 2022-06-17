<template>
  <img
    v-if="ready"
    :class="$style.img"
    :src="src"
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
  setup (props, { emit }) {
    const ready = ref(false)
    onMounted(() => {
      const image = new Image()
      image.onload = () => {
        ready.value = true
        emit('resize')
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
  object-fit: cover;
  object-position: center;
}
</style>
