<template>
  <div :class="$style.wrapper">
    <template v-if="id === 1">
      <N-Card-MusicDetail :data="card" @clickTag="($event) => $emit('clickTag', $event)" />
    </template>
    <template v-if="id === 3">
      <N-Card-Read :data="card" @clickTag="($event) => $emit('clickTag', $event)" />
    </template>
    <template v-if="id === 9">
      <N-Card-Default
        :data="card"
        @clickTag="($event) => $emit('clickTag', $event)"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'SectionCards',
  props: {
    id: {
      type: Number,
      required: true
    },
    card: {
      type: [Array, Object],
      required: true
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  width: 100%;
}

</style>
