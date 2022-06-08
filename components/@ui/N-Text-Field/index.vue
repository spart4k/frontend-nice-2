<template>
  <label
    :class="[
      $style.textField,
      $props.mdFz && $style.mdFz
    ]"
  >
    <input v-model="getValue" type="text" @keydown.enter="test">
  </label>
</template>
<script lang="js">
import { computed } from '@nuxtjs/composition-api'
export default {
  name: 'NTextField',
  props: {
    value: undefined,
    mdFz: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const getValue = computed({
      get () {
        return props.value
      },
      set (val) {
        emit('input', val)
      }
    })

    const test = () => {
      console.log(true)
    }

    return {
      getValue,
      test
    }
  }
}
</script>
<style lang="scss" module>
.textField {
  display: block;
  height: 5.1rem;
  padding-left: 1.478rem;
  padding-right: 1.478rem;
  background-color: $gray2;
  border-radius: .4rem;
  &.mdFz {
    input {
      @include text;
    }
  }
  input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    font-weight: 600;
    @include text-md;
  }
}
</style>
