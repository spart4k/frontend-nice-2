<template>
  <div :class="$style.card">
    <div :class="$style.body">
      <div :class="$style.stats">
        <div :class="$style.authorImage" />
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber">
            {{ likeCounter }}
          </h2>
          <p :class="$style.amountText">
            {{ likeEnding }}
          </p>
        </div>
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber">
            {{ articleCounter }}
          </h2>
          <p :class="$style.amountText">
            {{ articleEnding }}
          </p>
        </div>
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber">
            {{ itemCounter }}
          </h2>
          <p :class="$style.amountText">
            {{ itemEnding }}
          </p>
        </div>
      </div>
      <h2 :class="$style.authorName">
        Артем Nice
      </h2>
      <h3 :class="$style.authorId">
        @artemnice
      </h3>
      <p :class="$style.authorQuote">
        Наши души чистейшими были когда-то Но со временем их испоганило злато.
      </p>
    </div>
  </div>
</template>
<script lang="js">
import { ref } from '@nuxtjs/composition-api'
import { numWord } from '~/helpers/compositions/declination'
// import dataProps from '../props'

export default {
  name: 'NCardAuthor',
  components: {
  },
//   props: { ...dataProps.props },
  setup (props) {
    const likeCounter = ref(1)
    const articleCounter = ref(102)
    const itemCounter = ref(10)
    const likeEnding = ref(numWord(likeCounter.value, ['лайк', 'лайка', 'лайков']))
    const articleEnding = ref(numWord(articleCounter.value, ['статья', 'статьи', 'статей']))
    const itemEnding = ref(numWord(itemCounter.value, ['товар', 'товара', 'товаров']))
    return {
      likeCounter,
      articleCounter,
      itemCounter,
      likeEnding,
      articleEnding,
      itemEnding
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
        padding: 1.4rem 1.5rem 2rem;
        color: $fontColorDefault;
        @include regular-text;
        @media (min-width: $tabletWidth) {
          padding: 1.5rem 1.5rem 3rem;
        }
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
                @media (min-width: $tabletWidth) {
                  width: 14rem;
                  height: 14rem;
                  margin-right: 3.4rem;
                }
            }
            .amount {
                text-align: center;
                margin-right: .6rem;
                @media (min-width: $tabletWidth) {
                  margin-right: 3.1rem;
                }
                .amountNumber {
                  @include regular-text-bold;
                  @media (min-width: $tabletWidth) {
                    @include text-style-h2;
                  }
                }
                .amountText {
                  @include regular-text-small;
                  @media (min-width: $tabletWidth) {
                    @include regular-text;
                  }
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
