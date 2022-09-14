<template>
  <div>
    <n-intro-slug>
      <div v-if="$fetchState.pending">
        Загрузка ...
      </div>
      <template v-else>
        <NGridCard
          ref="content"
          class="content"
          :class="[$style.content, showAnimate && $style.animateContent]"
          :items="cards"
          :description="introTitle"
          :intro-data="introData ? introData : {}"
          @clickTag="clickTag"
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
  computed, onMounted, nextTick
  // useMeta,
} from '@nuxtjs/composition-api'

// import { pagination } from '~/plugins/pagination'
// import { head } from '@/components/scripts/head.js'

export default defineComponent({
  name: 'SlugCard',
  key: ({ path }) => {
    return path
  },
  setup () {
    const router = useRouter()
    const { store, route, $gsap } = useContext()
    const cards = ref([])
    const startCards = ref([])
    const background = ref(null)
    const totalPage = ref([])
    const pageNumber = ref(2)
    const introData = ref()
    const id = computed(() => Number(route.value.query.id))
    const tagId = computed(() => Number(route.value.query.tag))
    const cardsLoading = ref(false)
    const loading = ref(false)
    const fetchLoading = ref(false)
    const loadingContainer = ref(null)
    const cardsDispatch = ref(true)
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)

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

    onMounted(() => {
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
    })

    const fetchData = (currentPage) => {
      const params = {
        page: 1,
        count: 6,
        section_id: id.value ? id.value : ''
        // tag_id: tagId.value ? tagId.value : ''
      }
      const path = 'pages/getData'
      const response = store.dispatch(path, params)
      return response
    }

    // const getPageInfo = computed(() => {
    //   const sections = store.state.content.sections
    //   const result = sections?.filter(section => section.slug === route.value.params.slug)
    //   return result[0]
    // })

    // head(useMeta, getPageInfo.value)

    // const { getData, dataPagination } = pagination(fetchData)

    const lazyPagination = async () => {
    if (cardsDispatch.value && fetchLoading.value) {
      cardsLoading.value = true
      const params = {
        page: pageNumber.value,
        count: 6,
        section_id: id.value ? id.value : ''
      }
      pageNumber.value++

      const response = await store.dispatch('pages/getData', params)
      if (!response.data.length) {
        cardsDispatch.value = false
        cardsLoading.value = false
      } else {
        cardsLoading.value = false
        cards.value = [...startCards.value, ...response.data]
        startCards.value = [...cards.value]
        }
      }
    }

    const clickTag = async (value) => {
      loading.value = true
      router.push({ path: 'tags', query: { tag: value } })
      const params = {
        page: 1,
        count: 10
        // tag_id: value
      }
      const response = await store.dispatch('pages/getData', params)
      cards.value.value = [...response.data]
      loading.value = false
    }

    useFetch(async () => {
      console.log(route.value.params.slug, route.value.query.tag)
      try {
        const response = await fetchData()
        introData.value = response.quote
        fetchLoading.value = true
        cards.value = [...response.data]
        startCards.value = cards.value
      } catch (e) {
        console.log(e)
      }
    })

    store.commit('content/changeBgIntro', route.value.params.slug)

    return {
      clickTag,
      lazyPagination,
      introTitle,
      cards,
      totalPage,
      id,
      loading,
      background,
      showAnimate,
      startCards,
      pageNumber,
      loadingContainer,
      cardsLoading,
      cardsDispatch,
      fetchLoading,
      introData
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
</style>
