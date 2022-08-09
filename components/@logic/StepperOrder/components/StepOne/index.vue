<template>
  <div>
    <h2 :class="$style.title">
      Ваша корзина
    </h2>
    <ul :class="$style.list">
      <n-basket-row :item="basketItem" />
    </ul>
    <div :class="$style.totalPrice">
      <div :class="$style.totalPrice__text">
        Итого
      </div>
      <div :class="$style.totalPrice__sum">
        3500 р.
      </div>
    </div>
    <n-button
      :class="$style.btn"
      :type-button="'pink'"
      @click="$emit('changeStep', 'increment')"
    >
      Оформить заказ
    </n-button>
  </div>
</template>

<script>
export default {
  name: 'StepOne',
  setup () {
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
    return {
      basketItem
    }
  }
}
</script>

<style  lang="scss" module>
ul {
  padding-left: 0;
}
.list {
  border-radius: 2rem;
  margin-bottom: 3rem;
}
.btn {
  width: 100%;
}
.totalPrice {
  margin-bottom: 3rem;
  &__text {
    margin-bottom: .5rem;
    @include text;
  }
  &__sum {
    margin-bottom: .5rem;
    @include text-style-h2;
  }
}
.title {
  text-align: center;
  @include text-style-h2;
}
</style>
