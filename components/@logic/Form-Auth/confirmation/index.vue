<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.title">
      Мы отправили код на номер<br>
      {{ $props.titleTel }}
    </h2>

    <form @submit.prevent="onSubmit">
      <n-text-field v-model="formData.code" type="number"  title="Код из СМС" />
      <n-button :typeButton="!filledTel ? 'disable' : '' "  :class="$style.button" type="submit">
        <n-loading v-if="loading"></n-loading>
        <template v-else>Подтвердить</template>
      </n-button>
    </form>
  </div>
</template>
<script lang="js">
import { reactive, ref, useContext, computed } from '@nuxtjs/composition-api'

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
    const filledTel = computed(() => {
      const number = formData.code
      if (number.length) {
        return true
      } else {
        return false
      }
    })
    const loading = ref(false)
    const onSubmit = () => {
      loading.value = true
      store.dispatch('auth/sendCode', {
        phone: props.titleTel,
        sms_code: +formData.code
      })
      .then((res) => {
        console.log(res)
          loading.value = false
          if (res.status === 200) {
            emit('closePopup')
          }
      })
    }

    return {
      formData,
      onSubmit,
      loading,
      filledTel
    }
  }
}
</script>
<style lang="scss" module>
.wrapper {
  margin-top: 2.7rem;
}
.button {
  width: 100%;
  margin-top: 2.3rem;
}
.title {
  width: 100%;
  font-weight: 600;
  margin-bottom: 1.8rem;
  @include text;
}
</style>
