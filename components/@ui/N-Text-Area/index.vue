<template>
  <div :class="$style.textarea">
    <textarea v-model="getVal" />
  </div>
</template>
<script lang="js">
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'NTextArea',
  props: {
    value: undefined
  },
  setup (props, ctx) {
    const { emit } = ctx
    const getVal = computed({
      get () {
        return props.value
      },
      set (val) {
        emit('input', val)
      }
    })
    return {
      getVal
    }
  }
}
</script>
<style lang="scss" module>
.textarea {}
</style>
