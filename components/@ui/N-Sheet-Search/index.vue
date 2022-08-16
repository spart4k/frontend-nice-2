<template>
  <div>
    <h2 :class="$style.title">
      Поиск
    </h2>
    <div :class="$style.inputContainer">
      <N-Text-Field v-model="text" placeholder="Начните искать ..." type="text" color="#6448B5" @sendCount="sendCount" />
      <N-Icon v-if="!text" :class="$style.searchIcon" name="loupe" />
    </div>
    <div :class="$style.searchResults">
      <div v-if="false">
        <N-Search-Result />
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
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSheetRegister',
  props: {
  },
  setup () {
    const text = ref()
    const sendCount = (val) => {
      text.value = val
    }
    return {
      text,
      sendCount
    }
  }
}
</script>

<style scoped lang="scss" module>
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 2.7rem;
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
    }
  }
  .searchResults{
    min-height: 60vh;
    display: flex;
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
</style>
