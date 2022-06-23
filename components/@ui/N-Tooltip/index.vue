<template>
  <v-popover offset="10" :auto-hide="false" trigger="hover" :show="isOpen">
    <slot />
    <template #popover>
      <slot name="data" />
    </template>
  </v-popover>
</template>
<script lang="js">
export default {
  name: 'NTooltip',
  setup () {
    const isOpen = () => {

    }
    return {
      isOpen
    }
  }
}
</script>
