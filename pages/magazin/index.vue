<template>
  <n-intro :description="introTitle" :set-height="cardsLength">
    <!--    <div :class="$style.wrapper">-->
    <n-preloader v-if="loading" />
    <template v-if="cards.value">
      <div :class="[isScrollingTop && $style.scrollTop, $style.sorting]">
        <N-Dropdown
          :item="selectItemForShop"
          placeholder="Все товары"
          @select="($event) => select($event, 'product')"
        />
        <N-Dropdown
          :item="SORTING_SELECT_DATE"
          placeholder="По новизне"
          :class="$style.dropdown__left"
          @select="($event) => select($event, 'date')"
        />
      </div>
      <SectionCards
        v-for="card in cards.value.data"
        :id="card.section_id"
        :key="card.id"
        ref="card"
        :card="card"
        @clickTag="clickTag"
      />
    </template>
    <client-only>
      <n-lazy-pagination
        @lazyPagination="lazyPagination"
      />
    </client-only>
    <!--    </div>-->
  </n-intro>
</template>

<script>
import { computed, ref, useAsync, useContext, useRouter, defineComponent, useMeta } from '@nuxtjs/composition-api'
import { pagination } from '~/plugins/pagination'
import { head } from '@/components/scripts/head.js'

const SORTING_SELECT_DATE = [
  { title: 'по новизне', sorting: 'id_asc' }
]

export default defineComponent({
  name: 'NShop',
  head: {},
  setup (_, ctx) {
    const { $store } = ctx.root
    const { route, store } = useContext()
    const router = useRouter()
    const sorting = ref({})
    const isScrollingTop = ref(false)
    const card = ref(null)

    const cards = ref([])
    const cardsLength = computed(() => {
      return cards?.value?.length > 0
    })
    const loading = ref(false)
    const id = computed(() => Number(route.value.query.id))

    const introTitle = computed(() => {
      if (id.value) {
        const findSection = $store?.state?.content.sections.find((item) => {
          return Number(item.id) === id.value
        })
        return {
          title: findSection?.title ?? '',
          subtitle: findSection?.description,
          background: 'magazin'
        }
      } else {
        return {
          title: '',
          subtitle: '',
          background: route.value.params.slug
        }
      }
    })

    const getPageInfo = computed(() => {
      console.log()
      const sections = $store.state.content.sections
      const result = sections.filter(section => section.slug === route.value.name)
      return result[0]
    })

    head(useMeta, getPageInfo.value)

    const selectItemForShop = useAsync(async () => {
      const response = await store.dispatch('shop/getDataForShop')
      if (response.data.length) {
        response.data.push({ title: 'Все товары', id: 'all' })
      }
      return response.data
    })

    const fetchData = async (value = {}) => {
      const response = await $store.dispatch('shop/getData', sorting.value)
      return response.data
    }

    const { getData, dataPagination } = pagination(fetchData)
    const lazyPagination = ($state) => {
      getData($state, cards.value.value.last_page)
      cards.value.value.data = [...cards.value.value.data, ...dataPagination.value]
    }

    const clickTag = (value) => {
      router.push({ path: '/tags', query: { tag: value } })
    }
    // изменение select и scroll вверх
    const select = async (value, typeSelect) => {
      // const body = document.querySelector('.body')
      // const content = document.querySelector('.content')
      if (typeSelect === 'date') {
        sorting.value.sort = value?.sorting
      }
      if (typeSelect === 'product') {
        if (value?.id === 'all') {
          sorting.value.section_id = ''
        } else {
          sorting.value.section_id = value?.id
        }
      }
      loading.value = true
      cards.value.value = await fetchData(value)
      // if (cards.value.value?.data?.length) {
        // const contentBounding = content.getBoundingClientRect()
        // scrollBy(body, { behavior: 'smooth', top: contentBounding.top - 88 })
      // }
      loading.value = false
    }

    // const scroll = (boundingHeader) => {
    //     const boundingSort = sortRef.value.getBoundingClientRect()
    //     if (boundingSort.top <= boundingHeader.bottom) {
    //       isScrollingTop.value = true
    //     } else {
    //       isScrollingTop.value = false
    //     }
    // }
    //
    // onMounted(() => {
    //   nextTick(() => {
    //     const bodyElement = document.querySelector('.body')
    //     const headerElement = document.querySelector('.header')
    //     if (headerElement) {
    //       const boundingHeader = headerElement.getBoundingClientRect()
    //       bodyElement.addEventListener('scroll', () => {
    //         if (boundingHeader) {
    //           scroll(boundingHeader)
    //         }
    //       })
    //     }
    //   })
    // })

    cards.value = useAsync(fetchData, route.value.path)

    return {
      introTitle,
      cards,
      loading,
      selectItemForShop,
      SORTING_SELECT_DATE,
      clickTag,
      lazyPagination,
      cardsLength,
      select,
      card,
      isScrollingTop,
      getPageInfo
    }
  }
})
</script>

<style scoped lang="scss" module>
.wrapper {
  min-height: 100vh;
}
.sorting {
  width: 100%;
  display: flex;
  justify-content: space-between;
  //position: sticky;
  //top: 0;
  z-index: 10;
  .dropdown__left {
    margin-left: 1.1rem;
  }
  //&.scrollTop {
  //  background-color: white;
  //}
}
</style>
