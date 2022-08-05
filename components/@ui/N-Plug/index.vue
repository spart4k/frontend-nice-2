<template>
  <div :class="$style.plug">
    <span>Войдите</span> или <span>зарегистрируйтесь</span> чтобы написать комментарий и оценить пост
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
        margin-top: 2rem;
        margin-bottom: 3.5rem;
        span {
          @include regular-text-bold;
          color: #F23D15
        }
      }
</style>
