<template>
  <div :class="$style.wire">
    <div v-if="wire" :class="$style.wireIncoming">
      <p :class="$style.wireText">
        Входящее соединение:
      </p>
      <v-select
        v-model="formData.input"
        :options="optionsInput"
        :class="$style.wireSelect"
        @input="setSelectedInput"
      />
      <p v-if="$errors.input[0]" :class="$style.inputError">
        {{ $errors.input[0] }}
      </p>
    </div>
    <div v-if="wire" :class="$style.wireOutcoming">
      <p :class="$style.wireText">
        Исходящее соединение:
      </p>
      <v-select
        v-model="formData.output"
        :options="optionsOutput"
        :class="$style.wireSelect"
        @input="setSelectedOutput"
      />
      <p v-if="$errors.output[0]" :class="$style.inputError">
        {{ $errors.output[0] }}
      </p>
    </div>
    <div v-if="wire" :class="$style.wireLength">
      <p :class="$style.wireText">
        Длина (см.):
      </p>
      <input
        v-model="formData.length"
        v-mask="'Q###'"
        type="text"
        :class="$style.wireInput"
      >
      <p v-if="$errors.length[0]" :class="$style.inputError">
        {{ $errors.length[0] }}
      </p>
    </div>
    <div>
      <N-Goods-Counter v-model="formData.count" @sendCount="sendCount" />
      <p v-if="$errors.count[0]" :class="$style.inputError">
        {{ $errors.count[0] }}
      </p>
    </div>
    <div v-if="wire" :class="$style.wireColorSection">
      <p :class="$style.wireText">
        Цвет
      </p>
      <div ref="color" :class="$style.wireColorBox">
        <label v-for="color in colorArray" :key="color" :class="$style.wireColor" :style="{ borderColor: color }">
          <input name="color" type="radio" :checked="color === formData.color">
          <span :class="$style.checkmark" :style="{ backgroundColor: color }" />
        </label>
      </div>
    </div>
    <N-Button
      :class="$style.buyButton"
      background-color="#C83F8E"
      :disabled="$v.$invalid && $touched "
      @click="submit"
    >
      Купить
    </N-Button>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import useForm from '~/compositions/useForm'
import { required } from '~/utills/validations'

export default {
  name: 'NPurchase',
  components: {
    vSelect
  },
  props: {
      wire: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
  const colorArray = ref(['rgb(126 100 181)', 'rgb(92, 155, 213)', 'rgb(213, 62, 77)', 'rgb(220, 196, 68)', 'rgb(56, 130, 98)', 'rgb(78 186 206)'])
  const optionsDefault = ref(['MIDI', 'RCA', 'XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO'])
  const optionsInput = ref(['MIDI', 'RCA', 'XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO'])
  const optionsOutput = ref(['MIDI', 'RCA', 'XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO'])
  const setSelectedInput = (value) => {
    optionsOutput.value = optionsDefault.value
    if (value === 'MIDI') {
      optionsOutput.value = ['MIDI']
    } else if (value === 'RCA') {
      optionsOutput.value = ['RCA', 'XLR M', 'XLR F', 'JACK 6.3 MONO', 'JACK 3.5 MONO']
    } else if (value === 'XLR M') {
      optionsOutput.value = ['RCA', 'XLR F', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO']
    } else if (value === 'XLR F') {
      optionsOutput.value = ['RCA', 'XLR M', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO']
    } else if (value === 'JACK 6.3 STEREO') {
      optionsOutput.value = ['XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 3.5 STEREO']
    } else if (value === 'JACK 6.3 MONO') {
      optionsOutput.value = ['RCA', 'XLR M', 'XLR F', 'JACK 6.3 MONO', 'JACK 3.5 MONO']
    } else if (value === 'JACK 3.5 STEREO') {
      optionsOutput.value = ['XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 3.5 STEREO']
    } else if (value === 'JACK 3.5 MONO') {
      optionsOutput.value = ['RCA', 'XLR M', 'XLR F', 'JACK 6.3 MONO', 'JACK 3.5 MONO']
    }
  }

  const setSelectedOutput = (value) => {
    optionsInput.value = optionsDefault.value
    if (value === 'MIDI') {
      optionsInput.value = ['MIDI']
    } else if (value === 'RCA') {
      optionsInput.value = ['RCA', 'XLR M', 'XLR F', 'JACK 6.3 MONO', 'JACK 3.5 MONO']
    } else if (value === 'XLR M') {
      optionsInput.value = ['RCA', 'XLR F', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO']
    } else if (value === 'XLR F') {
      optionsInput.value = ['RCA', 'XLR M', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO']
    } else if (value === 'JACK 6.3 STEREO') {
      optionsInput.value = ['XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 3.5 STEREO']
    } else if (value === 'JACK 6.3 MONO') {
      optionsInput.value = ['RCA', 'XLR M', 'XLR F', 'JACK 6.3 MONO', 'JACK 3.5 MONO']
    } else if (value === 'JACK 3.5 STEREO') {
      optionsInput.value = ['XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 3.5 STEREO']
    } else if (value === 'JACK 3.5 MONO') {
      optionsInput.value = ['RCA', 'XLR M', 'XLR F', 'JACK 6.3 MONO', 'JACK 3.5 MONO']
    }
  }
  const sendCount = (val) => {
    formData.count = val
  }
  const { formData, validate, $errors, $v, $touched } = useForm(
    {
      fields: {
        input: { default: '', validations: { required } },
        output: { default: '', validations: { required } },
        length: { default: '', validations: { required } },
        count: { default: '', validations: { required } },
        color: { default: 'rgb(126 100 181)', validations: { } }
      }
    })
  const submit = () => {
    if (!validate()) { return }
    console.log()
  }

    return {
      sendCount,
      submit,
      setSelectedInput,
      setSelectedOutput,
      colorArray,
      optionsOutput,
      optionsInput,
      optionsDefault,
      formData,
      $errors,
      $touched,
      $v
    }
  }
}
</script>

<style scoped lang="scss" module>
.wire {
    padding-top: .5rem;
    margin-bottom: 3rem;
    div+div {
      margin-top: 2.5rem;
    }
    .wireInput {
      width: 100%;
      @include regular-text;
      color: $fontColorDefault;
      padding: 1rem 0;
      border: none;
      border-bottom: .2rem solid #C83F8E;
      outline: none;
    }
    .wireSelect {
      width: 100%;
      @include regular-text;
      color: $fontColorDefault;
      border: none;
      border-bottom: .2rem solid #C83F8E;
      outline: none;
      :global(.vs__dropdown-toggle) {
        border: none;
        padding: 0;
        :global(.vs__selected-options) {
          padding: 0;
          :global(.vs__search) {
            padding: 0;
            font-size: 1.4rem !important;
          }
          :global(.vs__selected) {
            margin: 0;
            padding: 0;
          }
        }
        :global(.vs__actions) {
          margin: 1.3rem 0;
          padding: 0;
          :global(.vs__open-indicator) {
            fill: #C83F8E
          }
          :global(.vs__clear) {
            display: none
          }
        }
      }
    }
    .wireText {
      @include regular-text;
      opacity: 0.5;
    }
    .wireColorSection {
      .wireColorBox {
      margin-top: 1rem;
      display: flex;
      padding: 0;
      label+label {
        margin-left: 1.5rem;
      }
      .wireColor {
        width: 3.2rem;
        height: 3.2rem;
        position: relative;
        border: solid .2rem;
        border-radius: 50%;
        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          z-index: 5;
          width: 100%;
          height: 100%;
        }
        .checkmark {
          position: absolute;
          width: 3.2rem;
          height: 3.2rem;
          top: -2px;
          left: -2px;
          border-radius: 50%;
        }
        input:checked ~ .checkmark {
          width: 2rem;
          height: 2rem;
          top: calc(50% - 1rem);
          left: calc(50% - 1rem);
        }
      }
    }
  }
    :global(.vs__dropdown-option) {
      height: 4.5rem;
      display: flex;
      font-size: 1.6rem;
      align-items: center;
    }
    :global(.vs__dropdown-option--highlight) {
      background: #C83F8E;
    }
    .buyButton {
      margin-top: 2rem;
    }
    .inputError {
      margin-top: 1rem;
      color: #D13C33;
      @include regular-text;
    }
  }
</style>
