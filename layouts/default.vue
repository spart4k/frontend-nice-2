<template>
  <div ref="body" class="body">
    <div :class="$style.headerContainer" :style="{ marginLeft: sheetWidth && !sheetRight ? '39rem' : '0', marginRight: sheetWidth && sheetRight ? '39rem' : '0' }">
      <the-header
        :header-items="headerItems"
        :class="$style.header"
        :sheet-width="sheetWidth"
        class="header"
        @closeState="closeState"
      />
    </div>

    <n-intro-wrapper
      :class="$style.main"
      :is-home-page="isHomePage"
      :style="{ marginLeft: sheetWidth && !sheetRight ? '39rem' : '0', marginRight: sheetWidth && sheetRight ? '39rem' : '0' }"
      :color="color"
      @backgroundLoaded="backgroundLoaded"
    >
      <n-tabs
        v-if="$route.name !== 'cards-id' && headerHidden"
        class="navbarSlug"
        :class="[
          $style.tabs,
          showAnimate && $style.animateContent,
          !isHomePage ? $style.noHome : ''
        ]"
      />
        <N-Preloader v-if="!contentLoader" />
        <Nuxt :class="[!contentLoader && $style.disabled]" />
    </n-intro-wrapper>
    <N-BootomSheet
      v-if="$store.state.menu.isShowBottomMenu && bottomSheetDelay && !disabledSheet"
      ref="menu"
      :effect="currentShowComponents.effect"
      max-width="39rem"
      :max-height="'100%'"
      :fullscreen="true"
      :is-show-button-back="step > 0 && step !== 3"
      @closeMenu="closeState"
      @closed="changeState"
      @back="changeStep"
    >
      <stepperOrder
        ref="stepper"
        :header-items="headerItems"
        :key-animation="keyAnimation"
        :step="step"
        :curr-comp="currentShowComponents.key"
        @clearStep="step = 0"
        @changeComp="changeComp"
        @changeStep="changeStep"
        @closeState="closeState"
        @playAudio="playAudio"
        @pauseAudio="pauseAudio"
        @destroyTag="destroyTag"
      />
    </N-BootomSheet>
    <N-BootomSheet
      v-if="$store.state.menu.isShowBottomMenu && bottomSheetDelay && disabledSheet"
      ref="menu1"
      :effect="currentShowComponents.effect"
      max-width="39rem"
      :max-height="'100%'"
      :fullscreen="true"
      :is-show-button-back="step > 0 && step !== 3"
      @closeMenu="closeState"
      @closed="changeState"
      @back="changeStep"
    >
      <stepperOrder
        ref="stepper1"
        :header-items="headerItems"
        :key-animation="keyAnimation"
        :step="step"
        :curr-comp="currentShowComponents.key"
        @clearStep="step = 0"
        @changeComp="changeComp"
        @changeStep="changeStep"
        @closeState="closeState"
        @playAudio="playAudio"
        @pauseAudio="pauseAudio"
        @destroyTag="destroyTag"
      />
    </N-BootomSheet>
    <portal-target name="sliderPopup" />
    <audio v-if="audioDelay && audioDestroy" ref="audioSource" :src="`${$axios.defaults.baseURL}/stream`" />
    <!-- <N-Websocket v-if="websocketDelay" :message="mes" /> -->
  </div>
</template>

<script>
import { ref, useContext, useFetch, onMounted, computed, watch, provide, nextTick } from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import animationGSAP from '~/helpers/compositions/animationGSAP'
import { BLAND_COLOR } from '~/const/blandColor'

export default {
  name: 'DefaultLayout',
  head () {
    return {
      meta: [
        { name: 'theme-color', content: this.color },
        { name: 'apple-mobile-web-app-status-bar-style', content: this.color }
      ]
    }
  },
  setup (props, {root}) {
    const headerItems = ref([])
    const body = ref(null)
    const menu = ref(null)
    const menu1 = ref(null)
    const stepper = ref(null)
    const back = ref(false)
    const sheetWidth = ref(0)
    const disabledSheet = ref(false)
    const contentLoader = computed(() => store?.state?.content?.contentLoader)
    const sheetRight = ref(false)
    const keyAnimation = ref('next')
    const currentShowComponents = ref({
      key: '',
      effect: 'fx-slide-from-left'
    })
    const step = ref(0)
    const isLoaded = ref(false)
    const menuBasket = ref(null)
    const menuLive = ref(null)
    const { store, route, $gsap } = useContext()
    const headerHidden = computed(() => store.state.content.headerHidden)
    const isHomePage = computed(() => route.value.name === 'index')
    const audioSource = ref(null)
    const audioDelay = ref(false)
    const audioDestroy = ref(false)
    const bottomSheetDelay = ref(false)

    const backgroundLoaded = () => {
      isLoaded.value = true
    }

    const playAudio = () => {
      audioDestroy.value = true
      nextTick(() => {
        audioSource.value.play()
      })
    }

    const pauseAudio = () => {
      audioSource.value.pause()
      audioDestroy.value = false
    }

    const destroyTag = () => {
      pauseAudio()
      setTimeout(() => {
        playAudio()
      }, 50)
    }

    const changeComp = (value) => {
      currentShowComponents.value.key = value.key
      currentShowComponents.value.effect = value.effect
      store.commit('menu/changeKeyMenu', { key: value.key, effect: value.effect })
    }

    const fetchData = async () => {
      const params = {
        page: 1,
        count: 11
      }
      const response = await store.dispatch('content/getHeader', params)
      return response
    }
    const closedSwipe = () => {
      store.commit('menu/changeShowStateBottomSheetStepper', false)
    }

    useFetch(async () => {
      headerItems.value = []
      const response = await fetchData()
      if (response.data.length) {
        headerItems.value = response.data.filter((item) => {
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

    const changeState = () => {
      sheetWidth.value = 0
      setTimeout(() => {
        sheetRight.value = false
        store.commit('menu/changeShowStateBottomSheetMenu', { value: false })
        // store.commit('menu/changeShowStateBottomSheetLive', { value: false })
        store.commit('menu/changeStepMenu', { step: 0 })
      }, 100)
    }

    const closeState = () => {
      if (menu.value) {
        menu.value.$children[0].close()
      } else {
        menu1.value.$children[0].close()
      }
    }

    const {
      animateBackground
    } = animationGSAP($gsap, Elastic)

    const color = computed(() => {
      const paramsColor = BLAND_COLOR[route.value.params?.slug] || BLAND_COLOR[route.value.name] || BLAND_COLOR[route.value.query.section] || BLAND_COLOR[route.value.path]
      if (paramsColor) {
        return paramsColor
      } else {
        return '#292BC2'
      }
    })

    const openMenu = () => {
      if (menu.value) {
        setTimeout(() => {
          menu.value.$children[0].open()
          if (window.innerWidth > 450) {
            sheetWidth.value = 39
            if (sheetRight.value) {
              sheetWidth.value = -sheetWidth.value
            }
          }
        }, 100)
      } else {
        disabledSheet.value = true
        setTimeout(() => {
          menu1.value.$children[0].open()
          if (window.innerWidth > 450) {
            sheetWidth.value = 39
            if (sheetRight.value) {
              sheetWidth.value = -sheetWidth.value
            }
          }
        }, 100)
      }
    }
    const closeMenu = () => {
      if (window.innerWidth <= 768) {
        document.documentElement.style.overflow = 'auto'
      }
      sheetWidth.value = 0
      store.commit('menu/changeKeyMenu', { key: '', effect: 'fx-slide-from-left' })
      store.commit('menu/changeStepMenu', { step: 0 })
      step.value = 0
    }
    watch(() => store.state.menu.stepCurrentComponent, () => {
      step.value = store.state.menu.stepCurrentComponent
      if (store.state.menu.stepCurrentComponent === 0) {
        store.commit('menu/changeKeyMenu', { key: '', effect: 'fx-slide-from-left' })
      }
    })
    watch(() => route.value.path, () => {
      store.commit('content/changeContentLoader', false)
    })
    watch(() => store.state.menu.component.key, () => {
      currentShowComponents.value.key = store.state.menu.component.key
      currentShowComponents.value.effect = store.state.menu.component.effect
    })
    watch(() => store.state.menu.isShowBottomMenu, () => {
      if (store.state.menu.isShowBottomMenu) {
        if (store.state.menu.component) {
          currentShowComponents.value.key = store.state.menu.component.key
          currentShowComponents.value.effect = store.state.menu.component.effect
          if (currentShowComponents.value.effect === 'fx-slide-from-right') {
            sheetRight.value = true
          }
        }
        // if (store.state.menu.stepCurrentComponent) {
        //   step.value = store.state.menu.stepCurrentComponent
        // }
        setTimeout(() => {
          openMenu()
        }, 100)
      } else {
        closeMenu()
      }
    })

    watch(() => step.value, () => {
      if (step.value === 0) {
        currentShowComponents.value.key = ''
      }
    })

    // watch(() => route.value.name, () => {
    //   store.commit('content/setHeaderHidden', false)
    // })

    const changeStep = (value) => {
      if (value === 'increment') {
        keyAnimation.value = 'next'
        step.value += 1
        store.commit('menu/changeStepMenu', { step: step.value })
      } else {
        keyAnimation.value = 'prev'
        step.value -= 1
        store.commit('menu/changeStepMenu', { step: step.value })
      }
    }

    const getVerify = async () => {
      await store.commit('authentication/setToken')
      const response = await store.dispatch('authentication/verifyToken')
      if (response.error) {
        localStorage.removeItem('token')
      } else {
        store.dispatch('basket/getBasket')
        store.commit('authentication/setUserData')
      }
    }
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)

    onMounted(() => {
      localStorage.setItem('lastCards', {})
      setTimeout(() => {
        audioDelay.value = true
      }, 500)
      if (localStorage.getItem('token') !== null) {
        getVerify()
      }
      animateBackground()
      window.addEventListener('load', () => {
        bottomSheetDelay.value = true
      })
    })
    provide('backgroundLoaded', isLoaded)
    provide('sheetWidth', sheetWidth)
    return {
      headerItems,
      body,
      color,
      introTitle,
      isHomePage,
      menuBasket,
      menu,
      stepper,
      menuLive,
      back,
      step,
      keyAnimation,
      changeComp,
      changeStep,
      sheetWidth,
      sheetRight,
      openMenu,
      currentShowComponents,
      closeMenu,
      closedSwipe,
      changeState,
      closeState,
      backgroundLoaded,
      isLoaded,
      playAudio,
      destroyTag,
      pauseAudio,
      audioSource,
      audioDelay,
      audioDestroy,
      showAnimate,
      headerHidden,
      bottomSheetDelay,
      menu1,
      contentLoader,
      disabledSheet
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
.main {
  transition-duration: .3s;
}
.disabled {
  opacity: 0;
}
.headerContainer {
  top: 3.9rem;
  left: 4rem;
  right: 4rem;
  position: fixed;
  z-index: 11;
  transition-duration: .3s;
  @media (max-width: $mobileWidth) {
    top: 2.6rem;
    left: 1.5rem;
    right: 1.5rem;
  }
}
.header {
  margin: auto;
  transition-duration: .3s;
}
.tabs {
  position: relative;
  margin: 17rem 0 5.815rem 0;
  z-index: 10;
  width: 100%;
  transition: opacity 0.3s;
  will-change: transform;
  @media (max-width: $mobileWidth) {
    margin: 23.6rem 0 5.815rem 0;
    // margin: 22rem 0 5.815rem 0;
    // display: none;
  }
  @media (max-width: $mobileWidth) {
    &.noHome {
      display: none;
    }
  }
}
</style>
