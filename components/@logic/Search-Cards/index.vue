<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Поиск
    </h2>
    <div :class="$style.inputContainer">
      <N-Text-Field v-model="text" placeholder="Начните искать ..." type="text" color="#6448B5" @sendCount="sendCount" />
      <N-Icon v-if="!text" :class="$style.searchIcon" name="loupe" />
    </div>
    <div :class="$style.searchResults">
      <div
        v-if="result.length"
        :class="$style.searchContainer"
      >
        <N-Search-Result
          v-for="(item, index) in result"
          :key="index"
          :class="$style.searchItem"
          :title="item.title"
          :text="item.text"
        />
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
  setup () {
    const { store } = useContext()
    const text = ref()
    const result = ref([])
    const sendCount = async (val) => {
      text.value = val
      const searchData = { searchField: val }
      if (val.length % 2 === 0) {
        const searchResult = await store.dispatch('search/searchCards', searchData)
        result.value = searchResult.data
        console.log(result.value)
      }
    }
    return {
      text,
      sendCount,
      result
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
      .nothingToShow {
        @include regular-text;
        color: $fontColorDefault;
        opacity: 0.5;
      }
    }
  }
}
</style>
