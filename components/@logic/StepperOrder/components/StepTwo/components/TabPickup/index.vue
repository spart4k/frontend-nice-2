<template>
  <form>
    <div :class="$style.row">
      <n-text-field title="ФИО" />
    </div>
    <div :class="$style.row">
      <n-text-field title="Телефон" />
    </div>
    <div :class="$style.row">
      <n-text-field title="Email" />
    </div>
    <div :class="$style.row">
      <n-text-field title="Адрес" />
    </div>
    <div :class="$style.row">
      <n-text-field title="ФИО" />
    </div>
    <n-button
      :class="$style.btn"
      :type-button="'pink'"
      @click="$emit('changeStep', 'increment')"
    >
      Оформить заказ
    </n-button>
  </form>
</template>

<script>
export default {
  name: 'TabDelivery'
}
</script>

<style lang="scss" module>
.btn {
  width: 100%;
}
</style>
