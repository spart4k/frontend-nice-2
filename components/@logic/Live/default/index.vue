<template>
  <div class="liveChat" :class="$style.live">
    <!-- <div :class="$style.title">
       Эфир
    </div>-->
    <live-radio/>
    <live-chat :messages="messages" @sendMessage="($event) => $emit('sendMessage', $event)" @sendSticker="($event) => $emit('sendSticker', $event)" />
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
