<template>
  <multiselect
    v-model="v"
    :placeholder="placeholder"
    :options="item"
    :class="$style.dropdown"
    :show-labels="false"
    label="title"
    @select="selectItem"
  />
</template>

<script>
import Multiselect from 'vue-multiselect'
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NDropdown',
  components: {
    Multiselect
  },
  props: {
    item: Array,
    placeholder: String
  },
  setup (_, { emit }) {
    const v = ref(null)
    const data = ref([
      { name: 'Vue.js', language: 'JavaScript' },
      { name: 'Rails', language: 'Ruby' },
      { name: 'Sinatra', language: 'Ruby' },
      { name: 'Laravel', language: 'PHP', $isDisabled: true },
      { name: 'Phoenix', language: 'Elixir' }
    ])
    const selectItem = (value) => {
      emit('select', value)
    }
    return {
      data,
      selectItem,
      v
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped module lang="scss">
.dropdown {
  :global(.multiselect__single) {
    color: $black;
    @include text-md;
    @include montserratSemiBold;
  }
}
</style>
