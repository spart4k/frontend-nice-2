<template>
  <div :class="[$style.logo, $style[size]]">
    <div
      :class="$style.wrapperImage"
    >
      <img
        v-if="showLogo"
        src="@/assets/img/logo.png"
        alt="Логотип Nice"
        class="logo_image"
        :class="$style.logoImage"
      >
    </div>
    <div :class="$style.wrapperImage">
      <img
        src="@/assets/img/subtitle.png"
        alt="subtitle"
        class="subtitleLogo"
        :class="$style.imageSubtitle"
      >
    </div>
  </div>
</template>

<script>

export default {
  name: 'NLogo',
  props: {
    size: {
      type: String,
      default: ''
    },
    showLogo: {
      type: Boolean,
      default: true
    }

  }
}
</script>

<style scoped lang="scss" module>
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  will-change: transform;
  .wrapperImage {
    overflow: hidden;
    & > img {
      transform: translateY(-100%);
    }
  }
  img {
    width: 100%;
  }
  .logoImage {
    display: block;
    padding-bottom: 1.7rem;
    line-height: 0;
  }
  .imageSubtitle {
    display: block;
    line-height: 0;
    width: 18rem;
    will-change: transform;
  }
}
.sm {
  width: 7.2rem;
}
.md {
  width: 16.3rem;
}
//.big {
//    width: 35.5rem;
//}

</style>
