<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Оформление заказа
    </h2>
    <NTabsStepper>
      <template #body="currentTab">
        <transition name="fade-fast">
          <components
            :is="currentTab.currentTab"
            @changeStep="$emit('changeStep','increment')"
            @toAddress="($event) => $emit('toAddress', $event)"
          />
        </transition>
      </template>
    </NTabsStepper>
  </div>
</template>

<script>
import TabDelivery from './components/TabDelivery'
import TabPickup from './components/TabPickup'
export default {
  name: 'StepOne',
  components: {
    TabDelivery,
    TabPickup
  },
  setup () {
    return {}
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  overflow: auto;
  @include paddings;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  height: 100%;
  //overflow-y: auto;
  @include paddings;
  overscroll-behavior-y: contain !important;
  transform: translate3d(0px, 0, 0);
  color: $fontColorDefault;
}
.title {
  text-align: center;
  @include text-style-h2;
  margin-bottom: 2rem;
}
.btn {
  width: 100%;
}
</style>
