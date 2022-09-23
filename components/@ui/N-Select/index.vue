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
      <template v-if="!$props.wire">
        <select
          :class="[$style.select, $props.wire && $style.selectWire]"
          :required="true"
          @input="setProperty"
        >
          <option
            v-for="(item, index) in selectItems"
            :key="index"
            :class="$style.optionItem"
            :value="item.value"
            @input="setProperty"
          >
            {{ item }}
          </option>
        </select>
      </template>
      <template v-else>
        <select
          v-model="wireEnd"
          :class="[$style.select, $props.wire && $style.selectWire]"
          :required="true"
          @input="setPropertyWire"
        >
          <option
            v-for="(item, index) in selectItems"
            :key="index"
            :class="$style.optionItem"
          >
            {{ item }}
          </option>
          <!-- <option
            :class="$style.optionItem"
            @input="setProperty"
          /> -->
        </select>
      </template>
      <n-icon name="arrow-select" :class="[$style.icon, $props.wire && $style.iconWire]" />
    </div>
  </div>
</template>

<script>
// import setup from '~/components/@logic/Live/chat/setup'
// import { ref } from '@nuxtjs/composition-api'
export default {
  name: 'NSelect',
  props: {
    selectItems: {
      type: Array
      // default: () => [{ text: 'empty', value: 'empty' }],
      // required: true
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
    },
    wire: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const setProperty = (value) => {
      emit('setProperty', value.target.selectedIndex)
    }
    const setPropertyWire = (value) => {
      emit('setProperty', [props.selectItems[value.target.selectedIndex], value.target.selectedIndex])
    }
    return {
      setProperty,
      setPropertyWire
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
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  path  {
    stroke:$pink2;
  }
}
.select {
  position: relative;
  z-index: 5;
  -webkit-appearance: none;
  -moz-appearance: none;
  // background-color: transparent;
  // border-width: .2rem;
  border-radius: 25px;
  padding-left: 2rem;
  width: 100%;
  height: 100%;
  color: $fontColorDefault;
  @include regular-text-bold;
  border: none;
  outline: none;
}
.selectWire{
  padding-left: 0;
  border-radius: 0;
  background-color: white;
}
.iconWire {
  right: 0;
}
</style>
