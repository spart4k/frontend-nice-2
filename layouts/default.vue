<template>
  <div ref="body" class="body">
    <the-header :header-items="headerItems" class="header" />

    <n-intro-wrapper :is-home-page="isHomePage" :color="color">
      <Nuxt />
    </n-intro-wrapper>
    <N-BootomSheet
      ref="menu"
      effect="fx-slide-from-left"
      max-width="39rem"
      :max-height="'100%'"
      :fullscreen="true"
      @closeMenu="changeState(false, 'menu')"
      @closed="changeState(false, 'menu')"
    >
      <nav :class="$style.headerNav">
        <menuUserTop
          @openMenuBasket="changeState(true, 'basket')"
        />
        <n-nav-menu
          :header-items="headerItems"
        />
      </nav>
    </N-BootomSheet>
    <N-BootomSheet
      ref="menuBasket"
      effect="fx-slide-from-left"
      max-width="39rem"
      :max-height="'100%'"
      :fullscreen="true"
      @closeMenu="changeState(false, 'basket')"
      @closed="changeState(false, 'basket')"
    >
      <StepperOrder />
    </N-BootomSheet>
    <N-BootomSheet
      ref="menuLive"
      effect="fx-slide-from-left"
      max-width="39rem"
      :max-height="'100%'"
      :fullscreen="true"
      @closeMenu="changeState(false, 'live')"
      @closed="changeState(false, 'live')"
    >
      <live-default />
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
    const menu = ref(null)

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

    const changeState = (value, key) => {
      if (key === 'basket') {
        store.commit('menu/changeShowStateBottomSheetStepper', value)
      } else if (key === 'menu') {
        store.commit('menu/changeShowStateBottomSheetMenu', value)
      } else if (key === 'live') {
        store.commit('menu/changeShowStateBottomSheetLive', value)
      }
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

    watch(() => store.state.menu.isShowBottomSheetStepper, () => {
      if (store.state.menu.isShowBottomSheetStepper) {
        openMenuBasket()
      } else {
        closedMenuBasket()
      }
    })

    watch(() => store.state.menu.isShowBottomMenu, () => {
      if (store.state.menu.isShowBottomMenu) {
        openMenu()
      } else {
        closeMenu()
      }
    })

    watch(() => store.state.menu.isShowBottomLive, () => {
      if (store.state.menu.isShowBottomLive) {
        openMenuLive()
      } else {
        closeMenuLive()
      }
    })

    const openMenuBasket = () => {
      menuBasket.value.$children[0].open()
    }
    const closedMenuBasket = () => {
      menuBasket.value.$children[0].close()
    }
    const openMenu = () => {
      menu.value.$children[0].open()
    }
    const closeMenu = () => {
      menu.value.$children[0].close()
    }
    const openMenuLive = () => {
      menuLive.value.$children[0].open()
    }
    const closeMenuLive = () => {
      menuLive.value.$children[0].close()
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
      openMenu,
      closeMenu,
      closedMenuBasket,
      openMenuBasket,
      closedSwipe,
      changeState
    }
  }
}
</script>
<style lang="scss" module>
.headerNav {
  display: block;
  padding-top: 4.9rem;
  backface-visibility: hidden;
  max-height: 100%;
  overflow: auto;
  @include container;
}

</style>
