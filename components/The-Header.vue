<template>
  <header :class="$style.header">
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
    <transition name="fade-fast">
      <nav v-if="active" :class="[$style.headerNav, active && $style.active]">
        <div :class="[$style.linkHome]" @click="active = false">
          <transition name="fade-fast">
            <nuxt-link v-if="!isHomePage" :to="{ path: '/' }">
              <n-icon name="arrow" :class="$style.icon" />
              <span>На главную</span>
            </nuxt-link>
          </transition>
        </div>

        <transition
          appear
          v-bind="$attrs"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div
            v-if="isAuth && basketCount.calcBasketCard > 0 && active"
            :class="[$style.basket, $style.headerMenu__item]"
            @click="active = false"
          >
            <nuxt-link to="/basket">
              <div :class="$style.basket__title">
                <n-icon name="basket" :class="$style.icon" />
                <span>Корзина</span>
              </div>
              <div :class="$style.basket__price">
                {{ basketCount.calcBasketCard }} {{ basketCount.text }} на {{ basketCount.cardSum }}р
              </div>
            </nuxt-link>
          </div>
        </transition>

        <div :class="$style.headerNav__inner">
          <n-nav-menu :show-nav-menu="active" :header-items="headerItems" :class="$style.headerMenu__list" @hideNavMenu=" active = false" />
        </div>
      </nav>
    </transition>

    <transition name="fade-fast">
      <nuxt-link
        v-if="isHomePage ? showLogo : true"
        to="/"
        :class="[$style.logo, active && $style.hideElement]"
      >
        <div>творческое объединение</div>
        <n-logo size="lg" />
      </nuxt-link>
    </transition>

    <ul :class="[$style.headerUser__list, active && $style.hideElement]">
      <!--      :class="$style.headerUser__item"-->
      <li>
        <a href="mailto:tisthenice@gmail.com" :class="$style.link">
          <span :class="$style.link__text">эфир</span>
          <n-icon name="domofon" :class="$style.link__icon" />
        </a>
      </li>
    </ul>
    <FormAuthSteps v-model="activeAuthSteps" />
    <!--    <n-tabs :class="$style.tabs" />-->
  </header>
  <!--  </div>-->
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
    const { $gsap } = useContext()
    const { $store } = ctx.root
    const hasOpenMenu = ref(false)
    const active = ref(false)
    const activeAuthSteps = ref(false)
    const route = useRoute()
    const router = useRouter()
    const header = ref(null)
    const isHomePage = computed(() => route.value.name === 'index')
    const bgName = computed(() => $store.state.content.bgIntro)
    const basketData = computed(() => $store.state.basket.basket?.data)
    const isAuth = computed(() => $store.state.authentication.authorizated)
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
      active.value = !active.value
      hasOpenMenu.value = !hasOpenMenu.value
    }
    const openTestPage = (num) => {
      router.push({ path: `${num}` })
    }
    const openProfile = () => {
      if ($store.state.authentication.authorizated) {
        router.push({ path: '/profile' })
      } else {
        activeAuthSteps.value = true
      }
    }
    const showLogo = computed(() => $store.state.content.showLogo)
    const stateShowLogin = computed(() => {
      return $store.state.authentication.showLogin
    })
    const beforeEnter = (el) => {
      el.style.opacity = 0
      el.style.transform = 'translateY(30px)'
    }
    const enter = (el, done) => {
      // Each element requires a data-index attribute in order for the transition to work properly
       $gsap.to(el, {
        opacity: 1,
        transform: 'translateY(0)',
        delay: el.dataset.index * 0.03,
        onComplete: done
       })
    }
    const leave = (el, done) => {

    }

    watch(() => stateShowLogin.value, (newValue) => {
      if (newValue === true) {
        openProfile()
      }
    })

    return {
      openMenu,
      toggleMenu,
      openTestPage,
      openProfile,
      randomColor,
      BLAND_COLOR,

      basketData,
      showLogo,
      isHomePage,
      active,
      hasOpenMenu,
      header,
      bgName,
      basketCount,
      activeAuthSteps,
      isAuth,
      stateShowLogin,
      beforeEnter,
      enter,
      leave

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
