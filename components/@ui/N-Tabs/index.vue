<template>
  <ul :class="$style.list">
    <N-Tabs-Item v-for="(item, index) in tabsItem" :key="index" :item="item" />
  </ul>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'NTabs',
  setup () {
    const { store } = useContext()
    const tabsItem = computed(() => store.state.content.sections)
    return {
      tabsItem
    }
  }
}
</script>

<style scoped lang="scss" module  src="./style.scss"></style>
