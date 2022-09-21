<template>
  <div :class="$style.wire">
    <div :class="$style.wireIncoming">
      <p :class="$style.wireText">
        Входящее соединение:
      </p>
      <v-select
        v-model="formData.input"
        :options="optionsInput"
        :class="$style.wireSelect"
        :loading="loadingInput"
        @input="setSelectedInput"
      />
      <p v-if="$errors.input[0]" :class="$style.inputError">
        {{ $errors.input[0] }}
      </p>
    </div>
    <div :class="$style.wireOutcoming">
      <p :class="$style.wireText">
        Исходящее соединение:
      </p>
      <v-select
        v-model="formData.output"
        :options="optionsOutput"
        :class="$style.wireSelect"
        :loading="loadingOutput"
        @input="setSelectedOutput"
      />
      <p v-if="$errors.output[0]" :class="$style.inputError">
        {{ $errors.output[0] }}
      </p>
    </div>
    <div :class="$style.wireLength">
      <p :class="$style.wireText">
        Длина (см.):
      </p>
      <input
        v-model="formData.length"
        v-mask="'Q###'"
        v-debounce:350ms="responceLengthPrice"
        type="text"
        :class="$style.wireInput"
      >
      <p v-if="$errors.length[0]" :class="$style.inputError">
        {{ $errors.length[0] }}
      </p>
    </div>
    <!-- <div>
      <N-Goods-Counter v-model="formData.count" :counter="''" @sendCount="responceCountPrice" />
      <p v-if="$errors.count[0]" :class="$style.inputError">
        {{ $errors.count[0] }}
      </p>
    </div> -->
    <div :class="$style.wireColorSection">
      <p :class="$style.wireText">
        Цвет
      </p>
      <div ref="color" :class="$style.wireColorBox">
        <label v-for="color in colorArray" :key="color" :class="$style.wireColor" :style="{ borderColor: color }">
          <input name="color" type="radio" :checked="color === formData.color" @change="colorChange(color)">
          <span :class="$style.checkmark" :style="{ backgroundColor: color }" />
        </label>
      </div>
    </div>
    <N-Button
      :class="$style.buyButton"
      background-color="#C83F8E"
      :disabled="$v.$invalid && $touched "
      @click="submit"
    >
      <n-loading v-if="loading" />
      <template v-else>
        В корзину
      </template>
    </N-Button>
  </div>
</template>

<script>
import { ref, useFetch, useAsync, useContext, watch } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import useForm from '~/compositions/useForm'
import { required } from '~/utills/validations'

export default {
  name: 'NPurchaseWire',
  components: {
    vSelect
  },
  props: {
    card_id: {
      type: Number
    },
    colors: {
      type: Array
    }
  },
  setup (props, ctx) {
  const { store } = useContext()
  const colorArray = ref(props.colors)
  const optionsInput = ref([])
  const optionsOutput = ref([])
  const optionsDefault = ref([])
  const optionsDefaultName = ref([])
  const startCounter = ref('')
  const loadingInput = ref(true)
  const loadingOutput = ref(true)
  const loading = ref(false)
  const wireInputId = ref(0)
  const wireOutputId = ref(0)
  const { emit } = ctx
  const colorChange = (val) => {
    formData.color = val
  }
  const responceLengthPrice = (val) => {
    formData.length = val
    responceTotalPrice(formData.length, formData.count)
  }
  const responceCountPrice = (val) => {
    formData.count = val
    responceTotalPrice(formData.length, formData.count)
  }
  const responceTotalPrice = (length, count) => {
    if (count === null) {
      const countData = {
        length: Number(length),
        count: 0
      }
      emit('changeTotalPrice', countData)
    } else {
      const countData = {
        length: Number(length),
        count: Number(count.slice(0, -4))
      }
      emit('changeTotalPrice', countData)
    }
  }
  const { formData, validate, $errors, $v, $touched } = useForm(
    {
      fields: {
        input: { default: '', validations: { required } },
        output: { default: '', validations: { required } },
        length: { default: '', validations: { required } },
        count: { default: startCounter, validations: { required } },
        color: { default: '#7e64b5', validations: { } }
      }
    })

  const submit = async () => {
    if (store.state.authentication.authorizated) {
      try {
        if (!validate()) { return }
        loading.value = true
        const goodsData = {
          card_id: props.card_id,
          quantity: Number(formData.count.slice(0, -4)),
          details: JSON.stringify([wireInputId.value, wireOutputId.value, Number(formData.length), formData.color])
        }
        const result = await store.dispatch('basket/addToBasket', goodsData)
        if (!result.data.error) {
          const changeItemData = {
            card_id: props.card_id,
            quantity: Number(formData.count.slice(0, -4)),
            price: result.data[0].price * Number(formData.count.slice(0, -4))
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

  const setSelectedInput = () => {
    if (formData.input !== null) {
      optionsDefault.value.forEach((item) => {
        if (formData.input === item.name) {
          wireInputId.value = item.id
        }
      })
      useAsync(async () => {
        const wireData = {
          id: wireInputId.value,
          page: 1,
          count: 10
        }
        try {
          loadingOutput.value = true
          const responseWire = await store.dispatch('shop/getWires', wireData)
          loadingOutput.value = false
          const wiresName = []
          responseWire.data.data.forEach((item) => {
            wiresName.push(item.name)
          })
          optionsOutput.value = wiresName
        } catch (e) {
          console.log(e)
        }
      })
    }
  }

  const setSelectedOutput = () => {
    if (formData.output !== null) {
      optionsDefault.value.forEach((item) => {
        if (formData.output === item.name) {
          wireOutputId.value = item.id
        }
      })
      useAsync(async () => {
          const wireData = {
            id: wireOutputId.value,
            page: 1,
            count: 10
          }
          try {
            loadingInput.value = true
            const responseWire = await store.dispatch('shop/getWires', wireData)
            loadingInput.value = false
            const wiresName = []
            responseWire.data.data.forEach((item) => {
              wiresName.push(item.name)
            })
            optionsInput.value = wiresName
          } catch (e) {
            console.log(e)
          }
      })
    }
  }

  useFetch(async () => {
    const wireData = {
      page: 1,
      count: 10
    }
    try {
      const responseWire = await store.dispatch('shop/getWires', wireData)
      loadingOutput.value = false
      loadingInput.value = false
      const wiresName = []
      responseWire.data.data.forEach((item) => {
        wiresName.push(item.name)
      })
      optionsInput.value = wiresName
      optionsOutput.value = wiresName
      optionsDefault.value = responseWire.data.data
      optionsDefaultName.value = wiresName
    } catch (e) {
      console.log(e)
    }
  })

    watch(() => ([formData.input, formData.output]), () => {
      if (formData.input === null && formData.output === null) {
        optionsInput.value = optionsDefaultName.value
        optionsOutput.value = optionsDefaultName.value
      } else if (formData.input === null) {
        optionsOutput.value = optionsDefaultName.value
      } else if (formData.output === null) {
        optionsInput.value = optionsDefaultName.value
      }
    })

    return {
      responceLengthPrice,
      responceCountPrice,
      responceTotalPrice,
      submit,
      colorArray,
      optionsOutput,
      optionsInput,
      optionsDefault,
      optionsDefaultName,
      formData,
      $errors,
      $touched,
      $v,
      setSelectedInput,
      setSelectedOutput,
      loadingInput,
      startCounter,
      loading,
      loadingOutput,
      colorChange
    }
  }
}
</script>

<style scoped lang="scss" module>
.wire {
    padding-top: .5rem;
    margin-bottom: 3rem;
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
      margin-top: 2rem;
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
