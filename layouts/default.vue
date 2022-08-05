<template>
  <div ref="body" class="body">
    <the-header :header-items="headerItems" class="header" />

    <n-intro-wrapper>
      <Nuxt />
    </n-intro-wrapper>
    <portal-target name="sliderPopup" />
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted, computed } from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import animationGSAP from '~/helpers/compositions/animationGSAP'

export default {
  name: 'DefaultLayout',
  setup () {
    const headerItems = ref([])
    const body = ref(null)
    const { store, route, $gsap } = useContext()
    const isHomePage = computed(() => route.value.name === 'index')

    const fetchData = async () => {
      const response = await store.dispatch('content/getHeader')
      return response
    }

    useFetch(async () => {
      headerItems.value = []
      const response = await fetchData()
      if (response.length) {
        headerItems.value = response.filter((item) => {
          return item.slug !== 'efir'
        })
      }
      store.commit('content/changeSections', response)
    })

    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
    })
    const {
      animateBackground
    } = animationGSAP($gsap, Elastic)

    onMounted(() => {
      store.commit('authentication/setUserData')
      store.commit('authentication/setToken')
      store.dispatch('basket/getBasket')
      animateBackground()
    })

    return {
      headerItems,
      body,
      introTitle,
      isHomePage
    }
  }
}
</script>
