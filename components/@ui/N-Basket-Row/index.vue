<template>
  <!-- <NuxtLink
    tag="div"
    :to="`/cards/${item.id}?section=${item.section.slug}`"
  > -->
  <li :class="$style.product">
    <div :class="$style.product__img" @click="$router.push(`/cards/${item.id}?section=${item.section.slug}`)">
      <N-Lazy-Img :src="`${$axios.defaults.baseURL}/${item.files[0].src}`" alt="изоображение товара" />
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
          @click="pushTo"
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
  </li>
  <!-- </NuxtLink> -->
</template>

<script>
import { ref, computed, useContext, onMounted, watch } from '@nuxtjs/composition-api'
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
    const pushTo = (val) => {
      // console.log(val)
      // router.push({ / })
    }
    const totalCount = computed(() => {
      const count = props.item.pivot.quantity + props.item.count
      const array = []
      for (let i = 1; i <= count; i++) {
        array.push(i + ' шт.')
      }
      return (array)
    })
    const changeCount = async (value) => {
      if (Number(value.slice(0, -4)) - Number(oldquantity.value.slice(0, -4)) > 0) {
        const goodsData = {
          card_id: props.item.pivot.card_id,
          quantity: Math.abs(Number(value.slice(0, -4)) - Number(oldquantity.value.slice(0, -4))),
          details: null
        }
        oldquantity.value = value
        const result = await store.dispatch('basket/addToBasket', goodsData)
        if (!result.error) {
          const changeItemData = {
            card_id: props.item.pivot.card_id,
            quantity: goodsData.quantity,
            price: props.item.price * goodsData.quantity
          }
          store.commit('basket/setBasketSum', result.data[1])
          store.commit('basket/increaseCountItem', changeItemData)
        }
      } else if (Number(value.slice(0, -4)) - Number(oldquantity.value.slice(0, -4)) < 0) {
        const goodsData = {
          card_id: props.item.pivot.card_id,
          quantity: Math.abs(Number(value.slice(0, -4)) - Number(oldquantity.value.slice(0, -4))),
          details: null
        }
        oldquantity.value = value
        const result = await store.dispatch('basket/deleteFromBasket', goodsData)
        if (!result.error) {
          const changeItemData = {
            card_id: props.item.pivot.card_id,
            quantity: goodsData.quantity,
            price: props.item.price * goodsData.quantity
          }
          store.commit('basket/degreaseCountItem', changeItemData)
        }
      }
    }
    const quantity = ref(props.item.pivot.quantity + ' шт.')
    const oldquantity = ref(0)

    watch(() => props.item.pivot.quantity, () => {
      oldquantity.value = props.item.pivot.quantity + ' шт.'
      quantity.value = props.item.pivot.quantity + ' шт.'
    })
    onMounted(() => {
      oldquantity.value = quantity.value
    })
    return {
      countProducts,
      quantity,
      totalCount,
      oldquantity,
      changeCount,
      pushTo
    }
  }
}
</script>

<style lang="scss" module src="./style.scss"></style>
