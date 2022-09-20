<template>
  <label
    :class="[
      $style.textField,
      $props.mdFz && $style.mdFz,
      $props.error.length || $props.errCustom ? $style.error : '',
      $props.readOnly ? $style.readonly : '',
      $style[$props.colorBorder]
    ]"
  >
    <h3 v-if="$props.title" :class="$style.title">
      {{ $props.title }}
    </h3>
    <div :class="[$style.wrapperInput]">
      <input
        v-if="debounce"
        v-model="proxyVal"
        v-mask="$props.mask"
        v-debounce:350ms="sendValue"
        :style="{ borderColor: color }"
        :type="$props.type"
        :max="$props.max"
        :readOnly="readOnly"
        :placeholder="$props.placeholder"
        @keydown.enter="$emit('keydown', $event)"
      >
      <input
        v-else
        v-model="proxyVal"
        v-mask="$props.mask"
        :style="{ borderColor: color }"
        :type="$props.type"
        :max="$props.max"
        :readOnly="readOnly"
        :placeholder="$props.placeholder"
        @input="sendValue"
        @keydown.enter="$emit('keydown', $event)"
      >
      <p v-if="error" :class="$style.inputError">
        {{ error }}
      </p>
    </div>
  </label>
</template>
<script lang="js">
import { ref, watch } from '@nuxtjs/composition-api'
export default {
  name: 'NTextField',
  props: {
    valueInfo: undefined,
    value: {
      type: String,
      default: ''
    },
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
    },
    colorBorder: {
      type: String,
      default: ''
    },
    debounce: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const proxyVal = ref(props.value)
    const sendValue = () => {
      emit('sendCount', proxyVal.value)
    }

    watch(proxyVal, () => {
      emit('input', proxyVal.value)
    })
    watch(() => props.valueInfo, (newValue, oldValue) => { proxyVal.value = newValue })
    return {
      proxyVal,
      sendValue
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
        border-color: #D13C33
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
  // input[type=password] {
    // padding-top: 0;
    // font-size: 2.4rem;
  // }
  input::placeholder {
    color: $fontColorDefault;
    opacity: 0.5;
  }
  .inputError {
    margin-top: 1rem;
    color: #D13C33;
    @include regular-text;
  }
  &.pinkBorder {
    input {
      border-color:$pink2 ;
    }
  }
  &.blueBorder {
    input {
      border-color:$blue2;
    }
  }
}
</style>
