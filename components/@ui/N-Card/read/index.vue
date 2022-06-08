<template>
  <N-Contain :class="$style.wrapper">
    <N-Author
      :src="$props.author.src"
      :name="$props.author.name"
    />
    <p>
      {{ $props.description }}
    </p>
    <div
      v-for="item in $props.books"
      :key="item.description"
      :class="$style.row"
    >
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
    </div>
  </N-Contain>
</template>
<script lang="js">
export default {
  name: 'NCardRead',
  props: {
    author: {
      type: Object,
      default: null
    },
    description: {
      type: String,
      default: ''
    },
    books: {
      type: Array,
      default: null
    }
  }
}
</script>
<style lang="scss" module>
.wrapper {
  width: 32.5rem;
  color: $fontColorDefault;
  & > p {
    border-bottom: solid 1px rgba($black, .1);
    padding-bottom: 1rem;
    margin-bottom: .7rem;
    margin-top: 1.9rem;
  }
  .row {
    & + .row {
      margin-top: 3.2rem;
    }
    h2 {
      font-weight: 700;
      @include text-sm;
      margin-bottom: .73rem;
    }
  }

}
</style>
