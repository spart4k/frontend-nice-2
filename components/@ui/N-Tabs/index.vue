<template>
  <nav>
    <ul :class="$style.list">
      <N-Tabs-Item v-for="(item, index) in tabsItem.data" :key="index" :item="item" />
    </ul>
  </nav>
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
