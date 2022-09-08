<template>
  <n-intro
    :description="introTitle"
    :is-show-animation="true"
  >
    <div :class="$style.wrapperAnimateElement">
      <div
        v-for="[key,value] in Object.entries(BLAND_COLOR)"
        :key="key"
        ref="elementAnimate"
        class="elementAnimate"
        :class="[$style[key], $style.animate]"
        :style="{backgroundColor: value}"
      />
    </div>
    <div class="content" :class="[showAnimate && $style.animateContent, $style.content]">
      <NGridCard
        v-if="cards && cards.data"
        ref="content"
        :items="cards.data"
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
  useFetch,
  useMeta, onMounted, nextTick, onUnmounted
} from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import { BLAND_COLOR } from '~/const/blandColor'

import { pagination } from '~/plugins/pagination'
import { head } from '@/components/scripts/head.js'
import animationGSAP from '~/helpers/compositions/animationGSAP'

export default defineComponent({
  name: 'IndexPage',
  transition: 'home',
  props: {
  },
  setup (_, { root }) {
    const { store, $gsap, router } = useContext()
    const cards = ref([])
    const totalPage = ref(0)
    const content = ref(null)
    const background = ref(null)
    const elementAnimate = ref(null)
    const resize = () => {
      if (window.innerWidth > 450) {
        document.querySelector('.logo').style.top = null
      }
    }
    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
    })
    const pageInfo = ref({})
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const fetchData = async (currentPage) => {
      const params = {
        page: currentPage,
        count: 10,
        show_in_main: 1
      }

      const response = await store.dispatch('main/getData', params)
      console.log(response)
      return response
    }
    store.commit('content/clearBgIntro')

    const {
      animationlogo,
      animateSubtitle,
      animateNavbar,
      animationTimeline
    } = animationGSAP($gsap, Elastic)

    onMounted(() => {
      // if (backgroundLoaded.value) {
      nextTick(() => {
        // if (store.state.content.singleAnimation) {
        //   localStorage.setItem('showAnimateHomePage', 'true')
        //   store.commit('content/setSingleAnimation', false)
        // }
        const isPlayAnimation = JSON.parse(localStorage.getItem('showAnimateHomePage'))
        if (!isPlayAnimation) {
          store.commit('content/setAnimate', false)
          document.querySelector('.logo').style.visibility = 'visible'
        } else {
          animationTimeline('.navbarSlug', elementAnimate.value, root.$mq)
        }
        window.addEventListener('resize', resize)

        animationlogo()
        animateSubtitle()
        animateNavbar('.navbarSlug')
        // localStorage.setItem('showAnimateHomePage', 'false')
        localStorage.setItem('showAnimateHomePage', 'true')
      })
      // }
    })

    useFetch(async () => {
      try {
        const response = await fetchData()
        totalPage.value = response?.data.last_page
        cards.value = response.data.data
      } catch (e) {
        console.log(e)
      }
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize)
    })

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
      BLAND_COLOR,
      elementAnimate,

      introTitle,
      background,
      cards,
      page,
      pageInfo,
      content,
      showAnimate
    }
  },
  head: {}
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
$heightSmall: 1.2rem;
$heightBig: 4.6rem;
.wrapperAnimateElement {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .animate {
    border-radius: 4rem;
    transform: translateX(-100%);
  }
  .muzyka {
    width: 5.9rem;
    height: $heightSmall;
  }
  .video {
    width: 34.4rem;
    height: $heightSmall;
  }
  .ctivo {
    width: 34.4rem;
    height: $heightBig;
  }
  .iskusstvo {
    width: 27.1rem;
    height: $heightBig;
  }
  .kuxnia {
    width: 15rem;
    height: $heightBig;
  }
  .magazin {
    width: 35.5rem;
    height: $heightSmall;
  }
  .foto {
    width: 25.5rem;
    height: $heightSmall;
  }
  .odezda {
    width: 9rem;
    height: $heightBig;
  }
  .meropriiatiia {
    width: 31.8rem;
    height: $heightBig;
  }
  .efir {
    width: 9rem;
    height: $heightBig;
  }
  .moneta {
    width: 31.8rem;
    height: $heightBig;
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
