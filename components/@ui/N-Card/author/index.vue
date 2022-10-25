<template>
  <div v-if="avatar" :class="$style.card">
    <div :class="$style.body">
      <div :class="$style.stats">
        <!-- <div :class="$style.authorImage" /> -->
        <img :class="$style.authorImage" :src="`${$axios.defaults.baseURL}/${avatar}`" alt="avatar">
        <div v-if="likeCounter !== undefined" :class="$style.amount">
          <h2 :class="$style.amountNumber">
            {{ likeCounter }}
          </h2>
          <p :class="$style.amountText">
            {{ likeEnding }}
          </p>
        </div>
        <div v-if="articleCounter !== undefined" :class="$style.amount">
          <h2 :class="$style.amountNumber">
            {{ articleCounter }}
          </h2>
          <p :class="$style.amountText">
            {{ articleEnding }}
          </p>
        </div>
        <div v-if="itemCounter !== undefined" :class="$style.amount">
          <h2 :class="$style.amountNumber">
            {{ itemCounter }}
          </h2>
          <p :class="$style.amountText">
            {{ itemEnding }}
          </p>
        </div>
      </div>
      <h2 :class="$style.authorName">
        {{ name }}
      </h2>
      <!-- <h3 :class="$style.authorId">
        @artemnice
      </h3> -->
      <p :class="$style.authorQuote" v-html="description" />
    </div>
  </div>
</template>
<script lang="js">
import { ref, computed } from '@nuxtjs/composition-api'
import { numWord } from '~/helpers/compositions/declination'
// import dataProps from '../props'

export default {
  name: 'NCardAuthor',
  components: {
  },
  props: {
    author: {
      type: Object
    }
  },
//   props: { ...dataProps.props },
  setup (props) {
    const likeCounter = computed(() => props.author?.author_data?.like_number)
    const articleCounter = computed(() => props.author?.author_data?.articles_number_count)
    const itemCounter = computed(() => props.author?.author_data?.items_number_count)
    const avatar = computed(() => props.author.author_data?.avatar.src)
    const name = computed(() => props.author.author_data?.name)
    const description = computed(() => props.author.author_data?.description)
    const likeEnding = ref(numWord(likeCounter.value, ['лайк', 'лайка', 'лайков']))
    const articleEnding = ref(numWord(articleCounter.value, ['статья', 'статьи', 'статей']))
    const itemEnding = ref(numWord(itemCounter.value, ['товар', 'товара', 'товаров']))
    return {
      likeCounter,
      articleCounter,
      itemCounter,
      likeEnding,
      articleEnding,
      itemEnding,
      avatar,
      name,
      description
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
                object-fit: cover;
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
            margin: 0 0 1.5rem
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
