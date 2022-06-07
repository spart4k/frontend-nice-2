<template>
  <N-Card-Default
    v-bind="$props"
    :hat-height="12.4"
  />
</template>
<script lang="js">
import dataProps from '../props'
export default {
  name: 'NCardGeneral',
  props: { ...dataProps.props }
}

</script>
