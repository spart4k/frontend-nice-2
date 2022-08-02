<template>
  <div ref="body" class="body">
    <the-header :header-items="headerItems" class="header" />
    <Nuxt />
    <portal-target name="sliderPopup" />
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted } from '@nuxtjs/composition-api'

export default {
  name: 'DefaultLayout',
  setup () {
    const headerItems = ref([])
    const body = ref(null)
    const { $axios, store } = useContext()

    const fetchData = async () => {
      const response = await $axios('api/v1/sections')
      return response
    }

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
