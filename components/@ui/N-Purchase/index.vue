<template>
  <div :class="$style.wire">
    <!-- <div>
      <N-Goods-Counter v-model="formData.count" :count="count" :counter="'1 шт.'" @sendCount="responceCountPrice" />
      <p v-if="$errors.count[0]" :class="$style.inputError">
        {{ $errors.count[0] }}
      </p>
    </div> -->
    <N-Button
      :class="$style.buyButton"
      background-color="#C83F8E"
      :style="{ cursor: count === 0 ? 'unset' : 'pointer' }"
      :disabled="$v.$invalid && $touched || count === 0"
      @click="submit"
    >
      <n-loading v-if="loading" />
      <template v-else-if="count === 0">
        Нет в наличии
      </template>
      <template v-else>
        В корзину
      </template>
    </N-Button>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import useForm from '~/compositions/useForm'
import { required } from '~/utills/validations'

export default {
  name: 'NPurchaseWire',
  components: {
  },
  props: {
    card_id: {
      type: Number
    },
    count: {
      type: Number
    }
  },
  setup (props, ctx) {
  const { store } = useContext()
  const startCounter = computed(() => {
    if (props.count) {
      return '1 шт.'
    } else {
      return ''
    }
  })
  const loading = ref(false)
  const { emit } = ctx
  const quantity = ref(1)
  const responceCountPrice = (val) => {
    startCounter.value = val.value
    if (val.value !== null) {
      emit('changeTotalPrice', Number(val.value.slice(0, -4)))
      quantity.value = Number(val.value.slice(0, -4))
    }
  }

  const { formData, validate, $errors, $v, $touched } = useForm(
    {
      fields: {
        count: { default: startCounter, validations: { required } }
      }
    })

  const submit = async () => {
    if (store.state.authentication.authorizated) {
      try {
        if (!validate()) { return }
        loading.value = true
        const goodsData = {
          card_id: props.card_id,
          quantity: quantity.value,
          details: null
        }
        const result = await store.dispatch('basket/addToBasket', goodsData)
        if (!result.data.error) {
          const changeItemData = {
            card_id: props.card_id,
            quantity: quantity.value,
            price: result.data[0].price * quantity.value
          }
          store.commit('basket/setBasketSum', result.data[1])
          store.commit('basket/increaseCountItem', changeItemData)
          store.commit('basket/addToBasket', result.data[0])
        }
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    } else if (!store.state.menu.isShowBottomMenu) {
      store.commit('menu/changeKeyMenu', {
        key: 'registration',
        effect: 'fx-slide-from-left'
      })
      store.commit('menu/changeStepMenu', { step: 1 })
      store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
    } else if (store.state.menu.isShowBottomMenu) {
      store.commit('menu/changeKeyMenu', {
        key: 'registration',
        effect: 'fx-slide-from-left'
      })
      store.commit('menu/changeStepMenu', { step: 1 })
    }
  }

    return {
      responceCountPrice,
      submit,
      formData,
      $errors,
      $touched,
      $v,
      startCounter,
      loading,
      quantity
    }
  }
}
</script>

<style scoped lang="scss" module>
.wire {
    padding-top: .5rem;
    // margin-bottom: 3rem;
    div+div {
      margin-top: 2.5rem;
    }
    .wireInput {
      width: 100%;
      @include regular-text;
      color: $fontColorDefault;
      padding: 1rem 0;
      border: none;
      border-bottom: .2rem solid #C83F8E;
      outline: none;
    }
    .wireSelect {
      width: 100%;
      @include regular-text;
      color: $fontColorDefault;
      border: none;
      border-bottom: .2rem solid #C83F8E;
      outline: none;
      :global(.vs__dropdown-toggle) {
        border: none;
        padding: 0;
        :global(.vs__selected-options) {
          padding: 0;
          :global(.vs__search) {
            padding: 0;
            font-size: 1.4rem !important;
          }
          :global(.vs__selected) {
            margin: 0;
            padding: 0;
          }
        }
        :global(.vs__actions) {
          margin: 1.3rem 0;
          padding: 0;
          :global(.vs__open-indicator) {
            fill: #C83F8E
          }
          :global(.vs__clear) {
            display: none
          }
        }
      }
    }
    .wireText {
      @include regular-text;
      opacity: 0.5;
    }
    .wireColorSection {
      .wireColorBox {
      margin-top: 1rem;
      display: flex;
      padding: 0;
      label+label {
        margin-left: 1.5rem;
      }
      .wireColor {
        width: 3.2rem;
        height: 3.2rem;
        position: relative;
        border: solid .2rem;
        border-radius: 50%;
        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          z-index: 5;
          width: 100%;
          height: 100%;
        }
        .checkmark {
          position: absolute;
          width: 3.2rem;
          height: 3.2rem;
          top: -0.16rem;
          left: -0.16rem;
          border-radius: 50%;
        }
        input:checked ~ .checkmark {
          width: 2rem;
          height: 2rem;
          top: calc(50% - 1rem);
          left: calc(50% - 1rem);
        }
      }
    }
  }
    :global(.vs__dropdown-option) {
      height: 4.5rem;
      display: flex;
      font-size: 1.6rem;
      align-items: center;
    }
    :global(.vs__dropdown-option--highlight) {
      background: #C83F8E;
    }
    .buyButton {
      // margin-top: 2rem;
      // width: 14rem;
      padding: 0 3.6rem;
      height: 5rem;
    }
    .inputError {
      margin-top: 1rem;
      color: #D13C33;
      @include regular-text;
    }
    :global(.vs__spinner) {
      border-left-color: #C83F8E;
      font-size: .3rem;
    }
  }
</style>
