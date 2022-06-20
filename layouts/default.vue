<template>
  <div ref="body" :class="$style.wrapper" class="body">
    <the-header :header-items="headerItems" class="header" :class="$style.header" />
    <Nuxt :class="$style.content" />
    <the-footer :class="$style.footer" />
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted, watch } from '@nuxtjs/composition-api'

export default {
  name: 'DefaultLayout',
  // transition: 'home',
  setup () {
    const headerItems = ref([])
    const body = ref(null)
    const { $axios, store, route } = useContext()

    const setCssVarriable = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
    }

    store.dispatch('basket/getBasket')

    useFetch(async () => {
      headerItems.value = []
      const response = await $axios('api/v1/sections')

      headerItems.value = response.data
      store.commit('content/changeSections', response.data)
    })
    watch(() => route.value.path, () => {
      body.value.scroll(0, 0)
    })

    onMounted(() => {
      setCssVarriable()
    })

    onMounted(() => {
      console.log('unmounted')
      store.commit('auth/setUserData')
      store.commit('auth/setToken')
    })

    return {
      headerItems,
      body
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
  display: flex;
  flex-direction: column;
}
.header {
  flex: 0 0 auto;
}
.content {
  flex: 1 0 auto;
}
.footer {
  flex: 0 0 auto;
}
</style>
