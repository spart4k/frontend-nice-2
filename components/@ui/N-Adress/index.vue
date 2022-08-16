<template>
  <div>
    <p :class="$style.subtitle">
      Адрес
    </p>
    <v-select
      :options="['Moscow','Samara']"
      :class="$style.citySelect"
    />
    <n-text-field :class="$style.input" placeholder="Улица, дом, квартира" color="#C83F8E" />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'NAdress',
  components: {
    vSelect
  },
  props: {
  }
}
</script>

<style scoped lang="scss" module>
.subtitle {
    @include regular-text;
    color: $fontColorDefault;
    opacity: 0.5;
}
.citySelect {
    width: 100%;
    @include regular-text;
    color: $fontColorDefault;
    border: none;
    border-bottom: .2rem solid #C83F8E;
    outline: none;
    margin-bottom: 1.5rem;
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
