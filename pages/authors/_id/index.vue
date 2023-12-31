<template>
  <div>
    <N-Preloader v-if="!fetchLoading" />
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
          @clickTag="clickTag"
          @sendSection="sendSection"
          @sendNovelty="sendNovelty"
          @sendMode="sendMode"
          @sendCategory="sendCategory"
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
  // useFetch,
  useAsync,
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
  setup (_, {root}) {
    const router = useRouter()
    const { store, route, $gsap } = useContext()
    const cards = ref([])
    const author = ref()
    const startCards = ref([])
    const background = ref(null)
    const totalPage = ref([])
    const pageNumber = ref(2)
    const introData = ref()
    const metaDesc = ref('')
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
    const authorId = computed(() => {
        return route.value.params.id
    })
    const cardsLoading = ref(false)
    const loading = ref(false)
    const fetchLoading = ref(false)
    const loadingContainer = ref(null)
    const cardsDispatch = ref(true)
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const selectFirst = ref(0)
    const selectSecond = ref('desc')
    const selectThird = ref('')
    const selectPresent = ref(null)
    const selectMode = ref('created_at')
    const priceFetch = ref(1)
    const metaTags = ref({})
    const scrollHeight = computed(() => store?.state?.content?.scrollHeight)
    const metaTitle = computed(() => store?.state?.content?.sections?.data)
    const firstRender = ref(true)

    const sendSection = (value) => {
      selectThird.value = ''
      if (value === 8) {
        value = 9
      }
      if (value === 0) {
        selectFirst.value = 0
      } else {
        selectFirst.value = value
      }
      searchCards()
    }
    const sendNovelty = (value) => {
      if (value) {
        selectSecond.value = 'desc'
      } else {
        selectSecond.value = 'asc'
      }
      searchCards()
    }
    const sendCategory = (value) => {
      selectFirst.value = 0
      selectThird.value = value
      searchCards()
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
      title: author.value?.name,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: author.value?.name
        },
        {
          hid: 'description',
          name: 'description',
          content: metaDesc.value
        },
        {
          property: 'og:url',
          content: root.$axios.defaults.baseURL
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: metaTags.value?.seo_title
        },
        {
          property: 'og:description',
          content: metaDesc.value
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: `${root.$axios.defaults.baseURL}/${author.value?.avatar?.src}`
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: root.$axios.defaults.baseURL
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: metaTags.value?.seo_title
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: metaDesc.value
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          property: 'twitter:image',
          content: `${root.$axios.defaults.baseURL}/${author.value?.avatar?.src}`
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
        section_id: selectFirst.value ? selectFirst.value : '',
        categories: selectThird.value ? [selectThird.value] : null,
        order_by_column: selectMode.value,
        order_by_mode: selectSecond.value,
        minPrice: priceFetch.value,
        present: selectPresent.value
      }
      const path = 'pages/getData'
      const response = await store.dispatch(path, params)
      cards.value = [...response.data]
      startCards.value = [...cards.value]
      fetchLoading.value = true
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
      store.commit('content/changeContentLoader', true)
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
      if (!localStorage.getItem('lastSection') || JSON.parse(localStorage.getItem('lastSection')).section !== route.value.path) {
        const lastSection = {
          section: route.value.path
        }
        localStorage.setItem('lastSection', JSON.stringify(lastSection))
        store.commit('content/setScrollHeight', 0)
      }
    })

    onUpdated(() => {
      if (window.innerWidth < 900) {
        store.commit('content/setHeaderHidden', true)
        if (firstRender.value) {
          firstRender.value = false
          if (JSON.parse(localStorage.getItem('lastSection')).section === route.value.path && scrollHeight.value !== 0) {
            window.scroll({
              top: scrollHeight.value,
              left: 0
            })
          }
          nextTick(() => {
            animateNavbar('.navbarSlug')
          })
        }
      } else {
        nextTick(() => {
          store.commit('content/setHeaderHidden', true)
          if (firstRender.value) {
            firstRender.value = false
            if (JSON.parse(localStorage.getItem('lastSection')).section === route.value.path && scrollHeight.value !== 0) {
                window.scroll({
                  top: 0,
                  left: 0
                })
                nextTick(() => {
                  window.scroll({
                    top: scrollHeight.value,
                    left: 0
                  })
                })
            }
            nextTick(() => {
              animateNavbar('.navbarSlug')
            })
          }
        })
      }
    })

    const fetchData = async (currentPage) => {
      const params = {
        page: 1,
        count: 6,
        categories: '',
        section_id: id.value,
        tags: tagId.value ? [tagId.value] : '',
        authors: authorId.value ? [authorId.value] : '',
        order_by_column: selectMode.value,
        order_by_mode: selectSecond.value,
        minPrice: id.value === 8 ? priceFetch.value : ''
      }
      const path = 'pages/getData'
      const response = await store.dispatch(path, params)
      return response
    }

    useAsync(async () => {
        try {
          const response = await fetchData()
          const seo = await store.dispatch('main/getSeo')
          metaTags.value = seo.data.data[0]
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
          if (JSON.parse(localStorage.getItem('lastCards')) && JSON.parse(localStorage.getItem('lastCards')).section === route.value.path) {
            cards.value = JSON.parse(localStorage.getItem('lastCards')).cards
            startCards.value = [...cards.value]
            pageNumber.value = JSON.parse(localStorage.getItem('lastCards')).page
          }
        } catch (e) {
        }
    })

    const fetchAuthor = async () => {
      if (authorId.value) {
        const params = {
          id: authorId.value
        }
        const response = await store.dispatch('pages/getAuthorById', params)
        function cutTegs (str) {
          const regex = /( |<([^>]+)>)/ig
          const result = str.replace(regex, '')
          return result
        }
        metaDesc.value = cutTegs(response.description)
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
        selectFirst.value = id.value
    }
    if (cardsDispatch.value && fetchLoading.value) {
      cardsLoading.value = true
      const params = {
        page: pageNumber.value,
        count: 6,
        section_id: selectFirst.value ? selectFirst.value : null,
        categories: selectThird.value ? [selectThird.value] : null,
        tags: tagId.value ? [tagId.value] : null,
        authors: authorId.value ? [authorId.value] : null,
        order_by_column: selectMode.value,
        order_by_mode: selectSecond.value,
        minPrice: id.value === 8 ? priceFetch.value : null,
        present: selectPresent.value
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
          section: route.value.path,
          page: pageNumber.value
        }
        localStorage.setItem('lastCards', JSON.stringify(lastCards))
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
      selectFirst,
      selectSecond,
      selectThird,
      selectMode,
      selectPresent,
      searchCards,
      sendSection,
      sendNovelty,
      sendCategory,
      sendMode,
      metaTitle,
      scrollHeight,
      firstRender,
      metaTags
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
