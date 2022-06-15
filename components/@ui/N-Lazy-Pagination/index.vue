<template>
  <client-only>
    <infinite-loading spinner="spiral" @infinite="$emit('lazyPagination', $event)">
      <div slot="no-more" />
      <div slot="no-results" />
    </infinite-loading>
  </client-only>
</template>

<script>

export default {
  name: 'NLazyPagination',

  setup (_, { emit }) {
    const scroll = ($state) => {
      emit('lazyPagination')
    }
    return {
      scroll
    }
  }
}
</script>

<style scoped>

</style>
