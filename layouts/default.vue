<template>
  <div>
    <the-header :header-items="headerItems" />
    <Nuxt />
    <the-footer />
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted } from '@nuxtjs/composition-api'

export default {
  name: 'DefaultLayout',
  setup () {
    const headerItems = ref([])
    const { $axios, store } = useContext()
    useFetch(async () => {
      headerItems.value = []
      const response = await $axios('api/v1/sections')
      headerItems.value = response.data
      store.commit('content/changeSections', response.data)
    })
    onMounted(() => {
      console.log('unmounted')
      store.commit('auth/setUserData')
      store.commit('auth/setToken')
    })

    return {
      headerItems
    }
  }
}
</script>

<style scoped module lang="scss">
.main {

}
</style>
