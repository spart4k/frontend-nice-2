<template>
  <div :class="$style.wireNumber">
    <p :class="$style.wireText">
      Кол-во:
    </p>
    <v-select
      id=""
      v-model="amount"
      :options="totalCount"
      :class="$style.wireSelect"
      name=""
      @input="sendValue"
    />
  </div>
</template>

<script>
import { ref, computed } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'NGoodsCounter',
  components: {
    vSelect
  },
  props: {
    counter: {
      type: String
    },
    count: {
      type: Number
    }
  },
  setup (props, ctx) {
    const amount = ref(props.counter)
    const { emit } = ctx
    const totalCount = computed(() => {
      const count = props.count
      const array = []
      for (let i = 1; i <= count; i++) {
        array.push(i + ' шт.')
      }
      return (array)
    })
    const sendValue = () => {
      emit('sendCount', amount)
    }
  return {
    sendValue,
    amount,
    totalCount
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
