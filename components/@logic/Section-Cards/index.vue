<template>
  <div :class="$style.wrapper">
    <template v-if="id === 2">
      <N-Card-Default :detail-page="detailPage" with-video :data="card" @clickTag="($event) => $emit('clickTag', $event)" />
    </template>
    <template v-else-if="id === 11">
      <N-Card-Coin />
    </template>
    <template v-else>
      <N-Card-Default
        :detail-page="detailPage"
        :data="card"
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
    detailPage: {
      type: Boolean,
      required: false
    },
    setup (props) {
      console.log(props.id)
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  width: 100%;

}
</style>
