<template>
  <div ref="body" class="body">
    <the-header :header-items="headerItems" class="header" />

    <n-intro-wrapper :is-home-page="isHomePage" :color="color">
      <Nuxt />
    </n-intro-wrapper>
    <N-BootomSheet
      ref="menu1"
      effect="fx-slide-from-left"
      max-width="39rem"
      :max-height="$mq === 'md' ? '100%' : ''"
      @test="test"
      @closeMenu="closed"
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam at beatae ea eaque eius illum ipsa nihil praesentium saepe? Dignissimos laboriosam nam neque quod quos reprehenderit sit, suscipit? Porro!
    </N-BootomSheet>
    <portal-target name="sliderPopup" />
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
    const menu1 = ref(null)
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

    const color = computed(() => {
      const paramsColor = BLAND_COLOR[route.value.params?.slug] || BLAND_COLOR[route.value.name] || BLAND_COLOR[route.value.query.section]
      if (paramsColor) {
        return paramsColor
      } else {
        return ''
      }
    })

    const closed = () => {
      menu1.value.$children[0].close()
    }
    const test = () => {
      store.commit('stepperOrder/changeShowStateBottomSheet', false)
    }

    watch(() => store.state.stepperOrder.isShowBottomSheet, () => {
      if (store.state.stepperOrder.isShowBottomSheet) {
        menu1.value.$children[0].open()
      }
    })

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
      menu1,

      closed,
      test
    }
  }
}
</script>
