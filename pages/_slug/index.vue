<template>
  <div>
    <N-Preloader v-if="$fetchState.pending" />
    <n-intro-slug v-else>
      <template>
        <NGridCard
          ref="contentGrid"
          class="content"
          :class="[$style.content, showAnimate && $style.animateContent]"
          :items="cards"
          :description="introTitle"
          :intro-data="introData && introData"
          :author="author"
          :selectedSection="selectedSection"
          :selectedMode="selectedMode"
          :selectAsc="selectAsc"
          @clickTag="clickTag"
          @sendSection="sendSection"
          @sendNovelty="sendNovelty"
          @sendMode="sendMode"
          @sendCategory="sendCategory"
          @sendCategoryNumber="sendCategoryNumber"
        />
      </template>
    </n-intro-slug>
    <div :ref="loadingContainer" :class="$style.loadingContainer">
      <n-observer :class="$style.observer" @intersect="lazyPagination" />
      <N-Loading v-if="cardsLoading" :class="$style.loading" />
    </div>
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  useRouter,
  useContext,
  useFetch,
  useMeta,
  computed, onMounted, nextTick, onUpdated
  // useMeta,
} from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import animationGSAP from '~/helpers/compositions/animationGSAP'
// import { pagination } from '~/plugins/pagination'
// import { head } from '@/components/scripts/head.js'

export default defineComponent({
  name: 'SlugCard',
  key: ({ path }) => {
    return path
  },
  // components: { vSelect },
  setup () {
    const router = useRouter()

    const { store, route, $gsap } = useContext()
    const cards = ref([])
    const author = ref()
    const startCards = ref([])
    const background = ref(null)
    const totalPage = ref([])
    const pageNumber = ref(2)
    const introData = ref()
    const tagId = computed(() => Number(route.value.query.tag))
    const id = computed(() => {
      switch (route.value.params.slug) {
        case 'music': return 1
        case 'media': return 2
        case 'art': return 3
        case 'kitchen': return 4
        case 'library': return 5
        case 'photo': return 6
        case 'fashion': return 7
        case 'shop': return 8
        case 'event': return 9
        case 'coin': return 10
      }
    })
    const authorId = computed(() => Number(route.value.query.author))
    const cardsLoading = ref(false)
    const loading = ref(false)
    const fetchLoading = ref(false)
    const loadingContainer = ref(null)
    const cardsDispatch = ref(true)
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const selectSection = ref(0)
    const selectDescAsc = ref('desc')
    const selectCategory = ref('')
    const selectPresent = ref(null)
    const selectMode = ref('created_at')
    const selectCategoryNumber = ref()
    const priceFetch = ref(1)
    const scrollHeight = computed(() => store?.state?.content?.scrollHeight)
    const metaTitle = computed(() => store?.state?.content?.sections?.data)
    const firstRender = ref(true)
    const selectedSection = ref(0)
    const selectedMode = ref(0)
    const selectAsc = ref(false)

    const sendSection = (value) => {
      selectCategoryNumber.value = null
      selectCategory.value = ''
      if (value === 8) {
        value = 9
      }
      if (value === 0) {
        selectSection.value = 0
      } else {
        selectSection.value = value
      }
      searchCards()
    }
    const sendNovelty = (value) => {
      if (value) {
        selectDescAsc.value = 'desc'
      } else {
        selectDescAsc.value = 'asc'
      }
      searchCards()
    }
    const sendCategory = (value) => {
      selectSection.value = 0
      selectCategory.value = value
      searchCards()
    }
    const sendCategoryNumber = (value) => {
      selectCategoryNumber.value = value
    }
    const sendMode = (value) => {
      if (value === 0) {
        selectMode.value = 'created_at'
        selectPresent.value = null
      } else if (value === 1) {
        selectMode.value = 'price'
        selectPresent.value = null
      } else if (value === 2) {
        selectMode.value = 'like_count'
        selectPresent.value = null
      } else if (value === 3) {
        selectMode.value = 'created_at'
        selectPresent.value = true
      }
      searchCards()
    }
    useMeta(() => ({
      title: metaTitle.value[id.value - 1]?.seo_title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: metaTitle.value[id.value - 1]?.seo_title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: metaTitle.value[id.value - 1]?.seo_description
        },
        {
          hid: 'description',
          name: 'description',
          property: 'description',
          content: metaTitle.value[id.value - 1]?.seo_description
        }
      ]
    }))
    const searchCards = async () => {
      fetchLoading.value = false
      pageNumber.value = 2
      cardsDispatch.value = true
      const params = {
        page: 1,
        count: 6,
        section_id: selectSection.value ? selectSection.value : '',
        category_id: selectCategory.value ? selectCategory.value : '',
        order_by_column: selectMode.value,
        order_by_mode: selectDescAsc.value,
        minPrice: priceFetch.value,
        present: selectPresent.value,
        show_in_native: id.value !== 8 ? true : ''
      }
      const path = 'pages/getData'
      const response = await store.dispatch(path, params)
      cards.value = [...response.data]
      startCards.value = [...cards.value]
      fetchLoading.value = true
      const lastCards = {
        cards: startCards.value,
        section: id.value,
        page: pageNumber.value
      }
      localStorage.setItem('lastCards', JSON.stringify(lastCards))
      if (id.value === 8) {
      const lastSection = {
        section: id.value,
        searchSection: selectSection.value,
        searchMode: selectDescAsc.value,
        searchCategory: selectCategory.value,
        searchCategoryNumber: selectCategoryNumber.value,
        searchColomn: selectMode.value,
        searchPresent: selectPresent.value
      }
        localStorage.setItem('lastSection', JSON.stringify(lastSection))
      }
    }

    const introTitle = computed(() => {
      if (id.value) {
        const findSection = store?.state?.content.sections.data.find((item) => {
          return Number(item.id) === id.value
        })
        return {
          title: findSection.title,
          subtitle: findSection?.description,
          background: route.value.params.slug
        }
      } else if (tagId.value && cards.value.value && cards.value?.value.length > 0) {
          const findTags = cards.value?.value[0]?.tags?.find((item) => {
            return Number(item.id) === tagId.value
          })
          return {
            title: findTags?.title,
            subtitle: findTags?.description,
            background: route.value.params.slug
          }
        } else {
        return {
          title: '',
          subtitle: '',
          background: route.value.params.slug
        }
      }
    })

    const {
      animateNavbar
    } = animationGSAP($gsap, Elastic)

    onMounted(() => {
      store.commit('content/changeAnimationEnd', true)
      store.commit('content/setAnimate', false)
      store.commit('content/setSingleAnimation', false)
      nextTick(() => {
        $gsap.to('.subtitleLogo', {
          scrollTrigger: {
            trigger: '.content',
            start: 10,
            end: () => 20,
            scrub: true
          },
          opacity: 0
        })
      })
      if (!localStorage.getItem('lastSection') || JSON.parse(localStorage.getItem('lastSection')).section !== id.value) {
        const lastSection = {
          section: id.value
        }
        localStorage.setItem('lastSection', JSON.stringify(lastSection))
        store.commit('content/setScrollHeight', 0)
      }
    })

    onUpdated(() => {
      nextTick(() => {
          store.commit('content/setHeaderHidden', true)
          if (firstRender.value) {
            firstRender.value = false
          if (JSON.parse(localStorage.getItem('lastSection')).section === id.value) {
            window.scroll({
              top: scrollHeight.value,
              left: 0
            })
          }
          nextTick(() => {
            animateNavbar('.navbarSlug')
          })
        }
      })
    })

    const fetchData = async (currentPage) => {
      const params = {
        page: 1,
        count: 6,
        category_id: '',
        section_id: id.value,
        tags: tagId.value ? [tagId.value] : '',
        authors: authorId.value ? [authorId.value] : '',
        order_by_column: selectMode.value,
        order_by_mode: selectDescAsc.value,
        minPrice: id.value === 8 ? priceFetch.value : '',
        show_in_native: id.value !== 8 ? true : ''
      }
      const path = 'pages/getData'
      const response = await store.dispatch(path, params)
      return response
    }

    useFetch(async () => {
        try {
          const response = await fetchData()
          if (authorId.value) {
            const authorResponse = await fetchAuthor()
            author.value = authorResponse
          }
          if (response.data.length < 6) {
            cardsDispatch.value = false
          }
          introData.value = response.quote
          fetchLoading.value = true
          cards.value = [...response.data]
          startCards.value = [...cards.value]
          if (JSON.parse(localStorage.getItem('lastCards')) && JSON.parse(localStorage.getItem('lastCards')).section === id.value) {
            cards.value = JSON.parse(localStorage.getItem('lastCards')).cards
            startCards.value = [...cards.value]
            pageNumber.value = JSON.parse(localStorage.getItem('lastCards')).page
            if (JSON.parse(localStorage.getItem('lastSection')).section === 8) {
              selectSection.value = JSON.parse(localStorage.getItem('lastSection')).searchSection
              selectMode.value = JSON.parse(localStorage.getItem('lastSection')).searchColomn
              if (JSON.parse(localStorage.getItem('lastSection')).searchCategory) {
                selectCategory.value = JSON.parse(localStorage.getItem('lastSection')).searchCategory
                selectSection.value = ''
                selectedSection.value = JSON.parse(localStorage.getItem('lastSection')).searchCategoryNumber
                selectCategoryNumber.value = JSON.parse(localStorage.getItem('lastSection')).searchCategoryNumber
              } else {
                selectedSection.value = JSON.parse(localStorage.getItem('lastSection')).searchSection
              }
              if (JSON.parse(localStorage.getItem('lastSection')).searchMode === 'asc') {
                selectAsc.value = true
                selectDescAsc.value = 'asc'
              }
              selectPresent.value = JSON.parse(localStorage.getItem('lastSection')).searchPresent
              switch (JSON.parse(localStorage.getItem('lastSection')).searchColomn) {
                case 'created_at': {
                  selectedMode.value = 0
                  if (JSON.parse(localStorage.getItem('lastSection')).searchPresent) {
                    selectedMode.value = 3
                  }
                  return
                }
                case 'price': {
                  selectedMode.value = 1
                  return
                }
                case 'like_count': {
                  selectedMode.value = 2
                  return
                }
              }
            }
          }
          const lastCards = {
            cards: startCards.value,
            section: id.value,
            page: pageNumber.value
          }
          localStorage.setItem('lastCards', JSON.stringify(lastCards))
        } catch (e) {
          console.log(e)
        }
    })

    const fetchAuthor = () => {
      if (authorId.value) {
        const params = {
          id: authorId.value
        }
        const response = store.dispatch('pages/getAuthorById', params)
        return response
      }
    }

    // const getPageInfo = computed(() => {
    //   const sections = store.state.content.sections
    //   const result = sections?.filter(section => section.slug === route.value.params.slug)
    //   return result[0]
    // })

    // head(useMeta, getPageInfo.value)

    // const { getData, dataPagination } = pagination(fetchData)

    const lazyPagination = async () => {
      if (id.value !== 8) {
        selectSection.value = id.value
    }
    if (cardsDispatch.value && fetchLoading.value) {
      cardsLoading.value = true
      const params = {
        page: pageNumber.value,
        count: 6,
        section_id: selectSection.value ? selectSection.value : null,
        category_id: selectCategory.value,
        // tags: tagId.value ? [tagId.value] : null,
        // authors: authorId.value ? [authorId.value] : null,
        order_by_column: selectMode.value,
        order_by_mode: selectDescAsc.value,
        minPrice: id.value === 8 ? priceFetch.value : null,
        present: selectPresent.value,
        show_in_native: id.value !== 8 ? true : ''
      }
      pageNumber.value++

      const response = await store.dispatch('pages/getData', params)
      if (response.data.length < 6) {
        cardsDispatch.value = false
      }
        cardsLoading.value = false
        cards.value = [...startCards.value, ...response.data]
        startCards.value = [...cards.value]
        const lastCards = {
          cards: startCards.value,
          section: id.value,
          page: pageNumber.value
        }
        localStorage.setItem('lastCards', JSON.stringify(lastCards))

          console.log(selectSection.value, selectDescAsc.value, selectCategory.value, selectMode.value, id.value)
          if (id.value === 8) {
            const lastSection = {
              section: id.value,
              searchSection: selectSection.value,
              searchMode: selectDescAsc.value,
              searchCategory: selectCategory.value,
              searchCategoryNumber: selectCategoryNumber.value,
              searchColomn: selectMode.value,
              searchPresent: selectPresent.value
            }
            localStorage.setItem('lastSection', JSON.stringify(lastSection))
          }
      }
    }

    const clickTag = (value) => {
      router.push({ path: `/tags/${value}` })
    }

    store.commit('content/changeBgIntro', route.value.params.slug)

    return {
      clickTag,
      lazyPagination,
      introTitle,
      cards,
      author,
      totalPage,
      id,
      priceFetch,
      loading,
      background,
      showAnimate,
      startCards,
      pageNumber,
      loadingContainer,
      cardsLoading,
      cardsDispatch,
      fetchLoading,
      introData,
      selectSection,
      selectDescAsc,
      selectCategory,
      selectMode,
      selectPresent,
      searchCards,
      sendSection,
      sendNovelty,
      sendCategory,
      sendCategoryNumber,
      sendMode,
      metaTitle,
      scrollHeight,
      firstRender,
      selectedSection,
      selectedMode,
      selectAsc
    }
  },
  head: {}
})
</script>

<style scoped lang="scss" module>
.main {
  @include container;
}
.content {}

.loadingContainer{
  position: relative;
  bottom: 0;
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading {
    width: 3rem;
    height: 3rem;
  }
}
.observer {
  height: 100%;
}
.row{
  position: relative;
  display: flex;
  gap: 2rem;
  justify-content: center;
  .select {
    width: 20.3rem;
    border-radius: 25px;
    @include regular-text-bold;
    color: $fontColorDefault;
    border: none;
    // border-bottom: .2rem solid #C83F8E;
    outline: none;
    margin-bottom: 1.5rem;
    :global(.vs__dropdown-toggle) {
      border: none;
      padding: 0;
      border-radius: 25px;
      height: 4.4rem;
      :global(.vs__selected-options) {
        padding: 0;
        :global(.vs__search) {
          padding: 0 0 0 2rem;
          font-size: 1.4rem !important;
        }
        :global(.vs__selected) {
          cursor: pointer;
          margin: 0;
          padding: 0 0 0 2rem;
        }
      }
      :global(.vs__actions) {
        margin: 1.3rem 0;
        padding: 0 2rem 0 0;
        :global(.vs__open-indicator) {
          fill: #C83F8E
        }
        :global(.vs__clear) {
          display: none
        }
      }
    }
    :global(.vs__dropdown-option) {
      height: 4.5rem;
      display: flex;
      font-size: 1.6rem;
      align-items: center;
    }
    :global(.vs__dropdown-option--highlight) {
      background: #C83F8E;
    }
  }
}
</style>
