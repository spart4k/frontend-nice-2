<template>
  <TheHeader :header-items="headerItems" />
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'IndexPage',
  setup () {
    const headerItems = ref([
      { title: 'Музыка', url: '/' },
      { title: 'Видео', url: '/' },
      { title: 'Чтиво', url: '/' },
      { title: 'Искусство', url: '/' },
      { title: 'Кухня', url: '/' },
      { title: 'Магазин', url: '/' },
      { title: 'Фото', url: '/' },
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
