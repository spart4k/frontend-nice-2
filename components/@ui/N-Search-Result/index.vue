<template>
  <div :class="$style.container">
    <template v-if="$props.item.title">
      <h2 :class="$style.title">
        {{ $props.item.title }}
      </h2>
      <p :class="$style.text" v-html="$props.item.text" />
    </template>
    <template v-else>
      <div :class="$style.authorContainer">
        <img :class="$style.authorImage" :src="`${$axios.defaults.baseURL}/${$props.item.avatar.src}`" alt="avatar">
        <div :class="$style.authorInfo">
          <div :class="$style.authorName">
            {{ $props.item.name }}
          </div>
          <div :class="$style.authorDescription" v-html="$props.item.description" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSearchResult',
  props: {
    item: {
      type: Object
    }
  },
  setup (props) {
  return {
  }
  }
}
</script>

<style scoped lang="scss" module>
.container {
    width: 100%;
    height: fit-content;
    padding: 1.5rem;
    background: #F5F5F5;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    word-break: break-word;
    cursor: pointer;
    .title {
        @include button;
        color: #6448B5;
    }
    .text {
        @include regular-text;
        color: $fontColorDefault;
        max-height: 5.1rem;
        line-height: 1.7rem;
        overflow: hidden;
    }
    .authorContainer{
      display: flex;
      .authorInfo {
        display: flex;
        flex-direction: column;
        .authorName {
          @include button;
          color: #6448B5;
          margin-bottom: 0.5rem
        }
        .authorDescription {
          @include regular-text;
          color: $fontColorDefault;
          line-height: 1.7rem;
        }
      }
      .authorImage{
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        background-color: rgb(195, 195, 195);
        margin-right: 2rem;
        object-fit: cover;
      }
    }
}
</style>
