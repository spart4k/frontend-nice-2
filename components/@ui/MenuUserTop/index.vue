<template>
  <ul :class="$style.list">
    <li :class="$style.item" @click="$emit('openMenu', {key:'registration', effect:''})">
      <n-icon name="user" :class="$style.icon" />
      <div :class="$style.item__text">
        Профиль
      </div>
    </li>
    <li :class="$style.item" @click="$emit('openMenu', {key:'basket', effect:''})">
      <n-icon name="basket" :class="$style.icon" />
      <div :class="$style.item__text">
        Корзина
      </div>
    </li>
    <li :class="$style.item" @click="$emit('openMenu', {key:'search', effect:''})">
      <n-icon name="search" :class="$style.icon" />
      <div :class="$style.item__text">
        Поиск
      </div>
    </li>
    <li :class="$style.item">
      <n-icon name="connection" :class="$style.icon" />
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
    return {}
  }
}
</script>

<style lang="scss" src="./style.scss" module></style>
