<template>
  <div :class="$style.wrapper">
    Нажимая на кнопку, вы соглашаетесь с <a :class="$style.link" href="/TermsOfSale.pdf">Условиями продажи</a>
  </div>
</template>

<script>
export default {
  name: 'NPersonalConsent'
}
</script>

<style lang="scss" module>
.wrapper {
  @include regular-text;
}
.link {
  color: $pink2;
}
</style>
