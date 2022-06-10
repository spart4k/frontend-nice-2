<template>
  <footer :class="$style.footer">
    <div :class="$style.container">
      <ul :class="$style.footer__colLeft">
        <li v-for="(item, index) in itemMenu.left" :key="index">
          <nuxt-link :to="item.url">
            {{ item.text }}
          </nuxt-link>
        </li>
      </ul>
      <n-logo size="md" />
      <ul :class="$style.footer__colRight">
        <li v-for="(item, index) in itemMenu.left" :key="index">
          <nuxt-link :to="item.url">
            {{ item.text }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'TheFooter',
  setup () {
    const itemMenu = ref({
      left: [
        {
          text: 'МУЗЫКА',
          url: '/music'
        },
        {
          text: 'МУЗЫКА',
          url: '/music'
        },
        {
          text: 'МУЗЫКА',
          url: '/music'
        },
        {
          text: 'МУЗЫКА',
          url: '/music'
        }
      ],
      right: [
        {
          text: 'МУЗЫКА',
          url: '/music'
        },
        {
          text: 'МУЗЫКА',
          url: '/music'
        },
        {
          text: 'МУЗЫКА',
          url: '/music'
        },
        {
          text: 'МУЗЫКА',
          url: '/music'
        }
      ]
    })
    return {
      itemMenu
    }
  }
}
</script>

<style scoped lang="scss" module>
  .footer {
    background-color: $blueBlack3;
    padding: 3.9rem 2rem;
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
