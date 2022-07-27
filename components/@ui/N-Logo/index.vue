<template>
  <div :class="[$style.logo, $style[size]]">
    <img
      v-if="showLogo"
      src="@/assets/img/logo.png"
      alt="Логотип Nice"
    >
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
  img {
    width: 100%;
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
