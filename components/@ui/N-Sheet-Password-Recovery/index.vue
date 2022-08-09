<template>
  <div>
    <h2 :class="$style.title">
      Восстановить пароль
    </h2>
    <h3 :class="$style.subtitle">Мы отправим письмо на указанный email с новым паролем</h3>
    <div :class="$style.inputContainer">
      <N-Text-Field title="Email" placeholder="mail@example.com" type="email" color="#5289C5" />
    </div>
    <N-Button type-button="wide" background-color="#5289C5">
      Восстановить пароль
    </N-Button>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSheetLogin',
  props: {
  },
  setup () {
  return {
  }
  }
}
</script>

<style scoped lang="scss" module>
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 2.7rem;
  }
  .subtitle {
    @include regular-text;
    color: $fontColorDefault;
    text-align: center;
    opacity: 0.5;
    margin-top: 1rem;
  }
  .inputContainer{
    display: flex;
    flex-direction: column;
    margin: 1.3rem 0 2.5rem;
    gap: 2.5rem;
  }
  .recovery {
    margin: 2.5rem 0;
    font-size: 14px;
  }
  .noRegistered {
    margin-top: 1rem;
  }
</style>
