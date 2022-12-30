<template>
    <div :class="$style.cards">
      <!-- <template v-if="spliceArray.colLeft && spliceArray.colRight">
        <div :class="$style.col">
          <div
            v-for="(card, index) in spliceArray.colLeft"
            :key="index"
            @click="saveHeight"
          >
            <template v-if="(selectors === 'shop') && card.hasOwnProperty('preview')">
              <n-section-intro
                v-if="card.hasOwnProperty('preview')"
                :key="card.id"
                :description="card"
                :image="card.image"
                :class="$style.preview"
              />
              <div v-if="selectors === 'shop'" :class="$style.rowMobile">
                <N-Select :class="$style.select" :selectedValue="selectedSection" :select-items="sections" @setProperty="sendSection" />
                <N-Select :class="$style.select" :selectedValue="selectedMode" :select-items="searchMode" @setProperty="sendMode" />
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
        <template v-if="spliceArray.colRight">
          <div v-if="spliceArray.colRight.length || (selectors === 'shop')" :class="$style.col">
            <div v-if="selectors === 'shop'" :class="$style.row">
              <N-Select :class="$style.select" :selectedValue="selectedSection" :select-items="sections" @setProperty="sendSection" />
              <N-Select :class="$style.select" :selectedValue="selectedMode" :select-items="searchMode" @setProperty="sendMode" />
              <div :class="$style.selectPriority"  @click="$emit('sendNovelty', noveltyCount); noveltyCount = !noveltyCount">
                <n-icon :style="{transform: noveltyCount ? 'rotate(180deg)' : 'rotate(0deg)'}" name="arrow-select" :class="$style.icon" />
              </div>
            </div>
            <div v-for="(card, index) in spliceArray.colRight" :key="index" @click="saveHeight">
              <section-cards
                :key="card.id"
                :section="card.section"
                :card="card"
                :class="$style.cards__item"
                @clickTag="($event) => $emit('clickTag', card.section.id)"
              />
            </div>
          </div>
        </template>
      </template> -->
      <template v-if="spliceArray.colFull">
        <!-- <div :class="$style.col"> -->
        <client-only>
          <div v-masonry
          id="masonry"
          ref="masonryList"
          transition-duration="0"
          item-selector=".item"
          :class="$style.masonry"
          class="masonry-container">
            <template v-if="(selectors === 'shop') && previewCard.hasOwnProperty('preview')">
              <n-section-intro
                v-if="previewCard.hasOwnProperty('preview')"
                :description="previewCard"
                :image="previewCard.image"
                class="item"
                :class="[$style.preview, $style.masonryItem, transitionMasonry ? $style.transition: '']"
              />
              <div v-if="selectors === 'shop'" class="item" :class="[$style.rowMobile, $style.masonryItem, $style.filters, transitionMasonry ? $style.transition: '']">
                <N-Select :class="$style.select" :selectedValue="selectedSection" :select-items="sections" @setProperty="sendSection" />
                <N-Select :class="$style.select" :selectedValue="selectedMode" :select-items="searchMode" @setProperty="sendMode" />
                <div :class="$style.selectPriority"  @click="sendSort">
                  <n-icon :style="{transform: noveltyCount ? 'rotate(180deg)' : 'rotate(0deg)'}" name="arrow-select" :class="$style.icon" />
                </div>
              </div>
            </template>
            <n-section-intro
              v-else-if="previewCard.hasOwnProperty('preview')"
              :description="previewCard"
              :image="previewCard.image"
              class="item"
              :class="[$style.preview, $style.masonryItem, transitionMasonry ? $style.transition: '']"
            />
            <div v-else-if="previewCard.hasOwnProperty('home')" class="item" :class="[$style.image, $style.masonryItem, transitionMasonry ? $style.transition: '']">
              <img :src="previewCard.image" alt="DOG ">
            </div>
            <N-Card-Author v-else-if="previewCard.hasOwnProperty('author_data')" class="item" :author="previewCard" :class="[$style.authorCard, $style.masonryItem, transitionMasonry ? $style.transition: '']" />
            <div
              v-masonry-tile
              class="item"
              :class="[$style.masonryItem, transitionMasonry ? $style.transition: '']"
              v-for="(card, index) in spliceArray.colFull"
              :key="index"
              @click="saveHeight"
            >
              <template>
                <section-cards :key="card.id" :section="card.section" :class="$style.cards__item" :card="card" />
              </template>
            </div>
          </div>
        </client-only>
        <!-- </div> -->
      </template>
    </div>
</template>

<script>
import Vue from 'vue'
import { computed, onMounted, ref, useContext, onUnmounted, watch } from '@nuxtjs/composition-api'

export default {
  name: 'NGridCard',
  props: {
    selectedSection: {
      type: Number
    },
    selectedMode: {
      type: Number
    },
    selectAsc: {
      type: Boolean
    },
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

  setup (props, ctx) {
    const { store, route } = useContext()
    const proxyArray = ref(props.items)
    const selectors = computed(() => {
      return route.value.params.slug
    })
    const leftArray = ref()
    const { emit } = ctx
    const previewCard = ref({})
    const rightArray = ref()
    const isShowBottomMenu = computed(() => store.state.menu.isShowBottomMenu)
    const noveltyCount = ref(false)
    const windowWidth = ref()
    const masonryList = ref(null)
    const transitionMasonry = ref(false)
    const widthFrameStart = computed(() => {
      if (process.browser) {
        return window.innerWidth
      }
    })
    const saveHeight = () => {
      console.log(window.pageYOffset)
      store.commit('content/setScrollHeight', window.pageYOffset)
    }
    const windowWidthCount = () => {
      windowWidth.value = window.innerWidth
    }
    const masonryRebuild = () => {
      // window.dispatchEvent(new Event('resize'))
      Vue.prototype.$redrawVueMasonry()
    }
    const spliceArray = computed(() => {
      console.log('test')
      if (route.value.name === 'authors-id') {
        proxyArray.value.unshift({
          author_data: props.author
        })
      // } else if (!route.value.query.tag && !route.value.query.author) {
      } else if (route.value.name !== 'tags-id' && route.value.name !== 'authors-id') {
        if (!props.homePage) {
          previewCard.value = {
            image: route.value.params.slug,
            title: props.description.title,
            text: props.introData?.quote_text,
            author: props.introData?.author,
            preview: true,
            id: Math.random()
          }
          console.log(previewCard.value)
        } else {
          previewCard.value = {
            home: true,
            image: require('~/assets/img/preview/dogs.png'),
            id: Math.random()
          }
          console.log(previewCard.value)
        }
      }
      const firstHalfDesktop = ref([])
      const secondHalfDesktop = ref([])
      const fullArray = ref([])
      proxyArray.value.forEach((item, index) => {
        if (index % 2 === 0) {
          firstHalfDesktop.value.push(item)
        } else {
          secondHalfDesktop.value.push(item)
        }
        fullArray.value.push(item)
      })
      const middleIndex = Math.ceil(proxyArray.value?.length / 2)
      const firstHalf = proxyArray.value?.splice(0, middleIndex)
      const secondHalf = ref()
      if (proxyArray.value.length === 1) {
        secondHalf.value = proxyArray.value
      } else {
        secondHalf.value = proxyArray.value.splice(-middleIndex)
      }
      if (widthFrameStart.value) {
        return {
          colLeft: firstHalfDesktop.value,
          colRight: secondHalfDesktop.value,
          colFull: fullArray.value
        }
      } else {
        return {
          colLeft: firstHalf,
          colRight: secondHalf.value
        }
      }
    })
    const categories = ref([])
    const searchMode = ref(['Новизна', 'Цена', 'Популярность', 'Наличие'])
    const sections = ref(['Все товары', 'Музыка', 'Видео', 'Искусство', 'Кухня', 'Чтиво', 'Фото', 'Одежда', 'Анонсы'])
    const getСategories = async () => {
      const data = await store.dispatch('search/searchCards', {
        entity: 'categories',
        searchField: '',
        page: 1,
        count: 9999
      })
      data.data.data.forEach((item) => {
        sections.value.push(item.name)
        categories.value.push(item)
      })
    }
    const sendMode = (value) => {
      emit('sendMode', value)
    }
    const sendSection = (value) => {
      if (value >= 9) {
      emit('sendCategoryNumber', value)
      value -= 9
      categories.value.forEach((item, index) => {
        if (index === value) {
          emit('sendCategory', item.id)
        }
      })
      } else {
        emit('sendSection', value)
      }
    }

  onMounted(() => {
    windowWidthCount()
    window.addEventListener('resize', windowWidthCount)
    if (selectors.value === 'shop') {
      getСategories()
    }
    if (props.selectAsc) {
      noveltyCount.value = !noveltyCount.value
    }
    setTimeout(() => {
      const block = masonryList.value.childNodes
      block.forEach((item) => {
        if (item.style && item.style.left !== '0px') {
          console.log(item)
          item.style.left = '50%'
        }
      })
    }, 1000)
  })

  onUnmounted(() => {
      window.removeEventListener('resize', windowWidthCount)
    })

  watch(() => props.items, () => {
    console.log('item')
    proxyArray.value = props.items
  })
  const timeoutTransition = () => {
    const timeout = setTimeout(() => {
      transitionMasonry.value = false
    }, 2000)
    return timeout
  }
  const sendSort = () => {
    emit('sendNovelty', noveltyCount.value)
    noveltyCount.value = !noveltyCount.value
    setTimeout(() => {
      transitionMasonry.value = true
      masonryRebuild()
    }, 500)
  }
  watch(() => isShowBottomMenu.value, (curVal) => {
    let timer = null
    transitionMasonry.value = true
    if (curVal) {
      timer = 500
    } else {
      timer = 200
    }
    setTimeout((timer) => {
      masonryRebuild()
      console.log(timeoutTransition.value)
      setTimeout(() => {
      const block = masonryList.value.childNodes
        block.forEach((item) => {
          if (item.style && item.style.left !== '0px') {
            console.log(item)
            // item.style.left = '50%'
            // console.log('after', item)
          }
        })
      }, 300)
    }, timer)
  })
  const setLike = (state) => {
    console.log('set')
    console.log(state)
  }

  return {
    spliceArray,
    proxyArray,
    selectors,
    searchMode,
    sections,
    leftArray,
    rightArray,
    noveltyCount,
    widthFrameStart,
    windowWidth,
    windowWidthCount,
    saveHeight,
    getСategories,
    sendMode,
    sendSection,
    categories,
    masonryRebuild,
    isShowBottomMenu,
    previewCard,
    transitionMasonry,
    masonryList,
    timeoutTransition,
    sendSort,
    setLike
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
  @media (max-width: $mobileWidth) {
    height: calc(100vh - 17.5rem) !important;
  }
}
.cards {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  // @media (min-width: $desktopWidth) {
  //   width: calc(100%);
  // }
  // @media (max-width: $tabletWidth) {
  //   flex-direction: column;
  //   justify-content: center;
  //   width: 100%;
  // }
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
  @media (min-width: $desktopWideWidth) {
    min-width: 62rem;
    max-width: auto;
  }
  @media (min-width: $desktopWidth) and (max-width: $desktopWideWidth) {
    min-width: 40rem;
  }
  @media (min-width: $tabletWidth) and (max-width: $desktopWidth) {
    min-width: 47rem;
  }
  @media (max-width: $tabletWidth) {
    width: auto;
    max-width: none;
    min-width: none;
  }
  .authorCard {
    margin-bottom: 2rem;
  }
  .filters {
    .row {
      display: flex;
      justify-content: flex-end;
      gap: 1.5rem;
      margin-bottom: 4rem;
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
      @media (max-width: $tabletWidth) {
        width: 6.4rem;
      }
      .icon {
        transition-duration: .5s;
        z-index: 5;
        color: $pink2;
      }
    }
  }
.col + .col {
  margin-left: 3rem;
  @media (max-width: $tabletWidth) {
    margin-left: 0;
  }
}
.filters {
  display: flex;
  justify-content: flex-end;
  grid-gap: 1.5rem;
  gap: 1.5rem;
  margin-bottom: 4rem;
}
.masonry {
  width: 100%;
  max-width: 105rem;
  display: flex;
  .masonryItem {
    width: 50%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    &.transition {
      transition: .2s;
    }
    @media (max-width: $mobileWidth) {
      width: 100%;
      padding-left: 0rem;
      padding-right: 0rem;
    }
  }
}
</style>
