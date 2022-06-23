<template>
  <!--  <div :class="$style.headerHolder">-->
  <!--  :style="{backgroundImage: backgroundImage}"-->
  <header :class="$style.header">
    <ul :class="[$style.headerUser__list, active && $style.hideElement]">
      <li :class="$style.headerUser__item">
        <n-icon name="telegram" />
      </li>
      <li :class="$style.headerUser__item" @click="openProfile">
        <n-icon name="user" />
      </li>
    </ul>
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
        <div v-if="isAuth && basketCount.calcBasketCard > 0" :class="[$style.basket, $style.headerMenu__item]" @click="active = false">
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

        <div :class="$style.headerNav__inner">
          <ul :class="$style.headerMenu__list">
            <li v-for="item in headerItems" :key="item.title" :style="{color: randomColor()}" :class="$style.headerMenu__item" @click.stop="toggleMenu">
              <nuxt-link :to="{ path: `/${item.slug}`, params:{ id: item.id }, query: { id: item.id } }">
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
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
      <!--      basketData.cards.length-->
      <div v-if="!active && isAuth && basketCount.calcBasketCard > 0" :class="$style.basketCount">
        {{ basketCount.calcBasketCard }}
      </div>
    </n-button>
    <FormAuthSteps v-model="activeAuthSteps" />
  </header>
  <!--  </div>-->
</template>

<script lang="js">
import { computed, ref, useRouter, useRoute, watch } from '@nuxtjs/composition-api'
import { numWord } from '~/helpers/compositions/declination'
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

    const backgroundImage = computed(() => {
      if (isHomePage.value) {
        return `url(${require('@/assets/img/background/index-background.jpg')})`
      } else {
        return `url(${require('@/assets/img/background/' + `${route.value.params.slug}-background.jpg`)})`
      }
    })

    // watch(() => showLoginFromStore, (newValue) => {
    //  if (newValue === true) {
    //    activeAuthSteps.value = true
    //  }
    // })

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

    watch(() => stateShowLogin, (newValue) => {
      if (newValue === true) {
        openProfile()
      }
    })

    return {
      openMenu,
      toggleMenu,
      openTestPage,
      openProfile,

      basketData,
      backgroundImage,
      showLogo,
      isHomePage,
      active,
      hasOpenMenu,
      header,
      bgName,
      basketCount,
      activeAuthSteps,
      isAuth,
      randomColor,
      stateShowLogin

    }
  }
}
</script>

<style scoped lang="scss" module src="./header.scss"></style>
