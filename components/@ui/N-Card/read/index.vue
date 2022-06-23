<template>
  <N-Contain :class="$style.wrapper">
    <N-Author
      :src="data.images.length ? data.images[0].src : '' "
      :name="data.title"
      :class="$style.author"
    />
    <!--    <h2>{{ data.title }}</h2>-->
    <EditorJsParser v-if="isJsonString" :value="JSON.parse(data.text)" with-styles />
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
    <!--    <p>-->
    <!--      {{ $props.description }}-->
    <!--    </p>-->
    <!--    {{ item.ctivo_biography }}-->
    <!--    <div-->
    <!--      v-for="item in $props.books"-->
    <!--      :key="item.description"-->
    <!--      :class="$style.row"-->
    <!--    >-->
    <!--    <p>{{ item.description }}</p>-->
    <!--    </div>-->
  </N-Contain>
</template>
<script lang="js">
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'NCardRead',
  props: {
    author: {
      type: Object,
      default: null
    },
    data: {
      type: Object,
      default: () => {}
    },
    description: {
      type: String,
      default: ''
    },
    books: {
      type: Array,
      default: null
    }
  },
  setup (props) {
    const isJsonString = computed(() => {
      try {
        JSON.parse(props?.data?.text)
      } catch (e) {
        return false
      }
      return true
    })
    return {
      isJsonString
    }
  }
}
</script>
<style lang="scss" module>
.wrapper {
  //width: 100%;
  color: $fontColorDefault;
  ol, ul {
    padding-left: 1rem;
  }
  p {

    border-bottom: solid 1px rgba($black, .1);
    padding-bottom: 1rem;
    margin-bottom: .7rem;
    margin-top: 1.9rem;
    @include text-sm;
    @include montserratRegular;
  }
  .author {
    margin-bottom: 3.2rem;
  }
  .row {
    & + .row {
      margin-top: 3.2rem;
    }
    h3 {
      font-weight: 700;
      @include text-sm;
      margin-bottom: .73rem;
    }
  }
  h3 {
    font-weight: 700;
    @include text-md;
    margin-bottom: .73rem;
  }
  .chip {
    margin-top: 1.36rem;
    & + .chip {
      margin-left: 1rem;
    }
  }
}
</style>
