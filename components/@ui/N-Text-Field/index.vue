<template>
  <label
    :class="[
      $style.textField,
      $props.mdFz && $style.mdFz
    ]"
  >
    <h3 v-if="$props.title" :class="$style.title">
      {{ $props.title }}
    </h3>
    <div :class="$style.wrapperInput">
      <input
        v-model="proxyVal"
        v-mask="$props.mask"
        type="text"
        :placeholder="$props.placeholder"
        @keydown.enter="$emit('keydown', $event)"
      >
    </div>
  </label>
</template>
<script lang="js">
import { ref, watch } from '@nuxtjs/composition-api'
export default {
  name: 'NTextField',
  props: {
    value: undefined,
    title: {
      type: String,
      default: ''
    },
    mdFz: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const proxyVal = ref(props.value)

    watch(proxyVal, () => {
      emit('input', proxyVal.value)
    })

    // const getValue = computed({
    //   get () {
    //     return props.value
    //   },
    //   set (val) {
    //     emit('input', val)
    //   }
    // })

    return {
      proxyVal
    }
  }
}
</script>
<style lang="scss" module>
.textField {
  display: block;

  &.mdFz {
    input {
      @include text;
    }
  }
  h3 {
    color: $fontColorDefault;
    @include text-md;
    margin-bottom: 0.75rem;
  }
  .wrapperInput {
    height: 5.1rem;
    padding-left: 1.478rem;
    padding-right: 1.478rem;
    background-color: $gray2;
    border-radius: .4rem;
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
