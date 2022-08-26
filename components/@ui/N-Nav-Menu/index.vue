<template>
  <nav :class="$style.headerNav">
    <menuUserTop
      @openMenu="($event) => $emit('changeComponent', {mathAction: 'increment', value: $event })"
    />
    <!-- @openMenu="($event) => $emit('changeStep', {mathAction: 'increment', key: $event })" -->
    <!--    <transition-group-->
    <!--      :class="$style.list"-->
    <!--      name="staggered-fade"-->
    <!--      tag="ul"-->
    <!--      :css="false"-->
    <!--      appear-->
    <!--      v-bind="$attrs"-->
    <!--      @before-enter="beforeEnter"-->
    <!--      @enter="enter"-->
    <!--      @leave="leave"-->
    <!--    >-->
    <div :class="$style.list">
      <N-Nav-Menu-Item
        v-for="(item, index) in $props.headerItems"
        :key="item.title"
        ref="itemRefs"
        :data-index="index"
        :item="item"
      />
    </div>
    <!--    </transition-group>-->
  </nav>
  <!--  v-if="$props.showNavMenu"-->
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
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  gap: .85rem;
  @media (min-width: $tabletWidth) {
    justify-content: center;
  }
}
.headerNav {
  display: block;
  padding-top: 4.9rem;
  backface-visibility: hidden;
  max-height: 100%;
  @include styleBottomSheetStepper;
  //overflow: auto;
  //width: 100%;
  //@include container;
}
</style>
