<template>
  <div class="liveChat" :class="$style.live">
    <!-- <div :class="$style.title">
       Эфир
    </div>-->
    <live-radio :song="song" @playAudio="$emit('playAudio')" @pauseAudio="$emit('pauseAudio')" @closeState="$emit('closeState')" />
    <live-chat :messages="messages" @closeState="$emit('closeState')" @sendMessage="($event) => $emit('sendMessage', $event)" @sendSticker="($event) => $emit('sendSticker', $event)" />
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
