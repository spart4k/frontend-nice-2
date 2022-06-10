<template>
  <div>
    <the-header :header-items="headerItems" />
    <Nuxt />
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'DefaultLayout',
  setup () {
    const headerItems = ref([
      { title: 'Музыка', url: '/music' },
      { title: 'Видео', url: '/' },
      { title: 'Чтиво', url: '/' },
      { title: 'Искусство', url: '/art' },
      { title: 'Кухня', url: '/' },
      { title: 'Магазин', url: '/' },
      { title: 'Фото', url: '/photo' },
      { title: 'Одежда', url: '/' },
      { title: 'Мероприятия', url: '/' },
      { title: 'Эфир', url: '/' }
    ])
    return {
      headerItems
    }
  }
}
</script>

<style scoped module lang="scss">
.main {

}
</style>
