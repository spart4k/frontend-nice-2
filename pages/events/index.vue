<template>
  <div>
    <n-intro :description="introTitle">
      <N-Card-Default
        v-bind="NCard"
        :amount-comment="32"
        :images="[{ src: require('~/assets/img/testPlug.jpg') }, { src: require('~/assets/img/testPlug.jpg') }]"
      />
      <N-Card-Default
        v-bind="NCard"
        :amount-comment="32"
        :images="[{ src: require('~/assets/img/testPlug.jpg') }, { src: require('~/assets/img/testPlug.jpg') }]"
      />
      <N-Card-Default
        v-bind="NCard"
        :amount-comment="32"
        :images="[{ src: require('~/assets/img/testPlug.jpg') }, { src: require('~/assets/img/testPlug.jpg') }]"
      />
    </n-intro>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NMusic',
  layout: 'default',
  setup () {
    const introTitle = ref({
      title: 'ВИДЕО',
      subtitle: 'чето там про видео про видео про видео'

    })
    const NCard = ref({
      images: [{ src: require('~/assets/img/testPlug.jpg') }],
      video: require('~/assets/video/testPlug.mp4'),
      title: 'Название альбома',
      description: 'Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал',
      chips: ['музыка'],
      amountComment: 0,
      audio: [
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '123' },
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '1233' },
        { title: 'Название композиции', src: '/media/cc0-audio/t-rex-roar.mp3', id: '12321' }
      ]
    })
    return {
      NCard,
      introTitle
    }
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
}
</style>
