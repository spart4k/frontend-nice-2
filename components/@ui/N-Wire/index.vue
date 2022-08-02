<template>
  <div :class="$style.wire">
    <div :class="$style.wireIncoming">
      <p :class="$style.wireText">
        Входящее соединение:
      </p>
      <v-select id="" :options="['Xir M', 'Jack 6.3 Stereo']" :class="$style.wireSelect" name="" />
    </div>
    <div :class="$style.wireOutcoming">
      <p :class="$style.wireText">
        Исходящее соединение:
      </p>
      <v-select id="" :options="['Xir M', 'Jack 6.3 Stereo']" :class="$style.wireSelect" name="" />
    </div>
    <div :class="$style.wireLength">
      <p :class="$style.wireText">
        Длина (см.):
      </p>
      <input :class="$style.wireInput" type="number">
    </div>
    <div :class="$style.wireColorSection">
      <p :class="$style.wireText">
        Цвет
      </p>
      <div ref="color" :class="$style.wireColorBox">
        <label :class="[$style.wireColor,$style.borderRed]" for="">
          <input name="color" type="radio">
          <span :class="[$style.checkmark,$style.backgroundRed]" />
        </label>
        <label :class="[$style.wireColor,$style.borderBlue]" for="">
          <input name="color" type="radio">
          <span :class="[$style.checkmark,$style.backgroundBlue]" />
        </label>
        <label :class="[$style.wireColor,$style.borderBlack]" for="">
          <input name="color" type="radio">
          <span :class="[$style.checkmark,$style.backgroundBlack]" />
        </label>
        <label :class="[$style.wireColor,$style.borderPurple]" for="">
          <input name="color" type="radio">
          <span :class="[$style.checkmark,$style.backgroundPurple]" />
        </label>
        <label :class="[$style.wireColor,$style.borderYellow]" for="">
          <input name="color" type="radio">
          <span :class="[$style.checkmark,$style.backgroundYellow]" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'
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
  return {
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
      border-bottom: 2px solid #C83F8E;
      outline: none;
    }
    .wireSelect {
      width: 100%;
      @include regular-text;
      color: $fontColorDefault;
      border: none;
      border-bottom: 2px solid #C83F8E;
      outline: none;
      :global(.vs__dropdown-toggle) {
        border: none;
        padding: 0;
        :global(.vs__selected-options) {
          padding: 0;
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
      gap: 1.5rem;
      padding: 0;
        .wireColor {
          width: 3.2rem;
          height: 3.2rem;
          position: relative;
          border: red solid 2px;
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
          .backgroundRed {
          background-color: #F23D15;
          }
          .backgroundBlue {
            background-color: #5289C5;
          }
          .backgroundBlack {
            background-color: #222222;
          }
          .backgroundPurple {
            background-color: #C83F8E;
          }
          .backgroundYellow {
            background-color: #DCB247;
          }
          input:checked ~ .checkmark {
            background-color: #F8F8F8;
            width: 2rem;
            height: 2rem;
            top: calc(50% - 1rem);
            left: calc(50% - 1rem);
          }
        }
        .borderRed {
          border-color: #F23D15;
        }
        .borderBlue {
          border-color: #5289C5;
        }
        .borderBlack {
          border-color: #222222;
        }
        .borderPurple {
          border-color: #C83F8E;
        }
        .borderYellow {
          border-color: #DCB247;
        }
      }
    }
  }
</style>
