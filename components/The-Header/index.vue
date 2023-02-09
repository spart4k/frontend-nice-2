<template>
  <!--  , showAnimate && $style.animateContent-->
  <div class="">
    <header>
      <div class="headerAnimation" :class="[$style.header, (showAnimate && $route.name === 'index') && $style.animateContent]">
        <!--:style="{left: sheetWidth ? `calc(50% + ${sheetWidth/2}rem)` : '50%'}"-->
        <nuxt-link
          v-show="$route.name === 'index'"
          class="logo"
          :to="'/'"
          :style="{
            'will-change': 'transform'
          }"
          :class="[
          $style.logo,
          showAnimate && $style.logoVisible,
          sheetWidth === 39 ? $style.paddingLeft : sheetWidth === -39 ? $style.paddingRight: ''
          ]"
          v-on:click.native="scrollTop"
        >
          <n-logo />
        </nuxt-link>
        <nuxt-link
          v-show="$route.name !== 'index'"
          :class="$style.logoSlug"
          :to="'/'"
          :style="{left: sheetWidth ? `calc(50% + ${sheetWidth/2}rem)` : '50%'}"
        >
          <n-logo />
        </nuxt-link>
        <!--    v-if="$route.name !== 'index'"-->
        <n-button
          type-button="transparent"
          class="elementHeader"
          :class="[active && $style.open, $style.deviceMenu, (showAnimate && $route.name === 'index') && $style.showAnimate]"
          @click="openMenu"
        >
          <div :class="$style.deviceMenu__inner">
            <span />
            <span />
            <span />
            <div v-if="!pageLoading" class="animationPlug" :class="$style.plug" />
          </div>
          <div v-if="basketData" :class="$style.basketCount">
            {{ basketData }}
          </div>
        </n-button>
        <div
          :class="[
            $style.headerUser__list,
            active && $style.hideElement,
            (showAnimate && $route.name === 'index') && $style.showAnimate]"
          class="elementHeader"
        >
          <div :class="$style.link" @click="openLive">
            <span v-if="windowWidth > 465" :class="$style.link__text">эфир</span>
            <img src="~/assets/img/domofon.png" alt="" :class="$style.link__icon">
            <!-- <n-icon name="domofon" :class="$style.link__icon" /> -->
          </div>
          <!-- <div class="animationPlug" :class="$style.plug" /> -->
        </div>
      </div>
      <FormAuthSteps v-model="activeAuthSteps" />
    </header>
  </div>
</template>

<script lang="js">
import { computed, ref, useRouter, useRoute, watch, useContext, onMounted } from '@nuxtjs/composition-api'
import { numWord } from '~/helpers/compositions/declination'
export default {
  name: 'TheHeader',

  props: {
    headerItems: {
      type: Array,
      default: () => []
    },
    sheetWidth: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }) {
    const { store } = useContext()
    const menu = ref(null)
    const menuBasket = ref(null)
    const active = ref(false)
    const activeAuthSteps = ref(false)
    const route = useRoute()
    const router = useRouter()
    const liveChat = ref(null)
    const pageLoad = ref(false)
    const isHomePage = computed(() => route.value.name === 'index')
    const basketData = computed(() => store.state.basket.basket.length)
    const pageLoading = computed(() => store.state.content.animationEnd)
    const isAuth = computed(() => store.state.authentication.authorizated)
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const windowWidth = ref(0)
    const basketCount = computed(() => {
      const calcBasketCard = basketData.value?.cards?.reduce((acc, value) => {
        acc += value.pivot.quantity
        return acc
      }, 0)
      return {
        calcBasketCard,
        cardSum: basketData.value?.cards_sum,
        text: numWord(calcBasketCard, ['товар', 'товара', 'товаров'])
      }
    })

    const scrollTop = () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }

    const toggleMenu = () => {
      active.value = false
    }

    const openMenuBasket = () => {
      store.commit('menu/changeShowStateBottomSheetStepper', true)
    }
    // const headerAnimation = document.querySelector('.headerAnimation')

    const openMenu = () => {
      const wrap = document.getElementById('__nuxt')
      if (window.innerWidth <= 768) {
        wrap.classList.add('noScroll')
        document.body.style.overflow = 'hidden'
      }
      // if (document.querySelector('.headerAnimation').classList.contains('pageLoaded') || pageLoading.value) {
        if (store.state.menu.isShowBottomMenu && !store.state.menu.isShowBottomLive) {
          setTimeout(() => {
            store.commit('menu/changeShowStateBottomSheetLive', { value: true })
          }, 100)
          emit('closeState')
          setTimeout(() => {
            store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
          }, 100)
          store.commit('menu/changeShowStateBottomSheetLive', { value: true })
        } else if (!store.state.menu.isShowBottomMenu) {
          store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
          store.commit('menu/changeShowStateBottomSheetLive', { value: true })
        }
      // }
    }

    const openLive = () => {
      const wrap = document.getElementById('__nuxt')
      console.log(wrap)
      if (window.innerWidth <= 768) {
        wrap.classList.add('noScroll')
        document.body.style.overflow = 'hidden'
      }
      // if (document.querySelector('.headerAnimation').classList.contains('pageLoaded') || pageLoading.value) {
        if (store.state.menu.isShowBottomMenu && store.state.menu.isShowBottomLive && pageLoad.value) {
          emit('closeState')
          setTimeout(() => {
            store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
            store.commit('menu/changeKeyMenu', {
              key: 'live-default',
              effect: 'fx-slide-from-right'
            })
          }, 100)
          store.commit('menu/changeShowStateBottomSheetLive', { value: false })
        } else if (!store.state.menu.isShowBottomMenu) {
          store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
          store.commit('menu/changeKeyMenu', {
            key: 'live-default',
            effect: 'fx-slide-from-right'
          })
          store.commit('menu/changeShowStateBottomSheetLive', { value: false })
        }
      // }
    }

    const openProfile = () => {
      if (store.state.authentication.authorizated) {
        router.push({ path: '/profile' })
      } else {
        activeAuthSteps.value = true
      }
    }

    const showLogo = computed(() => store.state.content.showLogo)
    const stateShowLogin = computed(() => {
      return store.state.authentication.showLogin
    })

    const windowWidthCount = () => {
      windowWidth.value = window.innerWidth
    }

    onMounted(() => {
      windowWidthCount()
      window.addEventListener('resize', windowWidthCount)
      pageLoad.value = true
      window.addEventListener('load', () => {
        // pageLoad.value = true
      })
    })

    watch(() => stateShowLogin.value, (newValue) => {
      if (newValue === true) {
        openProfile()
      }
    })

    return {
      openMenu,
      openMenuBasket,
      toggleMenu,
      openProfile,
      openLive,
      menuBasket,
      showAnimate,
      basketData,
      showLogo,
      isHomePage,
      active,
      basketCount,
      activeAuthSteps,
      isAuth,
      stateShowLogin,
      windowWidth,
      menu,
      liveChat,
      windowWidthCount,
      pageLoad,
      pageLoading,
      scrollTop
    }
  }
}
</script>

<style scoped lang="scss" module src="./style.scss"></style>
