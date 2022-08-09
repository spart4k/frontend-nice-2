<template>
  <div :class="$style.container">
    <!-- <template v-if="true">
      <N-Sheet-Register @toLogin="toLogin" />
    </template>
    <template v-else-if="false">
      <N-Sheet-Login />
    </template>
    <template v-else>
      <N-Sheet-Password-Recovery />
    </template> -->
    <!-- <N-Sheet-Login /> -->
    <!-- <N-Sheet-Password-Recovery /> -->
    <!-- <N-Sheet-Profile /> -->
    <N-Sheet-Search />
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSheet',
  props: {
  },
  setup () {
    const toLogin = () => {
      console.log('sadas')
    }
  return {
    toLogin
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
