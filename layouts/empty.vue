<template>
  <div>
    <the-header :header-items="headerItems" class="header" />
    <N-Intro-Slug :description="introTitle">
      <Nuxt />
    </N-Intro-Slug>
  </div>
</template>

<script>
import { ref, useAsync, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'EmptyLayout',
  setup () {
    const { store } = useContext()

    const introTitle = ref({
      title: 'Главная',
      subtitle: 'творческое объединение',
      background: ''
    })

   const headerItems = useAsync(async () => {
      const response = await store.dispatch('content/getHeader')
     return response
    })

    return {
      introTitle,
      store,
      headerItems
    }
  }
}
</script>

<style scoped>

</style>
