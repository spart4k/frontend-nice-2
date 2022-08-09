<template>
  <div :class="$style.wrapper">
    <div :style="{transform: language ? 'rotateY(0)' : 'rotateY(-180deg)' }" :class="[$style.card,$style.ruLanguage]">
      <div :class="$style.body">
        <div :class="$style.block">
          <div :class="$style.titleBlock">
            <h2 :class="$style.title">
              Nice (NICE/USD)
            </h2>
            <p :class="$style.languageSwitch" @click="language = !language">
              In english
            </p>
          </div>
          <p :class="$style.text">
            NICE является вилкой SushiSwap с общим предложением от 69 до 420, без премина.
          </p>
          <N-Button :class="$style.buyButton" background-color="#73CA55">
            Купить монету
          </N-Button>
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
    <div :style="{transform: language ? 'rotateY(180deg)' : 'rotateY(0)' }" :class="[$style.card,$style.engLanguage]">
      <div :class="$style.body">
        <div :class="$style.block">
          <div :class="$style.titleBlock">
            <h2 :class="$style.title">
              Nice (NICE/USD)
            </h2>
            <p :class="$style.languageSwitch" @click="language = !language">
              На русский
            </p>
          </div>
          <p :class="$style.text">
            NICE is a fork of SushiSwap with a total offer of 69 to 420, no premin.
          </p>
          <N-Button :class="$style.buyButton" background-color="#73CA55">
            Buy a coin
          </N-Button>
        </div>
        <div :class="$style.block">
          <h2 :class="$style.title">
            How it works?
          </h2>
          <p :class="$style.text">
            Once the supply exceeds 420, emissions are automatically reduced by 100x and the burn rate is increased to 20% of transactions. Once the gas supply drops below 69, emissions automatically increase by a factor of 100 and the combustion rate is reduced to 1%.
          </p>
        </div>
        <div :class="$style.block">
          <h2 :class="$style.title">
            How to Buy a Nice Guide
          </h2>
          <p :class="$style.text">
            Once the supply exceeds 420, emissions are automatically reduced by 100x and the burn rate is increased to 20% of transactions. Once the gas supply drops below 69, emissions automatically increase by a factor of 100 and the combustion rate is reduced to 1%.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="js">
import { ref } from '@nuxtjs/composition-api'
// import dataProps from '../props'

export default {
  name: 'NCardCoin',
  components: {
  },
//   props: { ...dataProps.props },
  setup (props) {
    const language = ref(true)
    return {
      language
    }
  }
}
</script>
<style lang="scss" module>
.wrapper{
  position: relative;
  perspective: 1200px;
  width: 100%;
  .card {
    position: absolute;
    background-color: $white;
    width: auto;
    height: auto;
    top: 0;
    left: 0;
    border-radius: 2rem;
    transition: 1s;
    backface-visibility: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    .body {
        padding: 2.7rem 1.5rem 3rem;
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
            .titleBlock {
              margin-bottom: 1rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .title {
                @include text-style-h2;
                margin-bottom: 0rem
              }
              .languageSwitch {
                @include button;
                color: #73CA55;
                cursor: pointer;
              }
            }
          .buyButton {
            margin-top: 1.5rem;
          }
        }
        div+div {
          margin-top: 3rem;
        }
    }
  }
  .engLanguage {
    transform: rotateY(180deg);
  }
  // .ruLanguage {
  //   animation-direction: reverse;
  // }
}
  // .wrapper:hover .ruLanguage {
  //   transform: rotateY(180deg);
  // }
  // .wrapper:hover .engLanguage {
  //   transform: rotateY(360deg);
  // }
</style>
