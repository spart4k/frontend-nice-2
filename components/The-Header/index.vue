<template>
  <!--  , showAnimate && $style.animateContent-->
  <header :class="[$style.header, (showAnimate && $route.name === 'index') && $style.animateContent]">
    <div
      v-show="$route.name === 'index'"
      class="logo"
      :class="$style.logo"
      :style="{left: sheetWidth ? `calc(50% + ${sheetWidth/2}px)` : '50%'}"
      @click="$router.push('/')"
    >
      <n-logo />
    </div>
    <div
      v-show="$route.name !== 'index'"
      :class="$style.logoSlug"
      :style="{left: sheetWidth ? `calc(50% + ${sheetWidth/2}px)` : '50%'}"
      @click="$router.push('/')"
    >
      <n-logo />
    </div>
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
      </div>
      <div v-if="!active && isAuth && basketCount.calcBasketCard > 0" :class="$style.basketCount">
        {{ basketCount.calcBasketCard }}
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
        <span :class="$style.link__text">эфир</span>
        <n-icon name="domofon" :class="$style.link__icon" />
      </div>
    </div>
    <FormAuthSteps v-model="activeAuthSteps" />
  </header>
</template>

<script lang="js">
import { computed, ref, useRouter, useRoute, watch, useContext } from '@nuxtjs/composition-api'
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
    const header = ref(null)
    const liveChat = ref(null)
    const isHomePage = computed(() => route.value.name === 'index')
    const basketData = computed(() => store.state.basket.basket?.data)
    const isAuth = computed(() => store.state.authentication.authorizated)
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
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

    const toggleMenu = () => {
      active.value = false
    }

    const openMenuBasket = () => {
      store.commit('menu/changeShowStateBottomSheetStepper', true)
    }

    const openMenu = () => {
      if (store.state.menu.isShowBottomMenu) {
        emit('closeState')
        setTimeout(() => {
          store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
        }, 100)
      } else {
        store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
      }
    }

    const openLive = () => {
      if (store.state.menu.isShowBottomMenu) {
        emit('closeState')
        setTimeout(() => {
          store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
          store.commit('menu/changeKeyMenu', {
            key: 'live-default',
            effect: 'fx-slide-from-right'
          })
        }, 100)
      } else {
        store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
        store.commit('menu/changeKeyMenu', {
          key: 'live-default',
          effect: 'fx-slide-from-right'
        })
      }
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
      header,
      basketCount,
      activeAuthSteps,
      isAuth,
      stateShowLogin,
      menu,
      liveChat

    }
  }
}
</script>

<style scoped lang="scss" module src="./style.scss"></style>
