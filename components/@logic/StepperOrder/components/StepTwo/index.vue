<template>
  <div>
    <h2 :class="$style.title">
      Оформление заказа
    </h2>
    <NTabsStepper>
      <template #body="currentTab">
        <components
          :is="currentTab.currentTab"
          @changeStep="$emit('changeStep','increment')"
        />
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
.title {
  text-align: center;
  @include text-style-h2;
  margin-bottom: 2rem;
}
.btn {
  width: 100%;
}
</style>
