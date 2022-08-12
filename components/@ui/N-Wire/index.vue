<template>
  <div :class="$style.wire">
    <div :class="$style.wireIncoming">
      <p :class="$style.wireText">
        Входящее соединение:
      </p>
      <v-select
        v-model="wireInput"
        :options="optionsInput"
        :class="$style.wireSelect"
        @input="setSelectedInput"
      />
    </div>
    <div :class="$style.wireOutcoming">
      <p :class="$style.wireText">
        Исходящее соединение:
      </p>
      <v-select
        v-model="wireOutput"
        :options="optionsOutput"
        :class="$style.wireSelect"
        @input="setSelectedOutput"
      />
    </div>
    <div :class="$style.wireLength">
      <p :class="$style.wireText">
        Длина (см.):
      </p>
      <input type="text" pattern="\d*" maxlength="4" :class="$style.wireInput">
    </div>
    <N-Goods-Counter />
    <div :class="$style.wireColorSection">
      <p :class="$style.wireText">
        Цвет
      </p>
      <div ref="color" :class="$style.wireColorBox">
        <label :class="$style.wireColor" :style="{ borderColor: 'rgb(126 100 181)' }">
          <input name="color" type="radio">
          <span :class="$style.checkmark" :style="{ backgroundColor: 'rgb(126 100 181)' }" />
        </label>
        <label :class="$style.wireColor" :style="{ borderColor: '#5c9bd5' }">
          <input name="color" type="radio">
          <span :class="$style.checkmark" :style="{ backgroundColor: '#5c9bd5' }" />
        </label>
        <label :class="$style.wireColor" :style="{ borderColor: '#d53e4d' }">
          <input name="color" type="radio">
          <span :class="$style.checkmark" :style="{ backgroundColor: '#d53e4d' }" />
        </label>
        <label :class="$style.wireColor" :style="{ borderColor: '#DCC444' }">
          <input name="color" type="radio">
          <span :class="$style.checkmark" :style="{ backgroundColor: '#DCC444' }" />
        </label>
        <label :class="$style.wireColor" :style="{ borderColor: '#388262' }">
          <input name="color" type="radio">
          <span :class="$style.checkmark" :style="{ backgroundColor: '#388262' }" />
        </label>
        <label :class="$style.wireColor" :style="{ borderColor: 'rgb(78 186 206)' }">
          <input name="color" type="radio">
          <span :class="$style.checkmark" :style="{ backgroundColor: 'rgb(78 186 206)' }" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'NWire',
  components: {
    vSelect
  },
  props: {
  },
  setup (props) {
  const optionsDefault = ref(['MIDI', 'RCA', 'XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO'])
  const optionsInput = ref(['MIDI', 'RCA', 'XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO'])
  const optionsOutput = ref(['MIDI', 'RCA', 'XLR M', 'XLR F', 'JACK 6.3 STEREO', 'JACK 6.3 MONO', 'JACK 3.5 STEREO', 'JACK 3.5 MONO'])
  const wireOutput = ref()
  const wireInput = ref()
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
    return {
      setSelectedInput,
      setSelectedOutput,
      optionsOutput,
      optionsInput,
      optionsDefault,
      wireOutput,
      wireInput
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
  }
</style>
