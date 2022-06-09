<template>
  <N-Contain>
    <h2 :class="$style.title">
      Мы отправили код на номер
      {{ $props.titleTel }}
    </h2>

    <form @submit.prevent="onSubmit">
      <n-text-field v-model="formData.code" :class="$style.input" title="Имя" />
      <n-button :class="$style.button" type="submit">
        Зарегистрироваться
      </n-button>
    </form>
  </N-Contain>
</template>
<script lang="js">
import { reactive } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuthConfirmation',
  props: {
    titleTel: {
      type: String,
      default: ''
    }
  },
  setup () {
    const formData = reactive({
      code: ''
    })
    const onSubmit = () => {
      console.log(formData)
    }

    return {
      formData,
      onSubmit
    }
  }
}
</script>
<style lang="scss" module>
.input {}
.button {
  margin-top: 2.3rem;
}
.title {
  width: 22rem;
  font-weight: 600;
  margin-bottom: 1.8rem;
  @include text;
}
</style>
