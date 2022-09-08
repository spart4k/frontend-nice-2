<template>
  <div :class="$style.comment">
    <template v-if="sticker">
      <h2 :class="$style.name">
        {{ nickname }}
      </h2>
      <p :class="$style.time">
        {{ reducedTime }}
      </p>
      <img
        :class="$style.sticker"
        :src="`https://test.itisthenice.com/${sticker.file.src}`"
        alt=""
      >
    </template>
    <template v-else>
      <h2 :class="$style.name">
        {{ nickname }}
      </h2>
      <p :class="$style.time">
        {{ reducedTime }}
      </p>
      <p :class="$style.text">
        {{ decodeText }}
      </p>
    </template>
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
    },
    sticker: {
      type: Object
    }
  },
  setup (props) {
    const decodeText = computed(() => decodeURIComponent(escape(props.text)))
    const reducedTime = computed(() => new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(new Date(props.time)))
    return {
      reducedTime,
      decodeText
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
  .sticker{
    width: 14rem;
    height: 14rem;
  }
  div+.comment{
    margin-top: 2rem;
  }
</style>
