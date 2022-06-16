<template>
  <div>
    <n-intro :description="introTitle">
      <!--      <N-Card-MusicDetail :data="card" />-->
    </n-intro>
  </div>
</template>

<script>
import { ref, useRoute } from '@nuxtjs/composition-api'

export default {
  name: 'NMusic',
  layout: 'default',
  setup () {
    const route = useRoute()

    const introTitle = ref({
      title: 'МУЗЫКА',
      subtitle: 'чето там про музыку про музыку про музыку',
      background: route.value.name
    })
    return {
      introTitle
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
}
</style>
