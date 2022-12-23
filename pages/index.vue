<template>
  <div>
    <N-Preloader v-if="!cards.data || !loadingEnd" />
    <n-intro
      :class="!loadingEnd && $style.disabled"
      v-if="cards.data"
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
          :class="!loadingEnd && $style.disabled"
          home-page
          @clickTag="clickTag"
        />
      </div>
    </n-intro>
    <div :class="$style.loadingContainer">
      <n-observer :class="$style.observer" @intersect="lazyPagination" />
      <N-Loading v-if="cardsLoading && animationLoad" :class="$style.loading" />
    </div>
  </div>
</template>

<script>

import {
  ref,
  computed,
  defineComponent,
  useContext,
  useFetch, useAsync, watch,
  onMounted, onUnmounted, onUpdated, nextTick,
  useRouter,
  useMeta
} from '@nuxtjs/composition-api'
import { Elastic } from 'gsap'
import { BLAND_COLOR } from '~/const/blandColor'

import { pagination } from '~/plugins/pagination'
// import { head } from '@/components/scripts/head.js'
import animationGSAP from '~/helpers/compositions/animationGSAP'

export default defineComponent({
  name: 'IndexPage',
  transition: 'home',
  props: {
  },
  setup (_, { root }) {
    const { store, route, $gsap } = useContext()
    const router = useRouter()
    const cards = ref([])
    const totalPage = ref(0)
    const content = ref(null)
    const background = ref(null)
    const elementAnimate = ref(null)
    const pageNumber = ref(2)
    const startCards = ref([])
    const cardsLoading = ref(false)
    const cardsDispatch = ref(true)
    const fetchLoading = ref(false)
    const animationLoad = ref(false)
    const loadingEnd = ref(false)
    const scrollHeight = computed(() => store?.state?.content?.scrollHeight)
    const imgLoadCount = computed(() => store?.state?.content?.imgLoadCounter)
    const contentLoader = computed(() => store?.state?.content?.contentLoader)
    const metaTags = ref({})
    const firstRender = ref(true)
    const resize = () => {
      if (window.innerWidth < 450) {
        animationlogo()
      }
      if (window.innerWidth > 450) {
        document.querySelector('.logo').style.top = null
      }
    }
    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
    })
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)
    const fetchData = async () => {
      const params = {
        page: 1,
        count: 6,
        show_in_main: 1,
        section_id: '',
        order_by_colomn: 'created_at',
        order_by_mode: 'desc'
      }

      const response = await store.dispatch('main/getData', params)
      console.dir(response.data)
      return response
    }
    const color = computed(() => {
      const paramsColor = BLAND_COLOR[route.value.params?.slug] || BLAND_COLOR[route.value.name] || BLAND_COLOR[route.value.query.section] || BLAND_COLOR[route.value.path]
      if (paramsColor) {
        return paramsColor
      } else {
        return ''
      }
    })

    store.commit('content/clearBgIntro')

    const {
      animationlogo,
      animateSubtitle,
      animateNavbar,
      animationTimeline
    } = animationGSAP($gsap, Elastic)

    onMounted(() => {
      store.commit('content/changeContentLoader', true)
        const body = document.querySelector('body')
        body.style.overflow = 'hidden'
        window.addEventListener('resize', resize)
        window.addEventListener('load', () => {
          if (store.state.content.singleAnimation) {
            localStorage.setItem('showAnimateHomePage', 'true')
            store.commit('content/setSingleAnimation', false)
          }
          if (window.innerWidth < 450) {
            animationlogo()
          }
          animateSubtitle()
          animateNavbar('.navbarSlug')
          const isPlayAnimation = JSON.parse(localStorage.getItem('showAnimateHomePage'))
          if (!isPlayAnimation) {
            store.commit('content/setAnimate', false)
            document.querySelector('.logo').style.visibility = 'visible'
          } else {
            animationTimeline('.navbarSlug', elementAnimate.value, root.$mq)
          }
        })
        if (!store.state.content.singleAnimation) {
          const logo = document.querySelector('.logo')
          logo.classList.add('animationEnd')
          body.style.overflow = 'auto'
        }
        setTimeout(() => {
          fetchLoading.value = true
          animationLoad.value = true
        }, 1000)
        if (!localStorage.getItem('lastSection')) {
            const lastSection = {
              section: 'index'
            }
            localStorage.setItem('lastSection', JSON.stringify(lastSection))
          }
      setTimeout(() => {
        content.value.masonryRebuild()
      }, 1000)
    })

    onUpdated(() => {
    })

    const getSeoInfo = async () => {
    }
    useAsync(async () => {
      try {
        const response = await fetchData()
        metaTags.value = {
          seo_title: response.data.data?.seo_title,
          seo_description: response.data.data?.seo_description,
          seo_image: response.data.data?.seo_file_id?.src
        }
      } catch (e) {
      }
    })

    const getLikes = async () => {
    }

    useFetch(async () => {
        try {
          const response = await fetchData()
          if (response.data.data.data.length < 6) {
            cardsDispatch.value = false
          }
          totalPage.value = response?.data.last_pages
          cards.value = response.data.data
          startCards.value = cards.value.data
          loadingEnd.value = true
          if (scrollHeight.value !== 0) {
            if (localStorage.getItem('lastCards') !== '[object Object]' && JSON.parse(localStorage.getItem('lastCards')).section === 'index') {
              loadingEnd.value = false
              cards.value.data = JSON.parse(localStorage.getItem('lastCards')).cards
              startCards.value = [...cards.value.data]
              pageNumber.value = JSON.parse(localStorage.getItem('lastCards')).page
            }
            if (localStorage.getItem('lastCards') === '[object Object]' && JSON.parse(localStorage.getItem('lastSection')).section === 'index') {
              loadingEnd.value = false
            }
            if (JSON.parse(localStorage.getItem('lastSection')).section !== 'index') {
              store.commit('content/setHeaderHidden', true)
            }
          } else {
            store.commit('content/setHeaderHidden', true)
          }
          if (!localStorage.getItem('lastSection') || JSON.parse(localStorage.getItem('lastSection')).section !== 'index') {
            const lastSection = {
              section: 'index'
            }
            localStorage.setItem('lastSection', JSON.stringify(lastSection))
            store.commit('content/setScrollHeight', 0)
          }
          const lastCards = {
            cards: startCards.value,
            section: 'index',
            page: pageNumber.value
          }
          localStorage.setItem('lastCards', JSON.stringify(lastCards))
        } catch (e) {
        }
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize)
      loadingEnd.value = false
    })

    store.commit('content/clearBgIntro')
    useMeta(() => ({
        title: metaTags.value.seo_title,
        meta: [
          {
            hid: 'og:title',
            name: 'og:title',
            property: 'og:title',
            content: metaTags.value.seo_title
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: metaTags.value.seo_description
          },
          {
            hid: 'og:image',
            name: 'og:image',
            property: 'og:image',
            content: `https://test.itisthenice.com/${metaTags.value.seo_image}`
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            property: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            property: 'twitter:image',
            content: `https://test.itisthenice.com/${metaTags.value.seo_image}`
          },
          {
            hid: 'description',
            name: 'description',
            property: 'description',
            content: metaTags.value.seo_description
          }
        ]
    }))

    const { page } = pagination(fetchData)

    const lazyPagination = async () => {
      if (cardsDispatch.value && fetchLoading.value) {
        cardsLoading.value = true
        if (!startCards.value.length) {
          const params = {
            page: 1,
            count: 12,
            section_id: '',
            show_in_main: 1,
            order_by_colomn: 'created_at',
            order_by_mode: 'desc'
          }
          pageNumber.value++
          const response = await store.dispatch('pages/getData', params)
          if (response.data.length < 6) {
            cardsDispatch.value = false
          }
          // cardsLoading.value = false
          // cards.value.data = [...startCards.value, ...response.data]
          // startCards.value = [...cards.value.data]
          cardsLoading.value = false
          startCards.value = [...startCards.value, ...response.data]
          startCards.value.forEach((item) => {
            cards.value.data.push(item)
          })
          const lastCards = {
            cards: startCards.value,
            section: 'index',
            page: pageNumber.value
          }
          localStorage.setItem('lastCards', JSON.stringify(lastCards))
        } else {
          const params = {
            page: pageNumber.value,
            count: 6,
            section_id: '',
            show_in_main: 1,
            order_by_colomn: 'created_at',
            order_by_mode: 'desc'
          }
          pageNumber.value++
          const response = await store.dispatch('pages/getData', params)
          if (response.data.length < 6) {
            cardsDispatch.value = false
          }
          cardsLoading.value = false

          startCards.value = [...startCards.value, ...response.data]
          startCards.value.forEach((item) => {
            cards.value.data.push(item)
          })

          // cards.value.data = [...startCards.value, ...response.data]
          // startCards.value = [...cards.value]

          const lastCards = {
            cards: startCards.value,
            section: 'index',
            page: pageNumber.value
          }
          localStorage.setItem('lastCards', JSON.stringify(lastCards))
        }
      }
    }

    const clickTag = (value) => {
      router.push({ path: `/tags/${value}` })
    }

    watch(() => imgLoadCount.value, () => {
      if (scrollHeight.value !== 0) {
        if (localStorage.getItem('lastCards') !== '[object Object]') {
          if (imgLoadCount.value === JSON.parse(localStorage.getItem('lastCards')).cards.length) {
            if (window.innerWidth < 450) {
            store.commit('content/setHeaderHidden', true)
            if (firstRender.value) {
              firstRender.value = false
              if (JSON.parse(localStorage.getItem('lastSection')).section === 'index' && scrollHeight.value !== 0) {
                window.scroll({
                  top: scrollHeight.value,
                  left: 0
                })
                loadingEnd.value = true
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
                if (JSON.parse(localStorage.getItem('lastSection')).section === 'index' && scrollHeight.value !== 0) {
                    window.scroll({
                      top: 0,
                      left: 0
                    })
                    nextTick(() => {
                      window.scroll({
                        top: scrollHeight.value,
                        left: 0
                      })
                      loadingEnd.value = true
                    })
                }
                nextTick(() => {
                  animateNavbar('.navbarSlug')
                })
              }
            })
          }
          }
        } else if (localStorage.getItem('lastCards') === '[object Object]') {
          if (imgLoadCount.value <= 6) {
            if (window.innerWidth < 450) {
            store.commit('content/setHeaderHidden', true)
            if (firstRender.value) {
              firstRender.value = false
              if (JSON.parse(localStorage.getItem('lastSection')).section === 'index' && scrollHeight.value !== 0) {
                window.scroll({
                  top: scrollHeight.value,
                  left: 0
                })
                loadingEnd.value = true
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
                if (JSON.parse(localStorage.getItem('lastSection')).section === 'index' && scrollHeight.value !== 0) {
                    window.scroll({
                      top: 0,
                      left: 0
                    })
                    nextTick(() => {
                      window.scroll({
                        top: scrollHeight.value,
                        left: 0
                      })
                      loadingEnd.value = true
                    })
                }
                nextTick(() => {
                  animateNavbar('.navbarSlug')
                })
              }
            })
          }
          }
        }
      } else if (imgLoadCount.value === JSON.parse(JSON.stringify(startCards.value)).length) {
        loadingEnd.value = true
      }
    })

    return {
      lazyPagination,
      clickTag,
      BLAND_COLOR,
      elementAnimate,
      introTitle,
      background,
      cards,
      page,
      content,
      showAnimate,
      pageNumber,
      startCards,
      cardsLoading,
      cardsDispatch,
      fetchLoading,
      animationLoad,
      getSeoInfo,
      metaTags,
      scrollHeight,
      firstRender,
      color,
      imgLoadCount,
      loadingEnd,
      contentLoader,
      getLikes
    }
  },
  head: {

  }
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
  .music {
    width: 5.9rem;
    height: $heightSmall;
  }
  .media {
    width: 34.4rem;
    height: $heightSmall;
  }
  .library {
    width: 34.4rem;
    height: $heightBig;
  }
  .art {
    width: 27.1rem;
    height: $heightBig;
  }
  .kitchen {
    width: 15rem;
    height: $heightBig;
  }
  .shop {
    width: 35.5rem;
    height: $heightSmall;
  }
  .photo {
    width: 25.5rem;
    height: $heightSmall;
  }
  .fashion {
    width: 9rem;
    height: $heightBig;
  }
  .event {
    width: 31.8rem;
    height: $heightBig;
  }
  .broadcast {
    width: 9rem;
    height: $heightBig;
  }
  .coin {
    width: 31.8rem;
    height: $heightBig;
  }
}
.disabled {
  opacity: 0;
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
