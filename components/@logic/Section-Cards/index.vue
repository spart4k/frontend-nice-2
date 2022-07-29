<template>
  <div :class="$style.wrapper">
    <!-- <template v-if="id === 1">
      <N-Card-MusicDetail :detail-page="detailPage" :data="card" @clickTag="($event) => $emit('clickTag', $event)" />
    </template> -->
    <template v-if="id === 2">
      <N-Card-New :detail-page="detailPage" with-video :data="card" @clickTag="($event) => $emit('clickTag', $event)" />
    </template>
    <!-- <template v-else-if="id === 3">
      <N-Card-Read :detail-page="detailPage" :data="card" @clickTag="($event) => $emit('clickTag', $event)" />
    </template>
    <template v-else-if="id === 4">
      <N-Card-Default :detail-page="detailPage" :data="card" :hat-height="12.4" @clickTag="($event) => $emit('clickTag', $event)" />
    </template>
    <template v-else-if="id === 7">
      <N-Card-Default :detail-page="detailPage" :with-author="!detailPage" :data="card" @clickTag="($event) => $emit('clickTag', $event)" />
    </template> -->
    <!-- <template v-else>
      <N-Card-Default
        :detail-page="detailPage"
        :data="card"
        @clickTag="($event) => $emit('clickTag', $event)"
      />
    </template> -->
    <template v-else>
      <N-Card-New
        :detail-page="detailPage"
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
      required: true,
      default: 0
    },
    card: {
      type: [Array, Object],
      required: true
    },
    detailPage: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  width: 100%;

}
</style>
