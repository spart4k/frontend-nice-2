<template>
  <div :class="$style.container">
    <!--    <h1 v-if="!isHomePage" :class="[$style.title]">-->
    <!--      {{ description.title }}-->
    <!--    </h1>-->
    <!--    <div v-if="!isHomePage">-->
    <!--      <N-Icon :class="$style.quote" name="quote" />-->
    <!--      <h2 :class="$style.subtitle">-->
    <!--        Читая, вы проживаете несколько жизней.-->
    <!--      </h2>-->
    <!--      <h3 :class="$style.author">-->
    <!--        – Уильям Стайрон-->
    <!--      </h3>-->
    <!--      <div :class="$style.image">-->
    <!--        <img :src="require(`~/assets/img/background/${image}`)" alt="">-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div>-->
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
  //position: fixed;
  //height: calc(100vh - 15.5rem);
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
}

</style>
