<template>
  <div :class="$style.wrapper">
    <template v-if="section.id === 2">
      <N-Card-Default
        :detail-page="detailPage"
        :comments="comments"
        with-video
        @setLike="changeLike"
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
        @setLike="changeLike"
        :data="detailPage ? card.data : card"
        @clickTag="($event) => $emit('clickTag', $event)"
        @clickAuthor="($event) => $emit('clickAuthor', $event)"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
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
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const changeLike = (state) => {
      emit('setStateLike', state)
    }
    return {
      changeLike
    }
  }
})
</script>

<style scoped lang="scss" module>
.wrapper {
  width: 100%;
}
</style>
