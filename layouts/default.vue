<template>
  <div :class="$style.wrapper" class="body">
    <the-header :header-items="headerItems" class="header" />
    <Nuxt />
    <the-footer />
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted } from '@nuxtjs/composition-api'

export default {
  name: 'DefaultLayout',
  transition: 'home',
  setup () {
    const headerItems = ref([])
    const { $axios, store } = useContext()

    const setCssVarriable = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
    }

    useFetch(async () => {
      headerItems.value = []
      const response = await $axios('api/v1/sections')
      headerItems.value = response.data
      store.commit('content/changeSections', response.data)
    })

    onMounted(() => {
      setCssVarriable()
    })

    return {
      headerItems
    }
  }
}
</script>

<style scoped module lang="scss">
.wrapper {
  margin-top: var(--header-height);
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100) - var(--header-height));
  overflow: auto;
}
</style>
