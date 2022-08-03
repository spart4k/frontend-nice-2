<template>
  <div>
    <div :class="[isHomePage && $style.wrapper]">
      <n-logo v-if="isHomePage" :class="$style.logo" size="md" />
      <!--      <h1-->
      <!--        v-if="description.subtitle"-->
      <!--        :class="[-->
      <!--          isHomePage && $style.intro__subtitle_homePage,-->
      <!--          $style.subtitle,-->
      <!--          hideTextLogo && $style.hideTextLogo-->
      <!--        ]"-->
      <!--      >-->
      <!--        {{ description.subtitle }}-->
      <!--      </h1>-->
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
    hideTextLogo: Boolean
  }
}
</script>

<style scoped lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
    @include title;
    @include montserratBlack;
    margin-bottom: 2rem;
}
.subtitle {
  @include Bankir-Retro;
  @include text;
  color: rgba($white, .85);
  width: 20.5rem;
  line-height: 2.9rem;
  transition: opacity 0.6s ease;
  text-align: center;
  &.hideTextLogo {
    opacity: 0;
  }
}

</style>
