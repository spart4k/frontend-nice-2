<template>
  <ul :class="$style.list">
    <li :class="$style.item">
      <n-icon name="user" :class="$style.icon" />
      <div :class="$style.item__text">
        <nuxt-link to="#">
          Профиль
        </nuxt-link>
      </div>
    </li>
    <li :class="$style.item" @click="$emit('openMenuBasket')">
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
    <li :class="$style.item">
      <n-icon name="connection" :class="$style.icon" />
      <div :class="$style.item__text">
        <nuxt-link to="#">
          Связь
        </nuxt-link>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'MenuUserTop',
  setup () {
    return {}
  }
}
</script>

<style lang="scss" src="./style.scss" module></style>
