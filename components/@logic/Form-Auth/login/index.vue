<template>
  <form @submit.prevent="onSubmit">
    <n-text-field v-model.trim="formData.tel" mask="+7 (###) ###-##-##" md-fz :class="[ $style.input ]" title="Телефон" />
    <n-button :class="$style.button" :typeButton="!filledTel ? 'disable' : '' " type="submit">
      <n-loading v-if="loading"></n-loading>
      <template v-else>Войти</template>
    </n-button>
    <n-button :class="$style.button" typeButton="sub" @click="returnRegister">
      Назад
    </n-button>
  </form>
</template>
<script lang="js">
import { reactive, ref, useContext, computed } from '@nuxtjs/composition-api'

export default {
  name: 'FormAuth',
  setup (props, ctx) {
    const { store } = useContext()
    const { emit } = ctx
    const formData = reactive({
      tel: '+79876543210'
    })
    const loading = ref(false)
    const errorTel = ref(false)
    const filledTel = computed(() => {
      const number = formData.tel.replace(/\D/g, '')
      if (number.length === 11) {
        return true
      } else {
        return false
      }
    })
    const onSubmit = () => {
      emit('saveTel', formData.tel)
      const number = formData.tel.replace(/\D/g, '')
      errorTel.value = false
      loading.value = true
      formData.tel = '+' + number
      store.dispatch('auth/getSms', formData.tel)
      .then((res) => {
        console.log(res)
        loading.value = false
        emit('input', 2)
      })
    }
    const returnRegister = () => {
      emit('input', 0)
    }
    return {
      formData,
      onSubmit,
      returnRegister,
      loading,
      errorTel,
      filledTel
    }
  }
}
</script>
<style lang="scss" module>
  form {
    & > .input + .input {
      margin-top: 1.6rem;
    }
    .button {
      margin-top: 2.7rem;
      width: 100%;
    }
  }
</style>
