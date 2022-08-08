<template>
  <div :class="$style.container">
    <N-Button-Close :class="$style.closeButton" color="#222222" background-color="rgba(34, 34, 34, 0.2)" @click="$emit('closeSheet')" />
    <h2 :class="$style.title">
      Вход и регистрация
    </h2>
    <div :class="$style.inputContainer">
      <N-Text-Field title="Ник" placeholder="Nice" type="text" color="#5289C5" />
      <N-Text-Field title="Email" placeholder="mail@example.com" type="email" color="#5289C5" />
      <N-Text-Field title="Пароль" placeholder="" type="password" color="#5289C5" />
      <N-Text-Field title="Повторите пароль" placeholder="" type="password" color="#5289C5" />
    </div>
    <N-Button background-color="#5289C5">
      Войти
    </N-Button>
    <N-Button :class="$style.noRegistered" type-button="transparent" color="#5289C5">
      Еще не зарегистрированы?
    </N-Button>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NRegistration',
  props: {
  },
  setup () {
  return {
  }
  }
}
</script>

<style scoped lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem 6rem;
  .closeButton {
    top: 1.5rem;
    right: 1.5rem;
  }
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
    margin-top: 2.4rem;
  }
}
</style>
