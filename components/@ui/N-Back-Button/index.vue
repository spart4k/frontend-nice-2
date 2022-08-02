<template>
  <div :class="$style.button" @click="goToPrev()">
    <N-Icon name="back" />
    <p :class="$style.text">
      Назад
    </p>
  </div>
</template>

<script>
export default {
  name: 'NBackButton',
  props: {
  },
  methods: {
  goToPrev () {
    this.$router.go(-1)
  }
}
}
</script>

<style scoped lang="scss" module>
.button{
    width: 100%;
    height: 5rem;
    margin-top: 2rem;
    background-color: $white;
    border-radius: 2.5rem;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    @media (min-width: $tabletWidth) {
      margin: 2rem auto 0;
      width: 36.2rem;
    }

    .text {
    color: $fontColorDefault;
    @include button;
    }
}
</style>
