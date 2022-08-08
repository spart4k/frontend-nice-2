<template>
  <ul :class="$style.list">
    <li :class="$style.item">
      <n-icon name="user" :class="$style.icon" />
      <div :class="$style.item__text">
        <nuxt-link to="yandex.ru">
          Профиль
        </nuxt-link>
      </div>
    </li>
    <li :class="$style.item" @click="showModalStepper">
      <n-icon name="basket" :class="$style.icon" />
      <div :class="$style.item__text">
        Корзина
      </div>
    </li>
    <li :class="$style.item">
      <n-icon name="search" :class="$style.icon" />
      <div :class="$style.item__text">
        <nuxt-link to="#">
          Поиск
        </nuxt-link>
      </div>
    </li>
  </ul>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'

export default {
  name: 'MenuUserTop',
  setup () {
    const { store } = useContext()
    const showModalStepper = () => {
      store.commit('stepperOrder/changeShowStateBottomSheet', true)
    }
    return {
      showModalStepper
    }
  }
}
</script>

<style lang="scss" src="./style.scss" module></style>
