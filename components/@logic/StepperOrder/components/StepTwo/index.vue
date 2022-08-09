<template>
  <div>
    <h2 :class="$style.title">
      Оформление заказа
    </h2>
    <NTabsStepper>
      <template #body="currentTab">
        <components :is="currentTab.currentTab" @click="$emit('changeStep', 'increment')" />
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
    const basketItem = {
      title: 'Sprite',
      price: 3200,
      pivot: {
        quantity: 2
      },
      images: [
        { src: 'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs' }
      ]
    }
    return {
      basketItem
    }
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
