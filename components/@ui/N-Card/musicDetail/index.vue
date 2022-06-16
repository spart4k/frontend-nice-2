<template>
  <N-Card-Default v-bind="$props">
    <template v-if="data.files" #footer>
      <div v-for="item in data.files" :key="item.id" :class="$style.row">
        <h2>
          W$BfS7LnBr7C

          {{ item.title }}
        </h2>
        <N-Audio :src="`https://nice.c.roky.rocks/${item.src}`" />
      </div>
    </template>
  </N-Card-Default>
</template>
<script lang="js">
import dataProps from '../props'
export default {
  name: 'MusicDetail',
  props: {
    ...dataProps.props,
    audio: {
      type: Array,
      default: null
    }
  }
}
</script>
<style lang="scss" module>
.row {
  border-bottom: 1px $gray solid;
  padding-bottom: 1.731rem;
  & + .row {
     margin-top: 1.758rem;
  }
  h2 {
    margin-bottom: .64rem;
    @include text-md;
  }
}

</style>
