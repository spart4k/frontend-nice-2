<template>
  <!--  <div :class="$style.headerHolder">-->
  <header :class="$style.header">
    <ul :class="[$style.headerUser__list, active && $style.hideElement]">
      <li :class="$style.headerUser__item">
        <n-icon name="telegram" />
      </li>
      <li :class="$style.headerUser__item">
        <n-icon name="user" />
      </li>
    </ul>
    <transition name="fade-fast">
      <nav v-if="active" :class="[$style.headerNav, active && $style.active]">
        <div :class="[$style.linkHome]" @click="active = false">
          <transition name="fade-fast">
            <nuxt-link v-if="!isHomePage" to="/">
              <n-icon name="arrow" :class="$style.icon" />
              <span>На главную</span>
            </nuxt-link>
          </transition>
        </div>
        <div :class="[$style.basket, $style.headerMenu__item]">
          <div :class="$style.basket__title">
            <n-icon name="basket" :class="$style.icon" />
            <span>Корзина</span>
          </div>
          <div :class="$style.basket__price">
            3 товара на 3880р
          </div>
        </div>
        <div :class="$style.headerNav__inner">
          <ul :class="$style.headerMenu__list">
            <li v-for="item in headerItems" :key="item.title" :class="$style.headerMenu__item" @click.stop="toggleMenu">
              <nuxt-link :to="item.url">
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </transition>

    <nuxt-link v-if="!isHomePage" to="/" :class="[$style.logo, active && $style.hideElement]">
      <div>творческое объединение</div>
      <!--        <img src="@/assets/img/logo.png" alt="Логотип Nice">-->
      <n-logo size="lg" />
    </nuxt-link>

    <n-button
      type-button="transparent"
      :class="[active && $style.open,$style.deviceMenu]"
      @click="openMenu"
    >
      <div :class="$style.deviceMenu__inner">
        <span />
        <span />
        <span />
      </div>
    </n-button>
  </header>
<!--  </div>-->
</template>

<script lang="js">
import { computed, ref, useRoute } from '@nuxtjs/composition-api'

export default {
  name: 'TheHeader',
  props: {
    headerItems: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const hasOpenMenu = ref(false)
    const active = ref(false)
    const route = useRoute()
    const isHomePage = computed(() => route.value.name === 'index')
    const toggleMenu = () => {
      active.value = false
    }

    const openMenu = () => {
      active.value = !active.value
      hasOpenMenu.value = !hasOpenMenu.value
    }
    return {
      openMenu,
      toggleMenu,
      isHomePage,
      active,
      hasOpenMenu
    }
  }
}
</script>

<style scoped lang="scss" module src="./header.scss"></style>
