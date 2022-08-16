<template>
  <div :class="$style.container">
    <div :class="[isHomePage && $style.wrapper]">
      <n-logo v-if="isHomePage" :class="$style.logo" size="md" />
    </div>
  </div>
<!--  </div>-->
</template>

<script>
export default {
  name: 'NIntroSection',
  props: {
    isHomePage: {
      type: Boolean
    },
    description: {
      type: Object
    },
    hideTextLogo: Boolean,
    image: String
  }
}
</script>

<style scoped lang="scss" module>
.container {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
      @include text-style-h1;
      margin-bottom: 4rem;
      text-align: center
  }
  .quote {
    text-align: center
  }
  .subtitle {
      @include button;
      margin: 1rem 0;
      text-align: center
  }
  .author {
    @include regular-text;
    text-align: center;
  }
  .image {
    width: 32.5rem;
    height: 32.5rem;
    overflow: hidden;
    margin: 1.7rem auto 0;
    img {
      height: 100%;
      width: 100%;
      pointer-events: none;
      user-select: none;
    }
  }
}

</style>
