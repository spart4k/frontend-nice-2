<template>
  <div :class="$style.headerHolder">
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
          <div :class="[$style.linkHome]">
            <nuxt-link to="#">
              <n-icon name="arrow" :class="$style.icon" />
              <span>На главную</span>
            </nuxt-link>
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
              <li v-for="item in headerItems" :key="item.title" :class="$style.headerMenu__item">
                <nuxt-link :to="item.url">
                  {{ item.title }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </nav>
      </transition>

      <nuxt-link to="/" :class="[$style.logo, active && $style.hideElement]">
        <div>творческое объединение</div>
        <img src="@/assets/img/logo.png" alt="">
      </nuxt-link>

      <n-button type-button="transparent" href="#" :class="[hasOpenMenu && $style.open,$style.deviceMenu]" @click="openMenu">
        <div :class="$style.deviceMenu__inner">
          <span />
          <span />
          <span />
        </div>
      </n-button>
    </header>
  </div>
</template>

<script lang="js">
import { ref } from '@nuxtjs/composition-api'

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
    const openMenu = () => {
      hasOpenMenu.value = !hasOpenMenu.value
      active.value = !active.value
    }
    return {
      openMenu,
      hasOpenMenu,
      active
    }
  }
}
</script>

<style scoped lang="scss" module>
.headerHolder {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.header {
  width: 100%;
  overflow: hidden;
  @include container;
  padding-top: 3.8rem;
  z-index: 5;
  transition: background-color 0.4s ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $white;
}
.linkHome {
  position: absolute;
  top: 3.8rem;
  a {
    color: inherit;
    display: flex;
    align-items: center;
    @include subtitle;
    span {
      margin-left: 1rem;
    }
  }
  @include montserratSemiBold;
  @include subtitle-sm;
}
.headerUser__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  transition: opacity .1s ease-in-out;
  li + li {
    margin-left: 2.3rem;
  }
}
.headerMenu__list {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
  overflow: hidden;
  gap: 1rem;
}

.headerMenu__item {
  background: rgba($black, 0.3);
  padding: 1.2rem .8rem;
  width: 16.6rem;
  height: 10.5rem;
  @include montserratSemiBold;
  @include subtitle-sm;
  a {
    display: inline-block;
    text-transform: capitalize;
    position: relative;
    text-decoration: none;
    transition: color .5s ease-in-out;
    color: inherit;
  }
  a:hover {
    color: orange;
    transition: color .3s ease-in-out;
  }
}
.header .logo {
  position: absolute;
  font-family: Bankir-Retro, sans-serif;
  color: $white;
  top: 2.8rem;
  left: 50%;
  transform: translateX(-50%);
  width: 7.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  font-size: .8rem;
  transition: opacity .1s ease-in-out;
  img {
    max-width: 100%;
  }
}

.headerNav {
  display: block;
  position: fixed;
  padding-top: $headerHeight;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(70, 90, 108, 0.88);
  z-index: 10;
  overflow-y: auto;
  @include container;
}

.headerNav.active .headerNav__inner {
  display: flex;
  //height: 100%;
}

.basket {
  width: 100%;
  margin-bottom: 3rem;

  .icon {
    margin-right: 1.3rem;
  }
  &__title {
    margin-bottom: 3.1rem;
    display: flex;
    align-items: center;
  }
}

.deviceMenu {
  z-index: 11;
  display: block;
}

.deviceMenu .deviceMenu__inner {
  width: 2.2rem;
  height: 1.9rem;
  position: relative;
}

.deviceMenu span {
  background-color: white;
  border-radius: 3px ;
  position: absolute;
  width: 100%;
  height: 3px;
  left: 0;
  top: 5px;
}

.deviceMenu span:nth-child(1) {
  top: 0;
  transition: rotate, 0.3s;
}

.deviceMenu span:nth-child(2) {
  top: 50%;
}

.deviceMenu span:nth-child(3) {
  top: 100%;
  transition: rotate, 0.3s;
}

.deviceMenu.open span:nth-child(1) {
  top: 1rem;
  right: 0;
  transform: rotate(45deg);
}

.deviceMenu.open span:nth-child(2) {
  opacity: 0;
}

.deviceMenu.open span:nth-child(3) {
  top: 1rem;
  right: 0;
  transform: rotate(-45deg);
}
.hideElement {
  opacity: 0;
}
</style>
