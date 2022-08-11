<template>
  <div :class="$style.wrapper">
    <span v-if="title">
      {{ title }}
    </span>
    <div
      :class="[
        $style.wrapperSelect,
        hasBorderBottom && $style.borderBottom,
        $style[colorBorder]
      ]"
    >
      <select
        :class="[$style.select]"
      >
        <option v-for="item in selectItems" :key="item.value" :class="$style.optionItem" :value="item.value">
          {{ item.text }}
        </option>
      </select>
      <n-icon name="arrow-select" :class="$style.icon" :style="positionArrow" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NSelect',
  props: {
    selectItems: {
      type: Array,
      default: () => [{ text: 'empty', value: 'empty' }],
      required: true
    },
    colorBorder: String,
    hasBorderBottom: Boolean,
    positionArrow: {
      type: Object,
      default: () => ({ right: 0 })
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  height: 100%;
  span {
    color:rgba($fontColorDefault, 0.5);
    display: block;
  }
}
.wrapperSelect {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  &.borderBottom {
    .select {
      padding: 1rem 0;
      border-radius: 0;
      border-top: none;
      border-left: none;
      border-right: none;
    }
  }
  &.pinkBorder {
    .select {
      border-color: $pink2;
    }
    .icon {
      path  {
        stroke:$pink2;
      }
    }
  }
}

.icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  border-width: .2rem;
  border-radius: .6rem;
  width: 100%;
  height: 100%;
  color: $fontColorDefault;
  @include regular-text;
}
</style>
