<template>
  <div>
    <n-preloader v-if="loading" />
    <template v-else>
      <NGridCard
        v-if="cards.value"
        ref="content"
        class="content"
        :class="[$style.content, showAnimate && $style.animateContent]"
        :items="cards.value"
        @clickTag="clickTag"
      />
    </template>
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  useRoute,
  useRouter,
  useAsync,
  useContext,
  computed,
  // useMeta,
  onMounted
} from '@nuxtjs/composition-api'

import { Elastic } from 'gsap'

import { pagination } from '~/plugins/pagination'
// import { head } from '@/components/scripts/head.js'
import animationGSAP from '~/helpers/compositions/animationGSAP'

export default defineComponent({
  name: 'SlugCard',
  middleware: 'background',
  // transition: 'home',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { store, $gsap } = useContext()
    const cards = ref([])
    const background = ref(null)
    const totalPage = ref([])
    const id = computed(() => Number(route.value.query.id))
    const tagId = computed(() => Number(route.value.query.tag))
    const loading = ref(false)
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)

    const {
      animationlogo,
      animateSubtitle,
      animateNavbar
    } = animationGSAP($gsap, Elastic)

    const introTitle = computed(() => {
      if (id.value) {
        const findSection = store?.state?.content.sections.find((item) => {
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

    const fetchData = (currentPage) => {
      const params = {
        page: currentPage,
        section_id: id.value ? id.value : '',
        tag_id: tagId.value ? tagId.value : ''
      }
      const response = store.dispatch('pages/getData', params)
      return response
    }

    // const getPageInfo = computed(() => {
    //   const sections = store.state.content.sections
    //   const result = sections?.filter(section => section.slug === route.value.params.slug)
    //   return result[0]
    // })

    onMounted(() => {
      animationlogo()
      animateSubtitle()
      animateNavbar()
    })

    // head(useMeta, getPageInfo.value)

    const { getData, dataPagination } = pagination(fetchData)

    const lazyPagination = ($state) => {
      getData($state, cards.value.value.last_page)
      cards.value.value.data = [...cards.value.value.data, ...dataPagination.value]
    }

    const clickTag = async (value) => {
      loading.value = true
      router.push({ path: 'tags', query: { tag: value } })
      const params = {
        page: 1,
        tag_id: value
      }
      const response = await store.dispatch('pages/getData', params)
      cards.value.value = [...response.data.data]
      loading.value = false
    }

    store.commit('content/changeBgIntro', route.value.params.slug)

    cards.value = useAsync(async () => {
      try {
        const response = await fetchData()
        return response.data.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.path)

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
      // getPageInfo
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
