<template>
  <div>
    <h1 v-if="!isHomePage" :class="[$style.title]">
      {{ description.title }}
    </h1>
    <div v-if="!isHomePage">
      <h2 :class="$style.quote"></h2>
      <h2 :class="$style.subtitle">Читая, вы проживаете несколько жизней.</h2>
      <h3 :class="$style.author">– Уильям Стайрон</h3>
    </div>
    <div :class="[isHomePage && $style.wrapper]">
      <n-logo v-if="isHomePage" :class="$style.logo" size="md" />
      <!-- <h1
        v-if="description.subtitle"
        :class="[
          isHomePage && $style.intro__subtitle_homePage,
          $style.subtitle,
          hideTextLogo && $style.hideTextLogo
        ]"
      >
        {{ description.subtitle }}
      </h1> -->
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
    margin-bottom: 4rem;
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
// .subtitle {
//   @include Bankir-Retro;
//   @include text;
//   color: rgba($white, .85);
//   width: 20.5rem;
//   line-height: 2.9rem;
//   transition: opacity 0.6s ease;
//   text-align: center;
//   &.hideTextLogo {
//     opacity: 0;
//   }
// }

</style>
