<template>
  <div>
    <h2 :class="$style.title">
      Вход и регистрация
    </h2>
    <div :class="$style.inputContainer">
      <N-Text-Field title="Ник" placeholder="Nice" type="text" color="#5289C5" />
      <N-Text-Field title="Email" placeholder="mail@example.com" type="email" color="#5289C5" />
      <N-Text-Field title="Пароль" placeholder="" type="password" color="#5289C5" />
      <N-Text-Field title="Повторите пароль" placeholder="" type="password" color="#5289C5" />
    </div>
    <N-Button type-button="wide" background-color="#5289C5">
      Войти
    </N-Button>
    <N-Button :class="$style.noRegistered" type-button="wide" color="#5289C5">
      Еще не зарегистрированы?
    </N-Button>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSheetRegister',
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
  .inputContainer{
    display: flex;
    flex-direction: column;
    margin: 2rem 0 2.5rem;
    gap: 2.5rem;
  }
  .noRegistered {
    margin-top: 1rem;
  }
</style>
