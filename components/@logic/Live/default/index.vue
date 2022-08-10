<template>
  <div :class="$style.live">
    <!-- <div :class="$style.title">
       Эфир
    </div>-->
    <live-radio/>
    <live-chat/>
  </div>
</template>
<script>
export default {
  name: 'live'
}
</script>

<style lang="scss" module src="./style.scss">
</style>
