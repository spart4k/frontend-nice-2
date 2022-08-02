<template>
  <N-Intro no-preview>
    <div :class="$style.wrapper">
      <N-Background :description="description" hide-image />
      <template v-if="card">
        <SectionCards
          :id="10"
          :key="card.id"
          detail-page
          :card="card"
          @clickTag="clickTag"
        />
        <!-- <N-Back-Button /> -->
      </template>
    </div>
  </N-Intro>
</template>

<script>
import { ref, useAsync, useContext, defineComponent, useRouter, computed, useMeta } from '@nuxtjs/composition-api'
import { head } from '@/components/scripts/head.js'

export default defineComponent({
  name: 'NCoin',
  layout: 'default',
  transition: 'home',
  setup () {
    const isAddedBasket = ref(false)
    const { route, store } = useContext()
    const router = useRouter()
    // const paramsId = computed(() => Number(route.value.params.id))
    const sections = computed(() => store?.state.content.sections)

    const description = computed(() => {
      return {
        background: bgName?.value?.slug
      }
      // title: bgName.value
    })

    const clickTag = (value) => {
      router.push({ path: '/tags', query: { tag: value } })
    }

    const card = useAsync(async () => {
      try {
        const response = await store.dispatch('detailPage/getData', route.value.params.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    })
    head(useMeta, card.value)
    const bgName = computed(() => {
      const find = sections.value?.find(item => Number(item.id) === +card.value?.section_id)
      return find
    })

    const isAuth = computed(() => {
      return store.state.authentication.authorizated
    })

    return {
      card,
      clickTag,
      description,
      isAddedBasket,
      bgName,
      isAuth

    }
  },
  head: {}
})
</script>

<style scoped module lang="scss">
.wrapper {
  width: 100%;
  padding-top: 5rem;
}
.button__add_basket {
  background-color: rgba($black, 0.8);
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  //padding: 2.4rem 0;
  button {
    height: 5.1rem;
    background-color: $yellow2;
    color: $black;
    @include montserratMedium;
    @include text;
  }
}
</style>
