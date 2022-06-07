<template>
  <div :class="$style.author">
    <div :class="$style.author__img">
      <img v-if="src" :src="src" alt="Изоброжение">
    </div>
    <div :class="$style.author__name">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NAuthor',
  props: {
    src: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'Name'
    }
  }
}
</script>

<style module src="./style.scss" lang="scss"></style>
