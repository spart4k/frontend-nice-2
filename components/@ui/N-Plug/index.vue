<template>
  <div :class="$style.plug">
    <span><a @click="$emit('login')">Войдите</a> или <a @click="$emit('registration')">зарегистрируйтесь</a> чтобы написать комментарий и оценить пост</span>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NPlug',
  props: {
  },
  setup () {
  return {
  }
  }
}
</script>

<style scoped lang="scss" module>
.plug{
        background: #F5F5F5;
        border-radius: 20px;
        padding: 1.9rem 2.2rem;
        text-align: center;
        color: $fontColorDefault;
        a {
          @include regular-text-bold;
          color: #F23D15;
          cursor: pointer;
        }
      }
</style>
