<template>
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
        @clickTag="clickTag"
      />
    </template>
  </n-intro-slug>
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
    const background = ref(null)
    const totalPage = ref([])
    const id = computed(() => Number(route.value.query.id))
    const tagId = computed(() => Number(route.value.query.tag))
    const loading = ref(false)
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
        nextTick(() => {
          $gsap.to('.subtitleLogo', {
            scrollTrigger: {
              trigger: '.content',
              start: 10,
              end: () => 100,
              scrub: true
            },
            opacity: 0
          })
          // const content = document.querySelector('.content')
        })
    })

    const isPageMagazin = computed(() => route.value.path.indexOf('magazin'))

    const fetchData = (currentPage) => {
      const params = {
        page: currentPage,
        count: 10
        // section_id: id.value ? id.value : '',
        // tag_id: tagId.value ? tagId.value : ''
      }
      const path = isPageMagazin > 0 ? 'shop/getData' : 'pages/getData'
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

    const lazyPagination = ($state) => {
      // getData($state, cards.value.value.last_page)
      // cards.value.value.data = [...cards.value.value.data, ...dataPagination.value]
      console.log('test', route.value)
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
        const response = await fetchData()
        cards.value = [...response.data]
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
      showAnimate
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
</style>
