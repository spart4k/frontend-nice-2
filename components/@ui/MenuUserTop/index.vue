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
    <li :class="$style.item" @click="$emit('openMenu', {key:'basket', effect:'fx-slide-from-left'})">
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

export default {
  name: 'MenuUserTop',
  setup () {
  const toSupport = () => {
    window.open('https://t.me/itisthenicesupport')
  }
    return {
      toSupport
    }
  }
}
</script>

<style lang="scss" src="./style.scss" module></style>
