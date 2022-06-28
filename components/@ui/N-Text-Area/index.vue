<template>
  <div :class="$style.wrapper">
    <h3 :class="$style.title">
      {{ $props.title }}
    </h3>
    <textarea
      ref="textAreaRef"
      v-model="getVal"
      @input="resizeTextarea"
      :placeholder="$props.placeholder"
    />
  </div>
</template>
<script lang="js">
import { computed, ref } from '@nuxtjs/composition-api'

export default {
  name: 'NTextArea',
  props: {
    value: undefined,
    title: {
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
    const textAreaRef = ref(null)
    const getVal = computed({
      get () {
        return props.value
      },
      set (val) {
        emit('input', val)
      }
    })

    const resizeTextarea = (e) => {
      const area = e.target
      area.style.overflow = 'hidden'
      area.style.height = textAreaRef.value.scrollHeight + 'px'
    }

    return {
      getVal,
      textAreaRef,
      resizeTextarea
    }
  }
}
</script>
<style lang="scss" module scoped>
textarea {
  padding: 1rem;
  min-height: 13rem;
  width: 100%;
  background-color: $gray2;
  border-radius: .4rem;
  border: none;
  outline: none;
  resize: none;
  border: 1px solid transparent;
  &:focus {
    border: 1px solid $fontColorDefault;
  }
  &:not(:placeholder-shown) {
    border: 1px solid $fontColorDefault;
  }
}
h3 {
  margin-bottom: 0.75rem
}
.wrapper {
  .title {
    color: $fontColorDefault;
    @include text-md;
    margin-bottom: 0.75rem;
  }
}

</style>
