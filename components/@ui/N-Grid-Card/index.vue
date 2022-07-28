<template>
  <div :class="$style.cards">
    <template v-if="spliceArray.colLeft && spliceArray.colRight">
      <div :class="$style.col">
        <!--        :key="card.id" :class="$style.cards__item"-->
        <template v-for="(card) in spliceArray.colLeft">
          <div v-if="card.hasOwnProperty('image')" :key="card.id" :class="$style.image">
            <img :src="require(`~/assets/img/${card.image}.png`)" alt="DOG ">
          </div>
          <section-cards v-else :id="card.section.id" :key="card.id" :class="$style.cards__item" :card="card" />
        </template>
      </div>
      <!--      :key="card.id" :class="$style.cards__item"-->
      <div :class="$style.col">
        <template v-for="(card) in spliceArray.colRight">
          <section-cards
            :id="card.section.id"
            :key="card.id"
            :card="card"
            :class="$style.cards__item"
            @clickTag="($event) => $emit('clickTag', card.section.id)"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { computed, unref, ref, watch } from '@nuxtjs/composition-api'

export default {
  name: 'NGridCard',
  props: {
    items: {
      type: Array
    }
  },

  setup (props) {
    const { items } = unref(props)
    const proxyArray = ref(items)

    watch(() => props.items, () => {
      proxyArray.value = props.items
    })

    const spliceArray = computed(() => {
      const middleIndex = Math.ceil(proxyArray.value?.length / 2)

      const firstHalf = proxyArray.value?.splice(0, middleIndex)
      const obj = {
        image: 'dogs',
        id: Math.random()
      }
      firstHalf.unshift(obj)
      const secondHalf = proxyArray.value?.splice(-middleIndex)

      return {
        colLeft: firstHalf,
        colRight: secondHalf
      }
    })

    return {
      spliceArray,
      proxyArray
    }
  }
}

</script>

<style scoped lang="scss" module>
.cards {
  display: flex;
  justify-content: center;
  width: 100%;
  @media (min-width: 1440px) {
    width: calc(100% - 17.3rem - 17.3rem);
  }
  @media (max-width: $tabletWidth) {
    justify-content: space-between;
  }
  @media (max-width: $mobileWidth) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
  &__item {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .image {
    max-width: 39.7rem;
    img {
      max-width: 100%;
    }
    @media(max-width: $mobileWidth) {
      display: none;
    }
  }
}
.col + .col {
  margin-left: 2rem;
  @media (max-width: $tabletWidth) {
    margin-left: 0;
  }
}
.col {
  width: calc(50% - 1rem);
  @media (min-width: 1440px) {
    max-width: 53rem;
  }
  @media (max-width: $mobileWidth) {
    width: auto;
    max-width: none;
  }
}
</style>
