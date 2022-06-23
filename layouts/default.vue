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

      headerItems.value = response.data
      store.commit('content/changeSections', response.data)
    })
    watch(() => route.value.path, () => {
      body.value.scroll(0, 0)
    })

    onMounted(() => {
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
  height: calc(100% - var(--header-height));
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
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
