<template>
  <div ref="body" class="body">
    <the-header :header-items="headerItems" class="header" />

    <n-intro-wrapper :is-home-page="isHomePage" :color="color">
      <Nuxt />
    </n-intro-wrapper>
    <portal-target name="sliderPopup" />
    <N-BootomSheet
      ref="menuBasket"
      effect="fx-slide-from-left"
      max-width="39rem"
      :max-height="'100%'"
      :fullscreen="true"
      @closeMenu="closedMenuBasket"
      @closed="closedSwipe"
    >
      <StepperOrder />
    </N-BootomSheet>
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted, computed, watch } from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import animationGSAP from '~/helpers/compositions/animationGSAP'
import { BLAND_COLOR } from '~/const/blandColor'

export default {
  name: 'DefaultLayout',
  setup () {
    const headerItems = ref([])
    const body = ref(null)
    const menuBasket = ref(null)
    const { store, route, $gsap } = useContext()
    const isHomePage = computed(() => route.value.name === 'index')

    const fetchData = async () => {
      const response = await store.dispatch('content/getHeader')
      return response
    }
    const closedSwipe = () => {
      store.commit('stepperOrder/changeShowStateBottomSheet', false)
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

    const color = computed(() => {
      const paramsColor = BLAND_COLOR[route.value.params?.slug] || BLAND_COLOR[route.value.name] || BLAND_COLOR[route.value.query.section]
      if (paramsColor) {
        return paramsColor
      } else {
        return ''
      }
    })
    watch(() => store.state.stepperOrder.isShowBottomSheet, () => {
      if (store.state.stepperOrder.isShowBottomSheet) {
        openMenuBasket()
      } else {
        closedMenuBasket()
      }
    })

    const closedMenuBasket = () => {
      menuBasket.value.$children[0].close()
      store.commit('stepperOrder/changeShowStateBottomSheet', false)
    }

    const openMenuBasket = () => {
      menuBasket.value.$children[0].open()
    }

    onMounted(() => {
      store.commit('authentication/setUserData')
      store.commit('authentication/setToken')
      store.dispatch('basket/getBasket')
      animateBackground()
    })

    return {
      headerItems,
      body,
      color,
      introTitle,
      isHomePage,
      menuBasket,
      closedMenuBasket,
      openMenuBasket,
      closedSwipe
    }
  }
}
</script>
