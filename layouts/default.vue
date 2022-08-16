<template>
  <div ref="body" class="body">
    <the-header :header-items="headerItems" class="header" />

    <n-intro-wrapper :is-home-page="isHomePage" :color="color">
      <Nuxt />
    </n-intro-wrapper>
    <N-BootomSheet
      v-if="$store.state.menu.isShowBottomMenu"
      ref="menu"
      :effect="currentShowComponents.effect"
      max-width="39rem"
      :max-height="'100%'"
      :fullscreen="true"
      :is-show-button-back="step > 0"
      @closeMenu="changeState(false, 'menu')"
      @closed="changeState(false, 'menu')"
      @back="changeStep"
    >
      <stepperOrder
        :header-items="headerItems"
        :key-animation="keyAnimation"
        :step="step"
        :curr-comp="currentShowComponents.key"
        @clearStep="step = 0"
        @changeComp="currentShowComponents.key = $event"
        @changeStep="changeStep"
      />
    </N-BootomSheet>

    <portal-target name="sliderPopup" />
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted, computed, watch, nextTick } from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import animationGSAP from '~/helpers/compositions/animationGSAP'
import { BLAND_COLOR } from '~/const/blandColor'

export default {
  name: 'DefaultLayout',
  setup () {
    const headerItems = ref([])
    const body = ref(null)
    const menu = ref(null)
    const back = ref(false)
    const keyAnimation = ref('next')
    const currentShowComponents = ref('')
    const step = ref(0)
    const menuBasket = ref(null)
    const menuLive = ref(null)
    const { store, route, $gsap } = useContext()
    const isHomePage = computed(() => route.value.name === 'index')

    const fetchData = async () => {
      const response = await store.dispatch('content/getHeader')
      return response
    }
    const closedSwipe = () => {
      store.commit('menu/changeShowStateBottomSheetStepper', false)
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

    const changeState = (value) => {
      console.log(value)
      store.commit('menu/changeShowStateBottomSheetMenu', { value })
      store.commit('menu/changeStepMenu', { step: 0 })
      store.commit('menu/changeKeyMenu', { key: '', effect: '' })
    }

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

   const openMenu = () => {
   nextTick(() => {
    menu.value.$children[0].open()
   })
    }
    const closeMenu = () => {
      store.commit('menu/changeKeyMenu', { key: '', effect: 'fx-slide-from-left' })
      store.commit('menu/changeStepMenu', { step: 0 })
      step.value = 0
    }
    watch(() => store.state.menu.isShowBottomMenu, () => {
      if (store.state.menu.isShowBottomMenu) {
      if (store.state.menu.component) {
        console.log('store')
        currentShowComponents.value = store.state.menu.component
      }
      if (store.state.menu.stepCurrentComponent) {
        step.value = store.state.menu.stepCurrentComponent
      }
        openMenu()
      } else {
        closeMenu()
      }
    })

     watch(() => step.value, () => {
      if (step.value === 0) {
        currentShowComponents.value = ''
      }
    })

    const changeStep = (value) => {
      if (value === 'increment') {
        keyAnimation.value = 'next'
        step.value += 1
      } else {
        keyAnimation.value = 'prev'
        step.value -= 1
      }
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
      menu,
      menuLive,
      back,
      step,
      keyAnimation,

      changeStep,
      openMenu,
      currentShowComponents,
      closeMenu,
      closedSwipe,
      changeState
    }
  }
}
</script>
<style lang="scss" module>
.container {
  padding-top: 3rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 1rem;
  transform: translate3d(0, 0, 0);
  color: $fontColorDefault;
}
</style>
