<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Мы отправили код на номер
      {{ $props.titleTel }}
    </h2>

    <form @submit.prevent="onSubmit">
      <n-text-field v-model="formData.code" type="number"  title="Код из СМС" />
      <n-button :class="$style.button" type="submit">
        подтвердить
      </n-button>
    </form>
  </div>
</template>
<script lang="js">
import { reactive, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuthConfirmation',
  props: {
    titleTel: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const { store } = useContext()
    const { emit } = ctx
    const formData = reactive({
      code: ''
    })
    const onSubmit = () => {
      store.dispatch('auth/sendCode', formData.code)
      emit('closePopup')
    }

    return {
      formData,
      onSubmit
    }
  }
}
</script>
<style lang="scss" module>
.wrapper {
  margin-top: 2.7rem;
}
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
