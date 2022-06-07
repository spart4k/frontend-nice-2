<template>
  <N-Card-Default
    v-bind="$props"
    :hat-height="32.5"
  />
</template>
<script lang="js">
import propsData from '../props'
export default {
  name: 'NCardAlbum',
  props: { ...propsData.props }
}
</script>
