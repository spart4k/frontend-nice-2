<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Поиск
    </h2>
    <div :class="$style.inputContainer">
      <N-Text-Field
        v-model="text"
        debounce
        placeholder="Начните искать ..."
        type="text"
        color="#6448B5"
        @sendCount="sendCount"
      />
      <N-Icon v-if="!text" :class="$style.searchIcon" name="loupe" />
    </div>
    <div :class="$style.searchResults">
      <div v-if="loading" :class="$style.nothing">
        <n-loading purple :class="$style.loading" />
      </div>
      <div
        v-else-if="(resultCards.length || resultAuthors.length) && text.length"
        :class="$style.searchContainer"
      >
        <NuxtLink
          v-for="(item, index) in resultAuthors"
          :key="index"
          :to="`/authors/${item.id}`"
        >
          <div :class="$style.searchItem" @click="closeBottom">
            <N-Search-Result
              :item="item"
            />
          </div>
        </NuxtLink>
        <NuxtLink
          v-for="(item, index) in resultCards"
          :key="index"
          :to="`/${item.section.slug}/${item.id}`"
        >
          <div :class="$style.searchItem" @click="closeBottom">
            <N-Search-Result
              :item="item"
            />
          </div>
        </NuxtLink>
      </div>
      <div v-else :class="$style.nothing">
        <p :class="$style.nothingToShow">
          Нет информации для отображения
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useContext, ref } from '@nuxtjs/composition-api'

export default {
  name: 'SearchCards',
  props: {
  },
  setup (props, ctx) {
    const { store } = useContext()
    const text = ref()
    const { emit } = ctx
    const resultCards = ref([])
    const resultAuthors = ref([])
    const loading = ref(false)
    const wait = ref(false)
    const closeBottom = () => {
      if (window.innerWidth < 450) {
        emit('closeState')
      }
    }
    const sendCount = async (val) => {
      text.value = val
      const searchData = {
        page: 1,
        count: 99,
        entity: 'common',
        searchField: val
      }
      if (val.length) {
        loading.value = true
        const searchResult = await store.dispatch('search/searchCards', searchData)
        console.log(searchResult.data)
        resultCards.value = searchResult.data.cards
        resultAuthors.value = searchResult.data.authors
        loading.value = false
      } else {
        resultCards.value = {}
        resultAuthors.value = {}
      }
    }
    return {
      text,
      sendCount,
      loading,
      wait,
      resultCards,
      resultAuthors,
      closeBottom
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper{
  padding: 0 1.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  transform: translate3d(0);
  height: 100%;
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 1.5rem;
  }
  .inputContainer{
    display: flex;
    flex-direction: column;
    margin: 2rem 0 2.5rem;
    gap: 2.5rem;
    position: relative;
    .searchIcon {
      position: absolute;
      right: 0;
      top: calc(50% - 1rem);
      width: 1.828rem;
      height: 1.8rem;
    }
  }
  .searchResults{
    min-height: 60vh;
    display: flex;
    padding-bottom: 2.5rem;
    .searchContainer{
      width: 100%;
      .searchItem{
        margin-top: 1.5rem;
      }
    }
    .nothing{
      width: 100%;
      height: 100%;
      text-align: center;
      margin: auto 0;
      .loading {
        display: block;
        margin: 0 auto
      }
      .nothingToShow {
        @include regular-text;
        color: $fontColorDefault;
        opacity: 0.5;
      }
    }
  }
}
</style>
