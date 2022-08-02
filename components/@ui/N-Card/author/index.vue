<template>
  <div :class="$style.card">
    <div :class="$style.body">
      <div :class="$style.stats">
        <div :class="$style.authorImage"></div>
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber">10</h2>
          <p :class="$style.amountText">лайков</p>
        </div>
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber">100</h2>
          <p :class="$style.amountText">статей</p>
        </div>
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber">10</h2>
          <p :class="$style.amountText">товаров</p>
        </div>
      </div>
      <h2 :class="$style.authorName">Артем Nice</h2>
      <h3 :class="$style.authorId">@artemnice</h3>
      <p :class="$style.authorQuote">Наши души чистейшими были когда-то Но со временем их испоганило злато.</p>
    </div>
  </div>
</template>
<script lang="js">
// import { ref } from '@nuxtjs/composition-api'
// import dataProps from '../props'

export default {
  name: 'NCardAuthor',
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
        .stats {
            margin-bottom: .5rem;
            display: flex;
            align-items: center;
            .authorImage{
                width: 8rem;
                height: 8rem;
                border-radius: 50%;
                background-color: rgb(195, 195, 195);
                margin-right: 2rem;
            }
            .amount {
                text-align: center;
                .amountNumber {
                    @include regular-text-bold;
                }
                .amountText {
                    @include regular-text-small;
                }
            }
            .amount+.amount {
                margin-left: auto;
            }
        }
        .authorName {
            @include text-style-h2;
        }
        .authorId {
            @include regular-text-bold;
            margin: .5rem 0 1rem
        }
        .authorQuote{
            @include regular-text;
            opacity: 0.8;
        }
    }
  }
</style>
