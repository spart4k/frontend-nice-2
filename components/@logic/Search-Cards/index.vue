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
        v-else-if="result.length && text.length"
        :class="$style.searchContainer"
      >
        <NuxtLink
          v-for="(item, index) in result"
          :key="index"
          tag="div"
          :to="`/cards/${item.id}?section=${item.section.slug}`"
          :class="$style.searchItem"
        >
          <div @click="closeBottom">
            <N-Search-Result
              :title="item.title"
              :text="item.text"
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
    const result = ref([])
    const loading = ref(false)
    const wait = ref(false)
    const closeBottom = () => {
      if (window.innerWidth < 450) {
        emit('closeState')
      }
    }
    const sendCount = async (val) => {
      text.value = val
      const searchData = { searchField: val }
      if (val.length) {
        loading.value = true
        const searchResult = await store.dispatch('search/searchCards', searchData)
        result.value = searchResult.data.data
        loading.value = false
      } else {
        result.value = {}
      }
    }
    return {
      text,
      sendCount,
      loading,
      wait,
      result,
      closeBottom
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper{
  padding: 0 1.5rem;
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
      div+div {
        margin-top: 1.5rem;
      }
      .searchItem{
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
