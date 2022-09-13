<template>
  <div :class="$style.cards">
    <!-- <template v-if="spliceArray.colLeft && spliceArray.colRight"> -->
    <div :class="$style.col">
      <template v-for="(card) in spliceArray.colLeft">
        <n-section-intro
          v-if="card.hasOwnProperty('preview')"
          :key="card.id"
          :description="card"
          :image="card.image"
          :class="$style.preview"
        />
        <div v-else-if="card.hasOwnProperty('home')" :key="card.id" :class="$style.image">
          <img :src="card.image" alt="DOG ">
        </div>
        <template v-else>
          <section-cards :key="card.id" :section="card.section" :class="$style.cards__item" :card="card" />
        </template>
      </template>
      <!-- <template v-for="(card) in spliceArray.colRight">
        <section-cards
          :key="card.id"
          :section="card.section"
          :card="card"
          :class="$style.cards__item"
          @clickTag="($event) => $emit('clickTag', card.section.id)"
        />
      </template> -->
    </div>
    <!-- <div v-if="spliceArray.colRight.length" :class="$style.col">
      <template v-for="(card) in spliceArray.colRight">
        <section-cards
          :key="card.id"
          :section="card.section"
          :card="card"
          :class="$style.cards__item"
          @clickTag="($event) => $emit('clickTag', card.section.id)"
        />
      </template>
    </div> -->
    <!-- </template> -->
  </div>
</template>

<script>
import { computed, ref, useContext, watch } from '@nuxtjs/composition-api'

export default {
  name: 'NGridCard',
  props: {
    items: {
      type: Array
    },
    homePage: {
      type: Boolean
    },
    description: {
      type: Object
    }
  },

  setup (props) {
    const { route } = useContext()
    // const { items } = unref(props)
    const proxyArray = ref(props.items)
    const spliceArray = computed(() => {
    // console.log(proxyArray.value)
      if (!props.homePage) {
        proxyArray.value.unshift({
          image: route.value.params.slug,
          title: props.description.title,
          preview: true,
          id: Math.random()
        })
      } else {
        proxyArray.value?.unshift({
          home: true,
          image: require('~/assets/img/preview/dogs.png'),
          id: Math.random()
        })
      }
      const middleIndex = Math.ceil(proxyArray.value?.length / 2)
      // const firstHal = ref([])
      // const secondHal = ref([])
      // proxyArray.value.forEach((item, index) => {
      //   if (index % 2 === 0) {
      //     firstHal.value.push(item)
      //   }
      // })
      // proxyArray.value.forEach((item, index) => {
      //   if (index % 2 !== 0) {
      //     secondHal.value.push(item)
      //   }
      // })
      const firstHalf = proxyArray.value?.splice(0, middleIndex)
      const secondHalf = proxyArray.value?.splice(-middleIndex)

      return {
        colLeft: firstHalf,
        colRight: secondHalf
      }
    })

    watch(() => props.items, () => {
      // proxyArray.value.push(props.items)
      proxyArray.value = props.items
      // console.log('watch', props.items)
      // firstHalf.value = proxyArray.value?.splice(0, middleIndex)
      // secondHalf.value = proxyArray.value?.splice(-middleIndex)
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
    height: 60rem !important;
  @media (max-width: $tabletWidth) {
    height: calc(100vh - 10.3rem);
  }
}
.cards {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  @media (min-width: $desktopWidth) {
    width: calc(100%);
  }
  @media (max-width: $tabletWidth) {
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
    @media(max-width: $tabletWidth) {
      display: none;
    }
  }
}
.col {
  max-width: 53.2rem;
  width: calc(50% - 1.5rem);
  @media (min-width: $tabletWidth) {
    min-width: 40rem;
  }
  @media (max-width: $tabletWidth) {
    width: auto;
    max-width: none;
    min-width: none;
  }
}
.col + .col {
  margin-left: 3rem;
  @media (max-width: $tabletWidth) {
    margin-left: 0;
  }
}

</style>
