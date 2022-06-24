<template>
  <div v-if="$props.showNavMenu" :class="$style.headerNav__inner">
    <transition-group
      :class="$style.headerMenu__list"
      name="staggered-fade"
      tag="ul"
      :css="false"
      appear
      v-bind="$attrs"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <li v-for="(item, index) in $props.headerItems"
      :data-index="index"
      :key="item.title"
      :style="{backgroundColor: randomColor()}"
      :class="$style.headerMenu__item"
      ref="itemRefs"
      @click.stop="hideMenu">
        <nuxt-link :to="{ path: `/${item.slug}`, params:{ id: item.id }, query: { id: item.id } }">
          {{ item.title }}
        </nuxt-link>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { onMounted, onUnmounted, useContext } from '@nuxtjs/composition-api'

const COLORS = ['#489430', '#00B4B5', '#FF4F00', '#ded037']
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
      default: 200 // duration of each element transition
    }
  },
  setup (props, { emit }) {
    const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

    const hideMenu = () => {
      emit('hideNavMenu', false)
    }
    const { $gsap } = useContext()
    const beforeEnter = (el) => {
      el.style.opacity = 0
      el.style.transform = 'translateY(30px)'
    }
    const enter = (el, done) => {
      // Each element requires a data-index attribute in order for the transition to work properly
       $gsap.to(el, {
        opacity: 1,
        transform: 'translateY(0)',
        delay: el.dataset.index * 0.03,
        onComplete: done
       })
    }

    const leave = (el, done) => {
      // Each element requires a data-index attribute in order for the transition to work properly
       $gsap.to(el, {
        opacity: 0,
        transform: 'translateY(0)',
        delay: el.dataset.index * 0.1,
        onComplete: done
       })
    }

    onMounted(() => {

    })

    onUnmounted(() => {

    })

    return {
      randomColor,
      hideMenu,
      beforeEnter,
      enter,
      leave
    }
  }
}
</script>

<style scoped lang="scss" module src="@/components/header.scss">
</style>
