<template>
  <label :class="[$style.textField, $props.mdFz && $style.mdFz, $props.error.length || $props.errCustom ? $style.error : '']">
    <h3 v-if="$props.title" :class="$style.title">
      {{ $props.title }}
    </h3>
    <div :class="[$style.wrapperInput, $props.readOnly ? $style.readonly : '' ]">
      <span class="input-error" v-if="error">
        {{ errMessage }}
      </span>
      <span class="input-error" v-if="errCustom">
        {{ errCustom }}
      </span>
      <input
        v-model="proxyVal"
        v-mask="$props.mask"
        :type="$props.type"
        :max="$props.max"
        :placeholder="$props.placeholder"
        @keydown.enter="$emit('keydown', $event)"
      />
    </div>
  </label>
</template>
<script lang="js">
import { ref, watch, computed } from '@nuxtjs/composition-api'
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
    },
    type: {
      type: String,
      default: 'text'
    },
    max: {
      type: Number,
      default: null
    },
    error: {
      type: Array,
      default: () => []
    },
    errCustom: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const proxyVal = ref(props.value)

    watch(proxyVal, () => {
      emit('input', proxyVal.value)
    })
     watch(props, () => {
      proxyVal.value = props.value
     })
    const errMessage = computed(() => {
      if (props.error[0]) {
        const text = props.error[0].$message
        let newText = ''
        switch (text) {
          case 'Value is required':
            newText = 'Обязательное поле'
            break
          case 'Value is not a valid email address':
            newText = 'Email введен не корректно'
            break
          case 'This field should be at least 18 characters long':
            newText = 'Введите номер полностью'
            break
        }
        return newText
      }
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
      proxyVal,
      errMessage
    }
  }
}
</script>
<style lang="scss" module>
.textField {
  display: block;
  &.error {
    .wrapperInput {
      border: red 1px solid;
    }
  }
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
    position: relative;
    height: 5.1rem;
    padding-left: 1.478rem;
    padding-right: 1.478rem;
    background-color: $gray2;
    border: 1px solid $gray2;
    border-radius: 0.4rem;
    transition: .2s;
    span {
      position: absolute;
      bottom: -1.8rem;
      left: 0;
      color: red;
    }
    &.readonly {
      opacity: 0.3
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
