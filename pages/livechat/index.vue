<template>
  <n-intro no-preview>
    <N-Background :description="description" />
    <div :class="$style.open" @click="open">
      open
    </div>
    <portal to="sliderPopup">
      <vue-bottom-sheet ref="liveChat" max-height="100%" is-full-screen>
        <live-default />
      </vue-bottom-sheet>
    </portal>
  </n-intro>
</template>

<script>
import { useContext, computed, ref } from '@nuxtjs/composition-api'
export default {
  name: 'ProfilePage',
  setup () {
    const { store } = useContext()
    const qtyBasket = computed(() => {
      return store.state.basket.basketLength
    })
    const liveChat = ref(null)
    const open = () => {
      liveChat.value.open()
    }
    const close = () => {
      liveChat.value.close()
    }
    const description = ref({
    background: ''
    })
    return {
      qtyBasket,
      description,
      liveChat,
      open,
      close
    }
  }
}
</script>

<style lang="scss" module>
  .open {
    position: relative;
    color: #222;
    background: #fff;
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
