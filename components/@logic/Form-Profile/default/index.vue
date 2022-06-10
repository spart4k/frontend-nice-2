<template>
  <n-contain>
    <form>
      <n-text-field v-model="formData.firstName" :class="$style.input" title="Имя" />
      <n-text-field v-model="formData.lastName" :class="$style.input" title="Фамилия" />
      <n-text-area v-model="formData.address" :class="$style.input" title="Адрес с городом и индексом" />
      <n-button :class="$style.button" type="submit">
        Сохранить изменения
      </n-button>
      <small @click="closeProfile">Выйти из профиля</small>
    </form>
  </n-contain>
</template>
<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  name: 'FormProfileDefault',
  setup () {
    const formData = ref({
      firstName: '',
      lastName: ''
    })
    const closeProfile = () => {

    }

    return {
      formData,
      closeProfile
    }
  }
}
</script>
<style lang="scss" module>
form {
  & > .input + .input {
    margin-top: 1.6rem;
  }
  & > .button {
    margin-top: 1.7rem;
  }
}
small {
  display: block;
  color: $orange;
  text-decoration: underline;
  text-align: center;
  margin-top: 2.1rem;
  margin-bottom: 2.8rem;
  font-weight: 600;
  @include text-md;
}
</style>
