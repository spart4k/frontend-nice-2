<template>
  <div :class="[withStyles && $style.withStyles]">
    <template v-if="value && value.blocks">
      <component
        :is="getTag(block.type, block.data)"
        v-for="(block, index) in value.blocks"
        :key="index"
      >
        <span v-if="block.data.text" v-html="block.data.text" />
        <template v-else-if="block.data.items">
          <li v-for="(item, index) in block.data.items" :key="index" v-html="item" />
        </template>
      </component>
    </template>
  </div>
</template>
<script>
export default {
  name: 'EditorJsParser',
  props: {
    value: Object,
    withStyles: Boolean
  },
  setup () {
    return {
      getTag: (type, data) => {
        switch (type) {
          case 'paragraph': return 'p'
          case 'header': return `h${data.level}`
          case 'list': return data.style === 'unordered' ? 'ul' : 'ol'
          default: return 'div'
        }
      }
    }
  }
}
</script>
<style lang="scss" module>
.withStyles {
  font-size: 1.8rem;
  line-height: 1.5;
  letter-spacing: -0.02em;

  p {
    margin-bottom: 2.8rem;

    //@include pJustText;
  }

  h1 {
    //@include h1Header;
    margin: 0;
    margin-bottom: 2rem;
  }
  h2 {
    //@include h2Header;
    margin: 0;
    margin-bottom: 2rem;
  }
  h3 {
    //@include h3Header;
    @include montserratBold;
    margin: 0;
    margin-bottom: 2rem;
  }

  ul, ol {
    padding-left: 0;
    margin-bottom: 2.8rem;

    li {
      //@include pJustText;

      & + li {
        margin-top: 1rem;
      }
    }
  }

  @media (max-width: $mobileWidth) {
    font-size: 1.4rem;
    line-height: 1.4;
    letter-spacing: 0;

    p {
      margin-bottom: 2rem;
    }
  }
}
</style>
