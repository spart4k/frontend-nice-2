<template>
  <n-intro
    :description="introTitle"
    :is-show-animation="true"
  >
    <div class="content" :class="[showAnimate && $style.animateContent, $style.content]">
      <NGridCard
        v-if="cards.value && cards.value.data"
        ref="content"
        :items="cards.value.data"
        home-page
        @clickTag="clickTag"
      />
    </div>
  </n-intro>
</template>
<script>

import {
  ref,
  computed,
  defineComponent,
  useContext,
  useRoute,
  useRouter,
  useAsync,
  useMeta
} from '@nuxtjs/composition-api'

import { pagination } from '~/plugins/pagination'
import { head } from '@/components/scripts/head.js'

export default defineComponent({
  name: 'IndexPage',
  middleware: 'background',
  setup () {
    const { store } = useContext()
    const router = useRouter()
    const route = useRoute()
    const cards = ref([])
    const totalPage = ref(0)
    const content = ref(null)
    const background = ref(null)
    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
    })
    const pageInfo = ref({})
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const fetchData = async (currentPage) => {
      const params = {
        page: currentPage
      }
      const response = await store.dispatch('main/getData', params)
      return response
    }
    store.commit('content/clearBgIntro')

    cards.value = useAsync(async () => {
      try {
        const response = await fetchData()
        totalPage.value = response?.data.last_page
        return response.data
      } catch (e) {
        console.log(e)
      }
    }, route.value.fullPath)

    store.commit('content/clearBgIntro')
    const metaInfo = cards.value
    head(useMeta, metaInfo.value)

    const { page, getData, dataPagination } = pagination(fetchData)

    const lazyPagination = ($state) => {
      getData($state, cards.value.value.last_page)
      cards.value.value.data = [...cards.value.value.data, ...dataPagination.value]
    }
    const clickTag = (tag) => {
      router.push({ path: 'tags', query: { tag } })
    }

    return {
      lazyPagination,
      clickTag,

      introTitle,
      background,
      cards,
      page,
      pageInfo,
      content,
      showAnimate
    }
  },
  head: {},
  watchQuery: ['page']
})
</script>
<style lang="scss" module>
.cards {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .col:first-child {
    margin-right: 2rem;
  }
  .col {
    width: 100%;
    max-width: 53.2rem;
  }
}
.content {
  @include container;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  padding-bottom: 5rem;
  width: 100%;
  transition: opacity 300ms;
  &.animateContent {
    opacity: 0;
  }
  & > * + * {
    margin-top: 2rem;
  }
  &.setHeight {
    min-height: 100%;
  }
}
</style>
