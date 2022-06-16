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
      title: 'ВИДЕО',
      subtitle: 'чето там про видео про видео про видео',
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
