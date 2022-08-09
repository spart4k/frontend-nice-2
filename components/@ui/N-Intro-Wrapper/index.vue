<template>
  <main>
    <n-background ref="background" :is-home-page="isHomePage" :color="color" class="background" />
    <slot />
  </main>
</template>

<script>
export default {
  name: 'NIntroWrapper',
  props: {
    color: String,
    isHomePage: Boolean
  }
}
</script>

<style scoped>

</style>
