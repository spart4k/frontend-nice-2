<template>
  <multiselect
    v-model="selectedElement"
    :placeholder="placeholder"
    :options="item"
    :class="$style.dropdown"
    :show-labels="false"
    :searchable="false"
    label="title"
    @input="selectItem"
  />
</template>

<script>
import Multiselect from 'vue-multiselect'
import { ref, watch } from '@nuxtjs/composition-api'
import props from '~/components/@ui/N-Card/props'

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
    const selectedElement = ref('')
    const selectItem = () => {
      emit('select', selectedElement.value)
    }
    watch(() => props.item, () => {
      selectedElement.value = props.item[0].title
    }, { deep: true })
    return {
      selectItem,
      selectedElement
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
    background-color: inherit;
  }
}
</style>
