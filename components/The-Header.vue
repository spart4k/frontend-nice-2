<template>
  <!--  , showAnimate && $style.animateContent-->
  <header :class="[$style.header]">
    <n-button
      type-button="transparent"
      :class="[active && $style.open, $style.deviceMenu]"
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

    <N-BootomSheet
      ref="menu"
      effect="fx-slide-from-left"
      max-width="39rem"
      :max-height="$mq === 'md' ? '100%' : ''"
      @closeMenu="closeMenu"
    >
      <nav :class="$style.headerNav">
        <ul :class="$style.user_list">
          <li :class="$style.user_item">
            <n-icon name="user" :class="$style.icon" />
            <div :class="$style.user_item_text">
              <nuxt-link to="#">
                Профиль
              </nuxt-link>
            </div>
          </li>
          <li :class="$style.user_item">
            <n-icon name="basket" :class="$style.icon" />
            <div :class="$style.user_item_text">
              <nuxt-link to="#">
                Корзина
              </nuxt-link>
            </div>
          </li>
          <li :class="$style.user_item">
            <n-icon name="search" :class="$style.icon" />
            <div :class="$style.user_item_text">
              <nuxt-link to="#">
                Поиск
              </nuxt-link>
            </div>
          </li>
        </ul>
        <n-nav-menu
          :header-items="headerItems"
          @hideNavMenu=" active = false"
        />
      </nav>
    </N-BootomSheet>

    <div :class="[$style.logo]" @click="$router.push('/')">
      <n-logo v-if="!isHomePage" size="md" />
    </div>

    <ul :class="[$style.headerUser__list, active && $style.hideElement]">
      <li>
        <a href="mailto:tisthenice@gmail.com" :class="$style.link">
          <span :class="$style.link__text">эфир</span>
          <n-icon name="domofon" :class="$style.link__icon" />
        </a>
      </li>
    </ul>
    <FormAuthSteps v-model="activeAuthSteps" />
  </header>
</template>

<script lang="js">
import { computed, ref, useRouter, useRoute, watch, useContext } from '@nuxtjs/composition-api'
import { numWord } from '~/helpers/compositions/declination'
import { BLAND_COLOR } from '~/const/blandColor'
const COLORS = ['#489430', '#00B4B5', '#FF4F00', '#ded037']
export default {
  name: 'TheHeader',
  props: {
    headerItems: {
      type: Array,
      default: () => []
    }
  },
  setup (_, ctx) {
    const { store } = useContext()
    const menu = ref(null)
    const active = ref(false)
    const activeAuthSteps = ref(false)
    const route = useRoute()
    const router = useRouter()
    const header = ref(null)
    const isHomePage = computed(() => route.value.name === 'index')
    const bgName = computed(() => store.state.content.bgIntro)
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

    const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

    const toggleMenu = () => {
      active.value = false
    }

    const openMenu = () => {
     menu.value.$children[0].open()
    }
    const closeMenu = () => {
      menu.value.$children[0].close()
    }

    const openTestPage = (num) => {
      router.push({ path: `${num}` })
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
      closeMenu,
      toggleMenu,
      openTestPage,
      openProfile,
      randomColor,
      BLAND_COLOR,
      showAnimate,
      basketData,
      showLogo,
      isHomePage,
      active,
      header,
      bgName,
      basketCount,
      activeAuthSteps,
      isAuth,
      stateShowLogin,
      menu
    }
  }
}
</script>

<style scoped lang="scss" module src="./header.scss">
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

</style>
