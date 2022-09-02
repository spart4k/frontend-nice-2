<template>
  <li :class="$style.product">
    <div :class="$style.product__img">
      <!-- <N-Lazy-Img :src="`${$axios.defaults.baseURL}${item.files[0].src}`" alt="изоображение товара" /> -->
    </div>
    <div :class="$style.product__description">
      <h3 :class="$style.product__title">
        {{ item.title }}
      </h3>
      <div v-if="!readonly" :class="$style.product__select">
        <v-select
          v-model="quantity"
          :options="totalCount"
          :class="$style.wireSelect"
          @input="changeCount(quantity)"
        />
      </div>
      <div v-if="readonly" :class="$style.count">
        {{ item.pivot.quantity }} шт.
      </div>
      <div :class="$style.product__price">
        {{ item.pivot.price }} р.
      </div>
      <div v-if="!readonly" :class="$style.product__iconDelete" @click="$emit('deleteFromBasket', item)">
        <n-icon name="delete" />
      </div>
    </div>
    {{ item.count }}
    <!-- {{ totalCount }} -->
  </li>
</template>

<script>
import { ref, computed, useContext, onMounted } from '@nuxtjs/composition-api'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'NBasketRow',
  components: {
    vSelect
  },
  props: {
    item: {
      type: Object
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
  const { store } = useContext()
    const countProducts = ref(0)
    const totalCount = computed(() => {
      const count = props.item.pivot.quantity + props.item.count
      const array = []
      for (let i = 1; i <= count; i++) {
        array.push(i + ' шт.')
      }
      return (array)
    })
    const changeCount = async (value) => {
      if (Number(value.slice(0, -4)) - oldquantity.value > 0) {
        const goodsData = {
          card_id: props.item.pivot.card_id,
          quantity: Math.abs(Number(value.slice(0, -4)) - oldquantity.value),
          details: null
        }
        oldquantity.value = Number(value.slice(0, -4))
        const result = await store.dispatch('basket/addToBasket', goodsData)
        console.log(result)
      } else if (Number(value.slice(0, -4)) - oldquantity.value < 0) {
        const goodsData = {
          card_id: props.item.pivot.card_id,
          quantity: Math.abs(Number(value.slice(0, -4)) - oldquantity.value),
          details: null
        }
        oldquantity.value = Number(value.slice(0, -4))
        const result = await store.dispatch('basket/deleteFromBasket', goodsData)
        console.log(result)
      }
    }
    const quantity = ref(props.item.pivot.quantity)
    const oldquantity = ref(0)
    onMounted(() => {
      oldquantity.value = quantity.value
    })
    return {
      countProducts,
      quantity,
      totalCount,
      oldquantity,
      changeCount
    }
  }
}
</script>

<style lang="scss" module src="./style.scss"></style>
