<template>
  <li
    :style="{
      backgroundColor: BLAND_COLOR[item.slug],
      backgroundImage: `url(${backgroundURL})`,
    }"
    :class="$style.item"
  >
    <nuxt-link :to="{ path: `/${item.slug}`, params:{ id: item.id }, query: { id: item.id } }">
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
     type: Object
   }
  },
  setup (props) {
    const backgroundURL = computed(() => require(`~/assets/img/menu/${props.item.slug}.png`))

    return {
      BLAND_COLOR,
      backgroundURL
    }
  }
}
</script>

<style scoped lang="scss" module>
.item {
  padding: 1.5rem 1.5rem;
  width: 100%;
  height: 10.5rem;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  @include montserratSemiBold;
  @include subtitle-sm;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: contain;
  :global(.nuxt-link-exact-active) {
    color: $white;
  }
  a {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: flex-end;
    text-decoration: none;
    transition: color .5s ease-in-out;
    color: inherit;
  }
}
</style>
