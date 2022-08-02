<template>
  <!--  v-if="$props.showNavMenu"-->
  <transition-group
    :class="$style.list"
    name="staggered-fade"
    tag="ul"
    :css="false"
    appear
    v-bind="$attrs"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <N-Nav-Menu-Item
      v-for="(item, index) in $props.headerItems"
      :key="item.title"
      ref="itemRefs"
      :data-index="index"
      :item="item"
    />
    <!--    <li-->
    <!--      v-for="(item, index) in $props.headerItems"-->
    <!--      :key="item.title"-->
    <!--      ref="itemRefs"-->
    <!--      :data-index="index"-->
    <!--      :style="{-->
    <!--        backgroundColor: BLAND_COLOR[item.slug],-->
    <!--        backgroundImage: `url('@/assets/img/menu/coin.png')`-->
    <!--      }"-->
    <!--      :class="$style.headerMenu__item"-->
    <!--      @click.stop="hideMenu"-->
    <!--    >-->
    <!--      <nuxt-link :to="{ path: `/${item.slug}`, params:{ id: item.id }, query: { id: item.id } }">-->
    <!--        {{ item.title }}-->
    <!--      </nuxt-link>-->
    <!--    </li>-->
  </transition-group>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'

export default {
  name: 'NavMenu',
  props: {
    showNavMenu: {
      type: Boolean,
      default: false
    },
    headerItems: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 200
    }
  },
  setup (props, { emit }) {
    const hideMenu = () => {
      emit('hideNavMenu', false)
    }
    const { $gsap } = useContext()

    const beforeEnter = (el) => {
      el.style.opacity = 0
      el.style.transform = 'translateY(30px)'
    }
    const enter = (el, done) => {
       $gsap.to(el, {
        opacity: 1,
        transform: 'translateY(0)',
        delay: el.dataset.index * 0.03,
        onComplete: done
       })
    }

    const leave = (el, done) => {
       $gsap.to(el, {
        opacity: 0,
        transform: 'translateY(0)',
        delay: el.dataset.index * 0.1,
        onComplete: done
       })
    }

    return {
      hideMenu,
      beforeEnter,
      enter,
      leave
    }
  }
}
</script>

<style scoped lang="scss" module>
.list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  justify-content: space-between;
  width: 100%;
  padding: 0;
  overflow: hidden;
  gap: .85rem;
  @media (min-width: $tabletWidth) {
    justify-content: center;
  }
}
</style>
