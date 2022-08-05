<template>
  <div :class="$style.card">
    <div :class="$style.body">
      <div :class="$style.block">
        <h2 :class="$style.title">
          Nice (NICE/USD)
        </h2>
        <p :class="$style.text">
          NICE является вилкой SushiSwap с общим предложением от 69 до 420, без премина.
        </p>
      </div>
      <div :class="$style.buyButton">
        Купить монету
      </div>
      <div :class="$style.block">
        <h2 :class="$style.title">
          Как это работает?
        </h2>
        <p :class="$style.text">
          После того, как поставка превышает 420, выбросы автоматически сокращаются на 100x, а скорость горения увеличивается до 20% транзакций. После того, как подача газа падает ниже 69, выбросы автоматически увеличиваются в 100 раз, а скорость сгорания снижается до 1%.
        </p>
      </div>
      <div :class="$style.block">
        <h2 :class="$style.title">
          Как купить Nice Руководство
        </h2>
        <p :class="$style.text">
          После того, как поставка превышает 420, выбросы автоматически сокращаются на 100x, а скорость горения увеличивается до 20% транзакций. После того, как подача газа падает ниже 69, выбросы автоматически увеличиваются в 100 раз, а скорость сгорания снижается до 1%.
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="js">
// import { ref } from '@nuxtjs/composition-api'
// import dataProps from '../props'

export default {
  name: 'NCardCoin',
  components: {
  },
//   props: { ...dataProps.props },
  setup (props) {
    return {
    }
  }
}
</script>
<style lang="scss" module>
  .card {
    background-color: $white;
    //width: 36rem;
    width: 100%;
    border-radius: 2rem;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    .body {
        padding: 1.4rem 1.5rem 2.094rem;
        color: $fontColorDefault;
        @include regular-text;
        .block {
            .title {
            @include text-style-h2;
            margin-bottom: 1rem
            }
            .text {
            @include regular-text;
            }
        }
        .buyButton {
            display: inline-block;
            @include button;
            color: $white;
            padding: 1.4rem 3.7rem;
            background: #73CA55;
            border-radius: 2.5rem;
        }
        div+div {
        margin-top: 3rem;
        }
    }
  }
</style>
