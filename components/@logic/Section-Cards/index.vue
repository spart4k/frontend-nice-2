<template>
  <div :class="$style.wrapper">
    <template v-if="id === 2">
      <N-Card-Default :detail-page="detailPage" :comments="comments" with-video :data="detailPage ? card.data : card" @clickTag="($event) => $emit('clickTag', $event)" />
    </template>
    <template v-else-if="id === 11">
      <N-Card-Coin />
    </template>
    <template v-else>
      <N-Card-Default
        :detail-page="detailPage"
        :comments="comments"
        :data="detailPage ? card.data : card"
        @clickTag="($event) => $emit('clickTag', $event)"
      />
    </template>
    <!-- <N-Card-Author /> -->
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
    comments: {
      type: [Array, Object],
      required: false
    },
    detailPage: {
      type: Boolean,
      required: false
    },
    setup (props) {
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  width: 100%;

}
</style>
