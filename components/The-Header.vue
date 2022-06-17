<template>
  <!--  <div :class="$style.headerHolder">-->
  <!--  :style="{backgroundImage: backgroundImage}"-->
  <header ref="header" :class="$style.header">
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
            <nuxt-link v-if="!isHomePage" :to="{path: '/'}">
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
import { computed, ref, useRouter, useRoute, onMounted, watch } from '@nuxtjs/composition-api'

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
    const route = useRoute()
    const router = useRouter()
    const header = ref(null)
    const isHomePage = computed(() => route.value.name === 'index')
    const bgName = computed(() => $store.state.content.bgIntro)
    onMounted(() => {
      window.addEventListener('scroll', () => {
        if (isHomePage.value) {
          if (header.value.style.backgroundImage !== '') { return }
          header.value.style.backgroundImage = `url(${require('@/assets/img/background/index-background.jpg')})`
        } else {
          if (header.value.style.backgroundImage !== '') { return }
          header.value.style.backgroundImage = `url(${require('@/assets/img/background/' + `${route.value.params.slug}-background.jpg`)})`
        }
      })
    })
    watch(() => route.value.path, () => {
      header.value.style.backgroundImage = ''
    })
    const backgroundImage = computed(() => {
      if (isHomePage.value) {
        return `url(${require('@/assets/img/background/index-background.jpg')})`
      } else {
        return `url(${require('@/assets/img/background/' + `${route.value.params.slug}-background.jpg`)})`
      }
    })
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
    const showLogo = computed(() => $store.state.content.showLogo)

    return {
      backgroundImage,
      openMenu,
      toggleMenu,
      showLogo,
      isHomePage,
      active,
      hasOpenMenu,
      openTestPage,
      header,
      bgName
    }
  }
}
</script>

<style scoped lang="scss" module src="./header.scss"></style>
