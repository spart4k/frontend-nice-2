<template>
  <ul :class="$style.list">
    <li :class="$style.item" @click="$emit('openMenu', {key:'registration', effect:'fx-slide-from-left'})">
      <div :class="$style.iconContainer">
        <n-icon name="user" :class="$style.icon" />
      </div>
      <div :class="$style.item__text">
        Профиль
      </div>
    </li>
    <li :class="$style.item" @click="openBasket">
      <div :class="$style.iconContainer">
        <n-icon name="basket" :class="$style.icon" />
      </div>
      <div :class="$style.item__text">
        Корзина
      </div>
    </li>
    <li :class="$style.item" @click="$emit('openMenu', {key:'search', effect:'fx-slide-from-left'})">
      <div :class="$style.iconContainer">
        <n-icon name="search" :class="$style.icon" />
      </div>
      <div :class="$style.item__text">
        Поиск
      </div>
    </li>
    <li :class="$style.item" @click="toSupport">
      <div :class="$style.iconContainer">
        <n-icon name="connection" :class="$style.icon" />
      </div>
      <div :class="$style.item__text">
        Связь
      </div>
    </li>
  </ul>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
export default {
  name: 'MenuUserTop',
  setup (props, { emit }) {
  const { store } = useContext()
  const toSupport = () => {
    window.open('https://t.me/itisthenicesupport')
  }
  const openBasket = () => {
    if (store.state.authentication.authorizated) {
      emit('openMenu', { key: 'basket', effect: 'fx-slide-from-left' })
    } else if (!store.state.menu.isShowBottomMenu) {
      store.commit('menu/changeKeyMenu', {
        key: 'registration',
        effect: 'fx-slide-from-left'
      })
      store.commit('menu/changeStepMenu', { step: 1 })
      store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
    } else if (store.state.menu.isShowBottomMenu) {
      store.commit('menu/changeKeyMenu', {
        key: 'registration',
        effect: 'fx-slide-from-left'
      })
      store.commit('menu/changeStepMenu', { step: 1 })
    }
  }
    return {
      toSupport,
      openBasket
    }
  }
}
</script>

<style lang="scss" src="./style.scss" module></style>
