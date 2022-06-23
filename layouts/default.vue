<template>
  <div ref="body" :class="$style.wrapper" class="body">
    <the-header :header-items="headerItems" class="header" :class="$style.header" />
    <Nuxt :class="$style.content" />
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted, watch } from '@nuxtjs/composition-api'

export default {
  name: 'DefaultLayout',
  setup () {
    const headerItems = ref([])
    const body = ref(null)
    const { $axios, store, route } = useContext()

    const fetchData = async () => {
      const response = await $axios('api/v1/sections')
      return response
    }

    // store.dispatch('basket/getBasket')
    useFetch(async () => {
      headerItems.value = []
      const response = await fetchData()
      if (response.data.length) {
        headerItems.value = response.data.filter((item) => {
          return item.slug !== 'efir'
        })
      }
      // headerItems.value = response.data
      store.commit('content/changeSections', response.data)
    })
    watch(() => route.value.path, () => {
      body.value.scroll(0, 0)
    })

    onMounted(() => {
      const vh = window.innerHeight * 0.01
// Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      window.addEventListener('resize', () => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
      store.commit('authentication/setUserData')
      store.commit('authentication/setToken')
      store.dispatch('basket/getBasket')
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
  //min-height: -webkit-fill-available;
  width: 100%;
  height: calc(100% - var(--header-height));
  height: calc(var(--vh, 1vh) * 100 - var(--header-height));
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
}
</style>
