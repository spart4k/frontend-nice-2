<template>
  <div :class="$style.comment">
    <h2 :class="$style.name">
      {{ nickname }}
    </h2>
    <p :class="$style.time">
      {{ reducedTime }}
    </p>
    <p :class="$style.text">
      {{ text }}
    </p>
  </div>
</template>
<script lang="js">
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'NComment',
  props: {
    nickname: {
      type: String
    },
    text: {
      type: String
    },
    time: {
      type: String
    }
  },
  setup (props) {
    const reducedTime = computed(() => new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(new Date(props.time)))
    return {
      reducedTime
    }
  }
}
</script>
<style lang="scss" module>
  .comment {
  .name {
    color: $fontColorDefault;
    @include regular-text-bold;
    }
  .time{
    margin: 0.3rem 0 0.5rem;
    color: $fontColorDefault;
    opacity: 0.4;
    @include regular-text-small;
    }
  .text {
    color: $fontColorDefault;
    @include regular-text;
    }
  }
  div+.comment{
    margin-top: 2rem;
  }
</style>
