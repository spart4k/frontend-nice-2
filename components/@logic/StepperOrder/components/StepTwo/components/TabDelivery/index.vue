<template>
  <div>
    <form :class="[$style.form, $style.row]">
      <n-row>
        <n-text-field placeholder="Введите ФИО" title="ФИО" :color-border="'pinkBorder'" />
      </n-row>
      <n-row>
        <n-text-field placeholder="Введите номер телефона" title="Телефон" :color-border="'pinkBorder'" />
      </n-row>
      <n-row>
        <n-text-field placeholder="Введите ваш еmail" title="Email" :color-border="'pinkBorder'" />
      </n-row>
      <n-row>
        <n-select
          title="Адрес"
          :color-border="'pinkBorder'"
          :select-items="selectItems"
          :position-arrow="{
            right: 0,
          }"
          has-border-bottom
          :class="$style.form__select"
        />
      </n-row>
      <div>
        <n-text-field :color-border="'pinkBorder'" placeholder="Улица, дом, квартира" />
      </div>
    </form>
    <n-row>
      <h4 :class="$style.title">
        Состав заказа
      </h4>
      <N-Basket-row :item="basketItem" />
    </n-row>
    <n-row>
      <h4 :class="$style.title">
        Способ оплаты
      </h4>
      <ul :class="$style.paymentList">
        <n-payment-methods
          v-for="item in paymentsMethodSelect"
          :key="item.text"
          :item="item"
          :active="activePayment === item.value"
          @click="activePayment = item.value"
        />
      </ul>
    </n-row>
    <div :class="$style.orders">
      <h4 :class="$style.orders__title">
        Ваш заказ
      </h4>
      <div :class="$style.cols">
        <div :class="$style.col">
          <div :class="$style.col__left">
            Товары
          </div>
          <div :class="$style.col__right">
            3 500 р.
          </div>
        </div>
        <div :class="$style.col">
          <div :class="$style.col__left">
            Товары
          </div>
          <div :class="$style.col__right">
            3 500 р.
          </div>
        </div>
      </div>
    </div>
    <n-button
      :class="$style.btn"
      :type-button="'pink'"
      @click="$emit('changeStep', 'increment')"
    >
      Оплатить онлайн
    </n-button>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'TabDelivery',
  setup () {
    const activePayment = ref('card')
    const selectItems = [
      { text: 'Нижний Новгород', value: 1 },
      { text: 'Samara', value: 2 }
    ]
    const basketItem = {
      title: 'Провод midi/midi 0.2m синий',
      price: 3200,
      pivot: {
        quantity: 2
      },
      images: [
        { src: 'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs' }
      ]
    }

    const paymentsMethodSelect = [
      { text: 'Картой', icon: 'card-stepper', value: 'card' }
    ]
    return {
      selectItems,
      basketItem,
      paymentsMethodSelect,
      activePayment
    }
  }
}
</script>

<style lang="scss" module>
.form {
  margin-bottom: 2.5rem;
  &__select {
    @include regular-text;
  }
}
.title {
  color: $fontColorDefault;
  opacity: 0.5;
  margin-bottom: 1rem;
  @include regular-text;
}

.btn {
  width: 100%;
}

.paymentList {
  display: flex;
  overflow-x: auto;
  width: 100%;
  li + li {
    margin-left: 1rem;
  }
}
.orders {
  .cols {
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba($fontColorDefault, 0.1);
  }
  &__title {
    margin-bottom: 1.5rem;
    font-weight: 500;
    @include button;
  }
  .col + .col {
    margin-top: 1.5rem;
  }
  .col {
    display: flex;
    justify-content: space-between;
    &__left {
      @include regular-text;
      font-weight: 500;
    }
    &__right {
      @include regular-text-bold;
      font-weight: 700;
    }
  }
}
</style>
