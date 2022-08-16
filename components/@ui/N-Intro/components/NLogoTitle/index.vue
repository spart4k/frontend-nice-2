<template>
  <div :class="$style.container">
    <N-Section-Intro v-if="!isHomePage" :description="description" :image="image" />
    <div>
      <div :class="[isHomePage && $style.wrapper]">
        <n-logo v-if="isHomePage" :is-home-page="isHomePage" :class="$style.logo" size="md" />
      </div>
    </div>
  </div>
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
  //position: fixed;
  //height: calc(100vh - 15.5rem);
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>
