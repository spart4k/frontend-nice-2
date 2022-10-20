<template>
  <div>
    <div :class="$style.cards">
      <template v-if="spliceArray.colLeft && spliceArray.colRight">
        <div :class="$style.col">
          <div
            v-for="(card, index) in spliceArray.colLeft"
            :key="index"
          >
            <template v-if="(selectors.id === '8') && card.hasOwnProperty('preview')">
              <n-section-intro
                v-if="card.hasOwnProperty('preview')"
                :key="card.id"
                :description="card"
                :image="card.image"
                :class="$style.preview"
              />
              <div v-if="selectors.id === '8'" :class="$style.rowMobile">
                <N-Select :class="$style.select" :select-items="sections" @setProperty="($event) => $emit('sendSection', $event)" />
                <N-Select :class="$style.select" :select-items="searchMode" @setProperty="($event) => $emit('sendMode', $event)" />
                <div :class="$style.selectPriority"  @click="$emit('sendNovelty', noveltyCount); noveltyCount = !noveltyCount">
                  <n-icon :style="{transform: noveltyCount ? 'rotate(180deg)' : 'rotate(0deg)'}" name="arrow-select" :class="$style.icon" />
                </div>
              </div>
            </template>
            <n-section-intro
              v-else-if="card.hasOwnProperty('preview')"
              :key="card.id"
              :description="card"
              :image="card.image"
              :class="$style.preview"
            />
            <div v-else-if="card.hasOwnProperty('home')" :key="card.id" :class="$style.image">
              <img :src="card.image" alt="DOG ">
            </div>
            <N-Card-Author v-else-if="card.hasOwnProperty('author_data')" :author="card" :class="$style.authorCard" />
            <template v-else>
              <section-cards :key="card.id" :section="card.section" :class="$style.cards__item" :card="card" />
            </template>
          </div>
        </div>
        <div v-if="spliceArray.colRight.length || (selectors.id === '8')" :class="$style.col">
          <div v-if="selectors.id === '8'" :class="$style.row">
            <N-Select :class="$style.select" :select-items="sections" @setProperty="($event) => $emit('sendSection', $event)" />
            <N-Select :class="$style.select" :select-items="searchMode" @setProperty="($event) => $emit('sendMode', $event)" />
            <div :class="$style.selectPriority"  @click="$emit('sendNovelty', noveltyCount); noveltyCount = !noveltyCount">
              <n-icon :style="{transform: noveltyCount ? 'rotate(180deg)' : 'rotate(0deg)'}" name="arrow-select" :class="$style.icon" />
            </div>
          </div>
          <template v-for="(card) in spliceArray.colRight">
            <section-cards
              :key="card.id"
              :section="card.section"
              :card="card"
              :class="$style.cards__item"
              @clickTag="($event) => $emit('clickTag', card.section.id)"
            />
          </template>
        </div>
      </template>
    </div>
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
    },
    introData: {
      type: Object
    },
    author: {
      type: Object
    }
  },

  setup (props) {
    const { route } = useContext()
    const proxyArray = ref(props.items)
    const selectors = computed(() => {
      return route.value.query
    })
    const leftArray = ref()
    const rightArray = ref()
    const noveltyCount = ref(false)
    const widthFrame = computed(() => {
      if (process.browser) {
        return window.innerWidth
      }
    })
    const spliceArray = computed(() => {
      if (route.value.query.author) {
        proxyArray.value.unshift({
          author_data: props.author
        })
      } else if (!route.value.query.tag && !route.value.query.author) {
        if (!props.homePage) {
          proxyArray.value.unshift({
            image: route.value.params.slug,
            title: props.description.title,
            text: props.introData?.quote_text,
            author: props.introData?.author,
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
      }
      const firstHalfDesktop = ref([])
      const secondHalfDesktop = ref([])
      proxyArray.value.forEach((item, index) => {
        if (index % 2 === 0) {
          firstHalfDesktop.value.push(item)
        } else {
          secondHalfDesktop.value.push(item)
        }
      })
      const middleIndex = Math.ceil(proxyArray.value?.length / 2)
      const firstHalf = proxyArray.value?.splice(0, middleIndex)
      const secondHalf = ref()
      if (proxyArray.value.length === 1) {
        secondHalf.value = proxyArray.value
      } else {
        secondHalf.value = proxyArray.value.splice(-middleIndex)
      }
      if (widthFrame.value) {
        return {
          colLeft: firstHalfDesktop.value,
          colRight: secondHalfDesktop.value
        }
      } else {
        return {
          colLeft: firstHalf,
          colRight: secondHalf.value
        }
      }
    })
    const searchMode = ref(['Новизна', 'Цена', 'Популярность', 'Наличие'])
    const sections = ref(['Все товары', 'Музыка', 'Видео', 'Искусство', 'Кухня', 'Чтиво', 'Фото', 'Одежда', 'Анонсы'])

  watch(() => props.items, () => {
    proxyArray.value = props.items
  })

  return {
    spliceArray,
    proxyArray,
    selectors,
    searchMode,
    sections,
    leftArray,
    rightArray,
    noveltyCount,
    widthFrame
    }
  }
}
</script>

<style scoped lang="scss" module>
.preview {
    height: 55rem !important;
  // @media (max-width: $tabletWidth) {
  //   height: calc(100vh - 10.3rem);
  // }
  @media (max-width: $tabletWidth) {
    height: calc(100vh - 17.5rem) !important;
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
    // max-width: calc(100% - 1.5rem);
    // min-width: 30rem;
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
  @media (min-width: $desktopWidth) {
    min-width: 60rem;
  }
  @media (min-width: $tabletWidth) and (max-width: $desktopWidth) {
    min-width: 40rem;
  }
  @media (max-width: $tabletWidth) {
    width: auto;
    max-width: none;
    min-width: none;
  }
  .authorCard {
    margin-bottom: 2rem;
  }
  .row {
    display: flex;
    justify-content: flex-end;
    gap: 1.5rem;
    margin-bottom: 4rem;
    @media (max-width: $tabletWidth) {
      display: none;
    }
    .select {
      width: 20.3rem;
      height: 4.4rem;
    }
    .selectPriority {
      width: 4.4rem;
      height: 4.4rem;
      background: white;
      z-index: 1;
      display: flex;
      align-items: center;
      border-radius: 50%;
      justify-content: center;
      cursor: pointer;
      .icon {
        transition-duration: .5s;
        z-index: 5;
        color: $pink2;
      }
    }
  }
  .rowMobile{
    display: flex;
    justify-content: flex-end;
    gap: 1.5rem;
    margin-bottom: 4rem;
    @media (min-width: $tabletWidth) {
      display: none;
    }
    .select {
      width: 14.3rem;
      height: 4.4rem;
    }
    .selectPriority {
      width: 4.4rem;
      height: 4.4rem;
      background: white;
      z-index: 1;
      display: flex;
      align-items: center;
      border-radius: 50%;
      justify-content: center;
      cursor: pointer;
      .icon {
        transition-duration: .5s;
        z-index: 5;
        color: $pink2;
      }
    }
  }
}
.col + .col {
  margin-left: 3rem;
  @media (max-width: $tabletWidth) {
    margin-left: 0;
  }
}
</style>
