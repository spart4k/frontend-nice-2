<template>
  <n-intro :description="introTitle">
    <div class="">
      <FormAuthSteps v-model="activeAuthSteps" />
    </div>
  </n-intro>
</template>
<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  name: 'authPage',
  setup () {
    const activeAuthSteps = ref(true)
    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
    })
    return {
      introTitle,
      activeAuthSteps
    }
  }
}
</script>
<style lang="scss" module>
.cards {
  width: 100%;
  &__item {
    margin-bottom: 2rem;
  }
}
</style>
