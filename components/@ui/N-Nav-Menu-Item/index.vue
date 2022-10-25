<template>
  <li
    :style="{
      backgroundColor: BLAND_COLOR[item.slug],
      backgroundImage: `url(${backgroundURL})`,
    }"
    :class="$style.item"
    @click.prevent="closeBottom"
  >
    <nuxt-link :to="{ path: `/${item.slug}` }">
      {{ item.title }}
    </nuxt-link>
  </li>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import { BLAND_COLOR } from '~/const/blandColor'

export default {
  name: 'NavMenu',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const backgroundURL = computed(() => require(`~/assets/img/menu/${props.item.slug}.png`))
    const closeBottom = () => {
      emit('closeState')
    }

    return {
      BLAND_COLOR,
      backgroundURL,
      closeBottom
    }
  }
}
</script>

<style scoped lang="scss" module>
.item {
  width: 100%;
  // height: 10rem;
  color: rgb(255, 255, 255);
  border-radius: 20px;
  @include regular-text-bold;
  font-size: 1.8rem;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: contain;
  :global(.nuxt-link-exact-active) {
    color: $white;
  }
  a {
    width: 100%;
    height: 100%;
    padding: 1.5rem 1.5rem;
    position: relative;
    display: flex;
    align-items: flex-end;
    text-decoration: none;
    transition: color .5s ease-in-out;
    color: inherit;
  }
}
</style>
