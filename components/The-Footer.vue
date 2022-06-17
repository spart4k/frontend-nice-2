<template>
  <footer :class="$style.footer">
    <div :class="$style.container">
      <ul :class="$style.footer__colLeft">
        <li v-for="(item, index) in sections.left" :key="index">
          <nuxt-link :to="{ path: `/${item.slug}`, params:{ id: item.id }, query: { id: item.id } }">
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
      <n-logo size="md" />
      <ul :class="$style.footer__colRight">
        <li v-for="(item, index) in sections.right" :key="index">
          <nuxt-link :to="{ path: `/${item.slug}`, params:{ id: item.id }, query: { id: item.id } }">
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'

export default {
  name: 'TheFooter',
  setup () {
    const itemMenu = ref({
      left: [],
      right: []
    })
    const { store } = useContext()

    const sections = computed(() => store.getters['content/footerSection'])
    itemMenu.value.right = sections.value
    // itemMenu.value.left = sections.value
    return {
      itemMenu,
      sections
    }
  }
}
</script>

<style scoped lang="scss" module>
  .footer {
    background-color: $blueBlack3;
    padding: 3.9rem 2rem;
    position: relative;
    z-index: 10;
    .container {
      @include container;
      @include text-sm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $white;
      a {
        color: inherit;
      }
    }
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        margin-bottom: .5rem;
      }
    }
  }
</style>
