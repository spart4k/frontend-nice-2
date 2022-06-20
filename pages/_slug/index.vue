<template>
  <n-intro :description="introTitle">
    <n-preloader v-if="loading" />
    <template v-for="card in cards.value">
      <SectionCards :id="id" :key="card.id" :card="card" @clickTag="clickTag" />
    </template>
    <client-only>
      <n-lazy-pagination
        @lazyPagination="lazyPagination"
      />
    </client-only>
  </n-intro>
</template>

<script>
import { ref, useRoute, useRouter, useAsync, useContext, computed } from '@nuxtjs/composition-api'
import _ from 'lodash'
import { pagination } from '~/plugins/pagination'

export default {
  name: 'NMusic',
  layout: 'default',
  transition: 'home',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { store } = useContext()
    const cards = ref([])
    const totalPage = ref([])
    const id = computed(() => Number(route.value.query.id))
    const tagId = computed(() => Number(route.value.query.tag))
    const loading = ref(false)

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
    const { getData, dataPagination } = pagination(fetch)

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
      cards.value.value = _.cloneDeep(response.data.data)
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
      introTitle,
      cards,
      totalPage,
      id,
      loading,
      clickTag,
      lazyPagination
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
}
</style>
