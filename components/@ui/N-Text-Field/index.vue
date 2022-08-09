<template>
  <label :class="[$style.textField, $props.mdFz && $style.mdFz, $props.error.length || $props.errCustom ? $style.error : '', $props.readOnly ? $style.readonly : '']">
    <h3 v-if="$props.title" :class="$style.title">
      {{ $props.title }}
    </h3>
    <div :class="[$style.wrapperInput]">
      <!-- <span v-if="error" :class="$style.inputError">
        {{ errMessage }}
      </span>
      <span v-if="errCustom" :class="$style.inputError">
        {{ errCustom }}
      </span> -->
      <input
        v-model="proxyVal"
        v-mask="$props.mask"
        :style="{ borderColor: color }"
        :type="$props.type"
        :max="$props.max"
        :readOnly="readOnly"
        :placeholder="$props.placeholder"
        @keydown.enter="$emit('keydown', $event)"
      >
    </div>
    <p v-if="error" :class="$style.inputError">
      {{ errMessage }}
    </p>
  </label>
</template>
<script lang="js">
import { ref, watch, computed } from '@nuxtjs/composition-api'
export default {
  name: 'NTextField',
  props: {
    valueInfo: undefined,
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
      default: ' '
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
    },
    color: {
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
    watch(() => props.valueInfo, (newValue, oldValue) => { proxyVal.value = newValue })
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
  &.readonly {
    pointer-events: none;
    .wrapperInput {
      opacity: 0.3;

    }
  }
  &.error {
    .wrapperInput {
      input {
        border: red 1px solid
      }
    }
  }
  &.mdFz {
    input {
      @include regular-text;
    }
  }
  h3 {
    @include regular-text;
    color: $fontColorDefault;
    opacity: 0.5;
  }
  .wrapperInput {
  box-sizing: border-box;
    position: relative;
    // span {
    //   position: absolute;
    //   bottom: -1.8rem;
    //   left: 0;
    //   color: red;
    // }
  }
  input {
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    border-radius: inherit;
    border-bottom: .2rem solid;
    @include regular-text;
    color: $fontColorDefault;
    padding: 1rem 0;
  }
  input[type=password] {
    padding-top: 0;
    font-size: 24px;
  }
  input::placeholder {
    color: $fontColorDefault;
    opacity: 0.5;
  }
  .inputError {
    margin-top: 1rem;
    color: #D13C33;
    @include regular-text;
  }
}
</style>
