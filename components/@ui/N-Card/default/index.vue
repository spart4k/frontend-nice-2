<template>
  <div :class="$style.card">
    <template v-if="data.images.length && data.images.length > 1">
      <N-Slider :slider-item="$props.images" />
    </template>
    <!--    v-else-if="$props.images && $props.images.length === 1"-->
    <template v-if="data.images.length === 1">
      <!--      <div-->
      <!--        v-for="item in $props.images"-->
      <!--        :key="item.src"-->
      <!--        :class="[-->
      <!--          $style.hat,-->
      <!--        ]"-->
      <!--        :style="{-->
      <!--          backgroundImage: `url('${item.src}')`,-->
      <!--          height: `${$props.hatHeight || 23.6}rem`-->
      <!--        }"-->
      <!--      />-->
      <!--      backgroundImage: `url(${$axios.defaults.baseURL}${data.images[0].src})`,-->
      <div
        :class="[
          $style.hat,
        ]"
        :style="{
          height: `${$props.hatHeight || 23.6}rem`
        }"
      >
        <n-lazy-img :src="`${$axios.defaults.baseURL}${data.images[0].src}`" :alt="data.title" />
      </div>
    </template>
    <template v-else-if="$props.withVideo">
      <video ref="videoRef" playsinline controls muted>
        <source :src="videoUrl" type="video/ogg; codecs=&quot;theora, vorbis&quot;">
      </video>
    </template>
    <div
      :class="[
        $style.body,
        $props.withAuthor && $style.author
      ]"
    >
      <template v-if="$props.withAuthor">
        <p>Автор: {{ data.author }}</p>
      </template>
      <template v-else>
        <NuxtLink :class="$style.body__top" tag="div" to="/">
          <h2 :class="$style.title">
            {{ data.title }}
          </h2>
          <div v-if="data.date_event" :class="$style.time">
            {{ dateFormat }}
          </div>
          <EditorJsParser v-if="isJsonString" :value="JSON.parse(data.text)" />
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
          <!--          <N-Comment-->
          <!--            v-if="$props.amountComment"-->
          <!--            :class="$style.comment"-->
          <!--            :current="$props.amountComment"-->
          <!--          />-->
        </div>
      </template>
      <div v-if="$slots.footer" :class="$style.body__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script lang="js">
import { computed, onMounted, ref, useContext } from '@nuxtjs/composition-api'
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
      if (props.withVideo) {
        // videoUrl.value = `${$axios.defaults.baseURL}/${props.data?.files[0]?.src}`
        videoRef.value.src = `${$axios.defaults.baseURL}/${props.data?.files[0]?.src}`
        videoRef.value.load()
      }
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
    video {
      width: 100%;
      height: 100%;
      max-height: 24rem;
    }
  }
  .hat {
    //height: 23.6rem;
    width: 100%;
    background-color: #e7dddd;
    //img {
    //  width: 100%;
    //  height: 100%;
    //  object-fit: cover;
    //  object-position: center;
    //}
    //background-size: cover;
    //background-position: center;
    //background-repeat: no-repeat;
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
      }
    }
    .title, .time {
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
        margin-top: 1.03rem;
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
