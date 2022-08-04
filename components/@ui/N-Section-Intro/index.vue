<template>
  <div :class="$style.container">
    <h1 :class="[$style.title]">
      {{ description.title }}
    </h1>
    <div>
      <N-Icon :class="$style.quote" name="quote" />
      <h2 :class="$style.subtitle">
        Читая, вы проживаете несколько жизней.
      </h2>
      <h3 :class="$style.author">
        – Уильям Стайрон
      </h3>
      <div :class="$style.image">
        <img :src="require(`~/assets/img/background/${image}`)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NSectionIntro',
  props: {
    description: {
      type: Object
    },
    image: String
  }
}
</script>

<style scoped lang="scss" module>
.container {
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
}

</style>
