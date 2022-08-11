<template>
  <div :class="$style.tabs__item">
    <div :class="$style.wrapper">
      <div :class="$style.list">
        <div
          v-for="(item, index) in tabsItem"
          :key="item.value"
          :class="[$style.item, item.value === currentTab && $style.active]"
          @click="transformActive(index, item.value)"
        >
          {{ item.title }}
        </div>
        <span ref="glider" :class="$style.glider" />
      </div>
    </div>
    <slot name="body" :current-tab="currentTab" />
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NTabs',
  setup () {
    const currentTab = ref('TabPickup')
    const glider = ref(null)
    const tabsItem = [
      { title: 'Самовывоз', value: 'TabPickup' },
      { title: 'Доставка', value: 'TabDelivery' }
    ]
    const transformActive = (index, value) => {
      currentTab.value = value
      glider.value.style.transform = `translateX(${100 * index}%)`
    }
    return {
      tabsItem,
      currentTab,
      glider,
      transformActive
    }
  }
}
</script>

<style lang="scss" module>
  ul {
    padding-left: 0;
    margin: 0;
  }
  .wrapper {
    width: 100%;
    border-radius: 2.5rem;
    margin-bottom: 2.5rem;
    padding: .5rem;
    background-color: $gray3;
  }
  .list {
    display: flex;

    position: relative;

  }
  .glider {
    content: '';
    position: absolute;
    top: 0rem;
    left: 0rem;
    z-index: 3;
    width: 50%;
    height: 100%;
    background-color: $pink2;
    border-radius: 2.5rem;
    transition: transform 0.5s $animationTiming1;
  }
  .item {
    width: 50%;
    border-radius: 2rem;
    background-color: transparent;
    list-style: none;
    line-height: 4rem;
    text-align: center;
    position: relative;
    z-index: 4;
    @include regular-text;
    transition: color 0.5s $animationTiming1;
    cursor: pointer;
    &.active {
      color: $white;
    }
  }
</style>
