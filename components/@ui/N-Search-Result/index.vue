<template>
  <div :class="$style.container">
    <h2 :class="$style.title">
      {{ $props.title }}
    </h2>
    <p :class="$style.text">
      {{ $props.text }}
    </p>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSearchResult',
  props: {
    title: {
      type: String
    },
    text: {
      type: String
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
}
</style>
