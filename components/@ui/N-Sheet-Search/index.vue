<template>
  <div>
    <h2 :class="$style.title">
      Поиск
    </h2>
    <div :class="$style.inputContainer">
      <N-Text-Field placeholder="Начните искать ..." type="text" color="#6448B5" />
      <N-Icon :class="$style.searchIcon" name="search" />
    </div>
    <div :class="$style.searchResults">
    </div>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSheetRegister',
  props: {
  },
  setup () {
  return {
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
        top: calc(50% - 1.5rem);
    }
  }
  .searchResults{
  }
</style>
