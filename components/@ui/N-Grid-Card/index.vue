<template>
  <div :class="$style.cards">
    <template v-if="spliceArray.colLeft && spliceArray.colRight">
      <div :class="[$style.col, !spliceArray.colRight.length && $style.oneElement]">
        <div v-if="homePage" :class="$style.image">
          <img :src="require(`~/assets/img/dogs.png`)" alt="DOG ">
        </div>
        <div v-else :class="$style.preview">
          <slot />
        </div>
        <template v-for="(card) in spliceArray.colLeft">
          <section-cards :id="card.section.id" :key="card.id" :class="$style.cards__item" :card="card" />
        </template>
      </div>
      <div v-if="spliceArray.colRight.length" :class="$style.col">
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
    },
    homePage: {
      type: Boolean
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
.preview {
  height: 60rem;
  @media (max-width: $mobileWidth) {
    height: calc(100vh - 10.3rem);
  }
}
.cards {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  @media (min-width: $desktopWidth) {
    width: calc(100% - 17.3rem - 17.3rem);
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60rem;
    img {
      line-height: 0;
      width: 39.7rem;
      max-width: 100%;
    }
    @media(max-width: $mobileWidth) {
      display: none;
    }
  }
}
.col + .col {
  @media (max-width: $tabletWidth) {
    margin-left: 0;
  }
}
.col {
  width: calc(50% - 1.5rem);
  &.oneElement {
    display: flex;
    width: auto;
    .cards__item, .preview {
      width: calc(50% - 1.5rem);
    }
    @media(max-width: $mobileWidth) {
      flex-direction: column;
      align-items: center;
      width: auto;
      .cards__item, .preview {
        width: auto;
      }
    }
  }
  @media (max-width: $mobileWidth) {
    width: auto;
    max-width: none;
  }
}
</style>
