<template>
  <div :class="$style.card">
    <div :class="$style.body">
      <div :class="$style.stats">
        <div :class="$style.authorImage"></div>
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber"> {{ likeCounter }} </h2>
          <p :class="$style.amountText">лайк{{ likeEnding }}</p>
        </div>
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber">{{ articleCounter }}</h2>
          <p :class="$style.amountText">стат{{ articleEnding }}</p>
        </div>
        <div :class="$style.amount">
          <h2 :class="$style.amountNumber">{{ itemCounter }}</h2>
          <p :class="$style.amountText">товар{{ itemEnding }}</p>
        </div>
      </div>
      <h2 :class="$style.authorName"> Артем Nice </h2>
      <h3 :class="$style.authorId"> @artemnice </h3>
      <p :class="$style.authorQuote">Наши души чистейшими были когда-то Но со временем их испоганило злато.</p>
    </div>
  </div>
</template>
<script lang="js">
import { onMounted, ref } from '@nuxtjs/composition-api'
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
    const likeEnding = ref('ов')
    const articleEnding = ref('ей')
    const itemEnding = ref('ов')
    const likeEndingSet = () => {
      const string = likeCounter.value.toString()
      const lastElem = string[string.length - 1]
      if (!(string[string.length - 2] === '1')) {
        if (lastElem === '2' || lastElem === '3' || lastElem === '4') {
          likeEnding.value = 'a'
        } else if (lastElem === '1') {
          likeEnding.value = ''
        }
      }
    }
    const articleEndingSet = () => {
      const string = articleCounter.value.toString()
      const lastElem = string[string.length - 1]
      if (!(string[string.length - 2] === '1')) {
        if (lastElem === '2' || lastElem === '3' || lastElem === '4') {
          articleEnding.value = 'ьи'
        } else if (lastElem === '1') {
          articleEnding.value = 'ья'
        }
      }
    }
    const itemEndingSet = () => {
      const string = itemCounter.value.toString()
      const lastElem = string[string.length - 1]
      if (!(string[string.length - 2] === '1')) {
        if (lastElem === '2' || lastElem === '3' || lastElem === '4') {
          itemEnding.value = 'a'
        } else if (lastElem === '1') {
          itemEnding.value = ''
        }
      }
    }
    onMounted(() => {
      likeEndingSet()
      articleEndingSet()
      itemEndingSet()
    })
    return {
      likeCounter,
      articleCounter,
      itemCounter,
      likeEnding,
      articleEnding,
      itemEnding,
      likeEndingSet,
      articleEndingSet,
      itemEndingSet
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
