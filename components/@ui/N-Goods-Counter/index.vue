<template>
  <div :class="$style.wireNumber">
    <p :class="$style.wireText">
      Кол-во:
    </p>
    <v-select id="" :options="options" :class="$style.wireSelect" name="" />
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'NGoodsCounter',
  components: {
    vSelect
  },
  props: {
    options: {
      type: Array,
      default () {
        return ['1 шт.', '2 шт.', '3 шт.', '4 шт.', '5 шт.', '6 шт.', '7 шт.', '8 шт.', '9 шт.', '10 шт.', '11 шт.', '12 шт.', '13 шт.', '14 шт.', '15 шт.', '16 шт.', '17 шт.', '18 шт.', '19 шт.', '20 шт.']
      }
    }
  },
  setup (props) {
  return {
  }
  }
}
</script>

<style scoped lang="scss" module>
    .wireText {
      @include regular-text;
      opacity: 0.5;
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
      :global(.vs__dropdown-menu) {
        @media (max-width: $mobileWidth) {
            max-height: 20rem;
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
    .wireInput {
      width: 100%;
      @include regular-text;
      color: $fontColorDefault;
      padding: 1rem 0;
      border: none;
      border-bottom: .2rem solid #C83F8E;
      outline: none;
    }
</style>
