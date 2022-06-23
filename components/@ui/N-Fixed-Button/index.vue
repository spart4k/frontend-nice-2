<template>
  <div :class="$style.wrapper">
    <div :class="$style.copyButton" />
    <div :class="[$style.button__add_basket, $style[`fz_${fz}`]]">
      <N-Button :disabled="disabled">
        <div :class="[$style.button__add_basket, checkAuth && !isAuth ? $style.disabled : '']">
          <div
            v-if="checkAuth && !isAuth"
            :class="$style.noAuth"
            @click="showLogin"
          >
            <span>Войдите</span> или <span>зарегистрируйтесь,</span>
            чтобы сделать заказ
          </div>
          <N-Button :disabled="disabled" :class="checkAuth && !isAuth ? $style.disable : '' " @click="$emit('clickButton')">
            <slot />
          </N-Button>
        </div>
      </n-button>
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
export default {
  name: 'NFixedButton',
  props: {
    disabled: Boolean,
    fz: String,
    checkAuth: {
      type: Boolean,
      default: false
    },
    isAuth: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const { store } = useContext()
    const showLogin = () => {
      store.commit('authentication/showLogin', true)
    }
    return {
      showLogin
    }
  }
}
</script>

<style scoped lang="scss" module>
.copyButton {
  width: 100%;
  height: 15rem;
}
.button__add_basket {
  background-color: rgba($black, 0.8);
  //padding-top: 2.4rem;
  //padding-bottom: 2.4rem;
  @include container;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem 2.4rem;
  &.disabled {
    background-color: #000000;
    color: #ffffff;
  }
  button {
    width: 100%;
    height: 5.1rem;
    background-color: $yellow2;
    color: $black;
    @include montserratMedium;
    @include text;
    width: 100%;
    &.disable {
      background-color: #DADADA;
      color: rgba(0,0,0,.3);
      pointer-events: none;
    }
  }
  .noAuth {
    width: 100%;
    font-size: 1.8rem;
    color: $white;
    margin-bottom: 1.2rem;
    span {
      color: $yellow2;
    }
  }
  .fz_md {
    @include text-md;
  }
}
</style>
