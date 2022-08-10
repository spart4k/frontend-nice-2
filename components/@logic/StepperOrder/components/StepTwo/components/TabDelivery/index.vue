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
    </form>
    <n-row>
      <h4 :class="$style.title">
        Состав заказа
      </h4>
      <N-Basket-row :item="basketItem" readonly />
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
      <h4 :class="[$style.orders__title, $style.titleBig]">
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
            Стоимость доставки
          </div>
          <div :class="$style.col__right">
            3 500 р.
          </div>
        </div>
        <div :class="$style.col">
          <div :class="$style.col__left">
            Скидка
          </div>
          <div :class="$style.col__right">
            3 500 р.
          </div>
        </div>
      </div>
      <div :class="$style.total">
        <div :class="[$style.total__text, $style.titleBig]">
          Итого
        </div>
        <div :class="$style.total__sum">
          4 500 р.
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
    <NPersonalConsent />
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'TabDelivery',
  setup () {
    const activePayment = ref('card')
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
      basketItem,
      paymentsMethodSelect,
      activePayment
    }
  }
}
</script>

<style lang="scss" module>
.titleBig {
  font-weight: 500;
  @include button;
}
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
  margin-bottom: 1.5rem;
}

.paymentList {
  display: flex;
  width: 100%;
  li + li {
    margin-left: 1rem;
  }
}
.orders {
  margin-bottom: 3rem;
  .cols {
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba($fontColorDefault, 0.1);
  }
  &__title {
    margin-bottom: 1.5rem;
  }
  .col + .col {
    margin-top: 1.5rem;
  }
  .col {
    display: flex;
    justify-content: space-between;
    &__left {
      @include regular-text;
    }
    &__right {
      @include regular-text-bold;
    }
  }
  .total {
    &__sum {
      @include text-style-h2;
    }
  }
}
</style>
