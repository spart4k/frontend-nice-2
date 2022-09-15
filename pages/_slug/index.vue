<template>
  <div>
    <n-intro-slug>
      <div v-if="$fetchState.pending">
        Загрузка ...
      </div>
      <template v-else>
        <div v-if="selectors.id === '8'" :class="$style.row">
          <v-select
            v-model="selectFirst"
            :options="sections"
            :class="$style.select"
            @input="searchCards"
          />
          <v-select
            v-model="selectSecond"
            :options="novelty"
            :class="$style.select"
            @input="searchCards"
          />
        </div>
        <NGridCard
          ref="content"
          class="content"
          :class="[$style.content, showAnimate && $style.animateContent]"
          :items="cards"
          :description="introTitle"
          :intro-data="introData && introData"
          :author="author"
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
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

// import { pagination } from '~/plugins/pagination'
// import { head } from '@/components/scripts/head.js'

export default defineComponent({
  name: 'SlugCard',
  key: ({ path }) => {
    return path
  },
  components: { vSelect },
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
    const id = computed(() => Number(route.value.query.id))
    const tagId = computed(() => Number(route.value.query.tag))
    const authorId = computed(() => Number(route.value.query.author))
    const cardsLoading = ref(false)
    const loading = ref(false)
    const fetchLoading = ref(false)
    const loadingContainer = ref(null)
    const cardsDispatch = ref(true)
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const selectors = computed(() => {
      return route.value.query
    })
    const novelty = ref(['Новые', 'Старые'])
    const sections = ref(['Все', 'Музыка', 'Видео', 'Искусство', 'Кухня', 'Чтиво', 'Фото', 'Одежда', 'Анонсы'])
    const selectFirst = ref(sections.value[0])
    const selectSecond = ref(novelty.value[0])
    const searchCards = () => {
      if (selectFirst.value === null) {
        selectFirst.value = sections.value[0]
      } else if (selectSecond.value === null) {
        selectSecond.value = novelty.value[0]
      } else {
        console.log(selectFirst.value, selectSecond.value)
      }
      // const params = {
      //   page: 1,
      //   count: 6,
      //   section_id: id.value ? id.value : '',
      //   tag_id: tagId.value ? tagId.value : '',
      //   author_id: authorId.value ? authorId.value : ''
      // }
      // const path = 'pages/getData'
      // const response = store.dispatch(path, params)
      // return response
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
        section_id: id.value ? id.value : '',
        tag_id: tagId.value ? tagId.value : '',
        author_id: authorId.value ? authorId.value : ''
      }
      const path = 'pages/getData'
      const response = store.dispatch(path, params)
      return response
    }

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
    if (cardsDispatch.value && fetchLoading.value) {
      cardsLoading.value = true
      const params = {
        page: pageNumber.value,
        count: 6,
        section_id: id.value ? id.value : '',
        tag_id: tagId.value ? tagId.value : '',
        author_id: authorId.value ? authorId.value : ''
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
      try {
        if (authorId.value) {
          const authorResponse = await fetchAuthor()
          author.value = authorResponse
        }
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
      author,
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
      introData,
      novelty,
      sections,
      selectFirst,
      selectSecond,
      searchCards,
      selectors
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
    width: 20rem;
    @include regular-text;
    color: $fontColorDefault;
    border: none;
    // border-bottom: .2rem solid #C83F8E;
    outline: none;
    margin-bottom: 1.5rem;
    :global(.vs__dropdown-toggle) {
      border: none;
      padding: 0;
      :global(.vs__selected-options) {
        padding: 0;
        :global(.vs__search) {
          padding: 0;
          font-size: 1.4rem !important;
        }
        :global(.vs__selected) {
          margin: 0;
          padding: 0;
        }
      }
      :global(.vs__actions) {
        margin: 1.3rem 0;
        padding: 0;
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
