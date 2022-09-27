<template>
  <div :class="$style.wrapper">
    <template v-if="section.id === 2">
      <N-Card-Default
        :detail-page="detailPage"
        :comments="comments"
        with-video
        :data="detailPage ? card.data : card"
        @clickTag="($event) => $emit('clickTag', $event)"
        @clickAuthor="($event) => $emit('clickAuthor', $event)"
      />
    </template>
    <!-- <template v-else-if="section.id === 10">
      <N-Card-Coin /> -->
    <!-- </template> -->
    <template v-else>
      <N-Card-Default
        :detail-page="detailPage"
        :comments="comments"
        :data="detailPage ? card.data : card"
        @clickTag="($event) => $emit('clickTag', $event)"
        @clickAuthor="($event) => $emit('clickAuthor', $event)"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'SectionCards',
  props: {
    section: {
      type: Object,
      required: true
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
