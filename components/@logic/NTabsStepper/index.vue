<template>
  <div :class="$style.tabs__item">
    <ul :class="$style.list">
      <li
        v-for="item in tabsItem"
        :key="item.value"
        :class="[$style.item, item.value === currentTab && $style.active]"
        @click="currentTab = item.value"
      >
        {{ item.title }}
      </li>
    </ul>
    <slot name="body" :current-tab="currentTab" />
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NTabs',
  setup () {
    const currentTab = ref('TabDelivery')
    const tabsItem = [
      { title: 'Доставка', value: 'TabDelivery' },
      { title: 'Самовывоз', value: 'TabPickup' }
    ]
    return {
      tabsItem,
      currentTab
    }
  }
}
</script>

<style lang="scss" module>
  ul {
    padding-left: 0;
    margin: 0;
  }
  .list {
    width: 100%;
    display: flex;
    background-color: $gray3;
    border-radius: 2.5rem;
    padding: .5rem;
    margin-bottom: 2.5rem;
  }
  .item {
    width: 50%;
    border-radius: 2rem;
    background-color: transparent;
    list-style: none;
    line-height: 4rem;
    text-align: center;
    @include regular-text;
    &.active {
      background-color: $pink2;
      color: $white;
    }
  }
</style>
