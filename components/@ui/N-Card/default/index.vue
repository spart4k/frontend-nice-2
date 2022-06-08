<template>
  <div :class="$style.card">
    <template v-if="$props.images && $props.images.length > 1">
      <N-Slider :slider-item="$props.images" />
    </template>
    <template v-else-if="$props.images && $props.images.length === 1">
      <div
        v-for="item in $props.images"
        :key="item.src"
        :class="[
          $style.hat,
        ]"
        :style="{
          backgroundImage: `url('${item.src}')`,
          height: `${$props.hatHeight || 23.6}rem`
        }"
      />
    </template>
    <template v-else-if="$props.video">
      <video controls="controls">
        <source :src="$props.video" type="video/ogg; codecs=&quot;theora, vorbis&quot;">
      </video>
    </template>
    <div
      :class="[
        $style.body,
        $props.author && $style.author
      ]"
    >
      <template v-if="$props.author">
        <p>Автор: {{ $props.author }}</p>
      </template>
      <template v-else>
        <NuxtLink :class="$style.body__top" tag="div" to="/">
          <h2>
            {{ $props.title }}
          </h2>
          <p>
            {{ $props.description }}
          </p>
        </NuxtLink>
        <div :class="$style.body__bottom">
          <N-Chip
            v-for="item in $props.chips"
            :key="item"
            :class="$style.chip"
          >
            {{ item }}
          </N-Chip>
          <N-Comment
            v-if="$props.amountComment"
            :class="$style.comment"
            :current="$props.amountComment"
          />
        </div>
      </template>
      <div v-if="$slots.footer" :class="$style.body__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script lang="js">
import dataProps from '../props'

export default {
  name: 'NCardDefault',
  props: { ...dataProps.props }
}
</script>
<style lang="scss" module>
  .card {
    background-color: $white;
    width: 32.5rem;
    border-radius: $border-radius-1;
    overflow: hidden;
    video {
      width: 100%;
      height: 100%;
    }
  }
  .hat {
    //height: 23.6rem;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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
