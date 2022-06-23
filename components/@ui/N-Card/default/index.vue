<template>
  <div :class="$style.card">
    <template v-if="data.images.length && !$props.withVideo">
      <template v-if="$props.detailPage && data.images.length > 1">
        <N-Slider :slider-item="data.images" />
      </template>
      <template v-else>
        <nuxt-link :to="`card/${data.id}`">
          <div
            :class="[
              $style.hat,
            ]"
          >
            <n-lazy-img :src="`${$axios.defaults.baseURL}${data.images[0].src}`" :alt="data.title" />
          </div>
          <!--          :style="{-->
          <!--          height: `${$props.hatHeight || 23.6}rem`-->
          <!--          }"-->
        </nuxt-link>
      </template>
    </template>
    <template v-else-if="$props.withVideo">
      <div :class="$style.wrapperVideo">
        <video ref="videoRef" playsinline controls muted type="video/mp4">
          <source :src="videoUrl" type="video/ogg; codecs=&quot;theora, vorbis&quot;">
        </video>
      </div>
    </template>
    <div
      :class="[
        $style.body,
        $props.withAuthor && $style.author
      ]"
    >
      <template v-if="$props.withAuthor">
        <p>
          Автор: {{ data.author }}
        </p>
      </template>
      <template v-else>
        <NuxtLink :class="$style.body__top" tag="div" :to="`/cards/${data.id}`">
          <h2 :class="$style.title">
            {{ data.title }}
          </h2>
          <div v-if="data.price && $props.detailPage" :class="$style.price">
            {{ data.price }}р.
          </div>
          <div v-if="data.date_event" :class="$style.time">
            {{ dateFormat }}
          </div>
          <EditorJsParser v-if="isJsonString" :value="JSON.parse(data.text)" :class="!$props.detailPage && $style.parser" />
        </NuxtLink>
        <div :class="$style.body__bottom">
          <N-Chip
            v-for="item in data.tags"
            :key="item.id"
            :class="$style.chip"
            @click="$emit('clickTag', item.id)"
          >
            {{ item.title }}
          </N-Chip>
        </div>
      </template>
      <div v-if="$slots.footer" :class="$style.body__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script lang="js">
import { computed, nextTick, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import dataProps from '../props'

export default {
  name: 'NCardDefault',
  props: { ...dataProps.props },
  setup (props) {
    const videoRef = ref(null)
    const { $axios } = useContext()
    const isJsonString = computed(() => {
      try {
        JSON.parse(props?.data?.text)
      } catch (e) {
        return false
      }
      return true
    })
    const videoUrl = ref()
    onMounted(() => {
      nextTick(() => {
        if (props.withVideo) {
          videoUrl.value = `${$axios.defaults.baseURL}/${props.data?.files[0]?.src}`
          videoRef.value.src = `${$axios.defaults.baseURL}/${props.data?.files[0]?.src}`
          videoRef.value.load()
        }
      })
    })
    const dateFormat = computed(() => {
      return props.data.date_event?.replace(/:(\w+)/, '')?.replace(/\s/, ' / ') ?? ''
    })
    return {
      isJsonString,
      dateFormat,
      videoRef,
      videoUrl
    }
  }
}
</script>
<style lang="scss" module>
  .card {
    background-color: $white;
    //width: 32.5rem;
    width: 100%;
    border-radius: $border-radius-1;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    overflow: hidden;
    .wrapperVideo {
      position: relative;
      &:after {
        display: block;
        content: '';
        /* 16:9 aspect ratio */
        padding-bottom: 56.25%;
      }
      video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    //video {
    //  width: calc(100% + 2px);
    //  margin-left: -1px;
    //  height: 100%;
    //  max-height: 24rem;
    //}
  }
  .parser {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 16px;
    max-height: 62px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .hat {
    //height: 23.6rem;
    width: 100%;
    //background-color: #e7dddd;
    border: none;
  }
  .price {
    color: $black;
    @include montserratBold;
    @include text-sm;
  }
  .body {
    padding: 2.7rem 1.697rem 1.823rem;
    color: $fontColorDefault;
    &.author {
      padding: .8rem 1rem 1.3rem;
      p {
        opacity: .4;
        color: $fontColorDefault;
        font-weight: 600;
        @include text-md;
        @include montserratSemiBold;
      }
    }
    .title {
      margin-bottom: .8rem;
      @include montserratSemiBold;
      @include text;
    }
    .time {
      @include text-sm;
      margin-bottom: .8rem;
    }
    &__top {
      border-bottom: solid 1px rgba($black, .1);
      padding-bottom: 1.03rem;
      cursor: pointer;
      h2 {
        text-decoration-line: underline;
        font-weight: 600;
        @include text;
      }
      p {
        //margin-top: 1.03rem;
        @include text-md;
      }
    }
    &__bottom {
      display: flex;
      margin-top: 1.36rem;
    }
    &__footer {
      margin-top: 3rem;
    }
    .comment {
      margin-left: auto;
    }
    .chip {
      & + .chip {
        margin-left: .81rem;
      }
    }
  }
</style>
