<template>
  <div :class="$style.container">
    <N-Button-Close :class="$style.closeButton" color="#222222" background-color="rgba(34, 34, 34, 0.2)" @click="$emit('closeSheet')" />
    <!-- <N-Sheet-Register /> -->
    <!-- <N-Sheet-Login /> -->
    <N-Sheet-Password-Recovery />
    <!-- <N-Sheet-Profile /> -->
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSheet',
  props: {
  },
  setup () {
  return {
  }
  }
}
</script>

<style scoped lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem 6rem;
  .closeButton {
    top: 1.5rem;
    right: 1.5rem;
  }
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 2.7rem;
  }
  .inputContainer{
    display: flex;
    flex-direction: column;
    margin: 2rem 0 2.5rem;
    gap: 2.5rem;
  }
  .noRegistered {
    margin-top: 2.4rem;
  }
}
</style>
