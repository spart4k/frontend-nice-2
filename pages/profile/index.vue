<template>
  <div :class="$style.container">
    <div :class="$style.profile">
      <h1 :class="$style.profile__title">
        Мой профиль
      </h1>
      <nuxt-link to="/basket" :class="$style.profile__basket">
        <n-icon name="basket" :class="$style.icon" />
        <span>Корзина ({{qtyBasket}})</span>
      </nuxt-link>

      <Form-Profile-Default :class="$style.profile__form" />
      <History-Orders-Default />
    </div>
  </div>
</template>

<script>
import { useContext, computed } from '@nuxtjs/composition-api'
export default {
  name: 'ProfilePage',
  setup () {
    const { store } = useContext()
    const qtyBasket = computed(() => {
      return store.state.basket.basketLength
    })
    return {
      qtyBasket
    }
  }
}
</script>

<style lang="scss" module>
  .container {
    padding: 20px;
  }
  .profile {
    padding-top: var(--header-height);
    margin-bottom: 3.2rem;
    &__basket {
      display: flex;
      align-items: center;
      color: $white;
      font-size: 2rem;
      margin-bottom: 2.4rem;
      span {
        text-decoration: underline;
      }
      .icon {
        width: 2.1rem;
        height: 2.1rem;
        margin-right: 1.5rem;
      }
    }
    &__form {
      margin-bottom: 3.2rem;
    }
    &__title {
      font-size: 3.3rem;
      color:  $white;
      margin-bottom: 1.5rem;
      font-family: 'Montserrat-Black', sans-serif;
    }
  }

</style>
