<template>
  <div :class="$style.wrapper">
    <h3 :class="$style.title">
      Спасибо за заказ!
    </h3>
    <div :class="$style.subtitle">
      Номер вашего заказа №{{orderId}}
    </div>
    <div :class="$style.text">
      Менеджер свяжется с вами
      в рабочий день с 8:00 до 19:00.
    </div>
    <div :class="$style.image">
      <img src="~/assets/img/plug.png" alt="plug">
    </div>
    <n-button
      :class="$style.btn"
      :type-button="'pink'"
      @click="$emit('closeState')"
    >
      Продолжить
    </n-button>
    <n-button type-button="transparent" color="#C83F8E" :class="[$style.btn, $style.btnHistory]">
      История заказов
    </n-button>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'StepOne',
  setup () {
    const { store } = useContext()
    const orderId = computed(() => { return store.state.basket.lastOrder })
    return {
      orderId
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include styleBottomSheetStepper;
  @include paddings;
  .image {
    margin-bottom: 6.6rem;
  }
  .title {
    @include text-style-h2;
  }
  .subtitle {
    color: $pink2;
    margin-bottom: 3rem;
    @include button;
  }
  .text {
    width: 24.5rem;
    text-align: center;
    margin-bottom: 3rem;
    @include regular-text;
  }
  .btn {
    width: 100%;
  }
  .btnHistory {
    margin-top: 2.1rem;
  }
}

</style>
