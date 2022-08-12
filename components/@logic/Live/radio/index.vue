<template>
  <div :class="$style.radio">
    <div :class="$style.wrap">
      <img :class="$style.wrapper" :src="require(`~/assets/img/live/def-radio-wrap.png`)" alt="">
      <div ref="marquee" class="marquee" :class="[ $style.marquee, $style.name ]">
        <div class="inner" :class="$style.inner">
          <p>Eli & Fur live from Courmayeur, Skyway Monte Bianco, in Italy for Cercle</p>
        </div>
      </div>

      <div :class="$style.control">
        <div v-if="!audioPlaying" class="" @click="playAudio">
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.9997 10.0002C18.0021 10.3799 17.9028 10.7534 17.712 11.0822C17.5211 11.4111 17.2455 11.6834 16.9136 11.8712L3.25789 19.7076C2.92845 19.8991 2.55369 20 2.17209 20C1.79033 20 1.41559 19.8991 1.08613 19.7076C0.754257 19.5198 0.478567 19.2474 0.287764 18.9185C0.0969536 18.5896 -0.0023931 18.2162 4.37751e-05 17.8366V2.16243C-0.00210662 1.78294 0.0972397 1.40969 0.288054 1.08106C0.479007 0.752436 0.754401 0.480236 1.08613 0.292426C1.41557 0.100895 1.79033 0 2.17208 0C2.55369 0 2.92843 0.100895 3.25789 0.292426L16.9143 8.13024C17.246 8.31806 17.5214 8.59024 17.7121 8.91887C17.9029 9.24749 18.0023 9.62071 18 10.0001L17.9997 10.0002Z" fill="#222222" />
          </svg>
        </div>
        <div v-else-if="audioPlaying" class="" @click="pauseAudio">
          <svg
            width="18"
            height="20"
            viewBox="0 0 16 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.89543 0.895431 0 2 0H4C5.10457 0 6 0.895431 6 2V20C6 21.1046 5.10457 22 4 22H2C0.89543 22 0 21.1046 0 20V2Z" fill="#222222" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C10 0.89543 10.8954 0 12 0H14C15.1046 0 16 0.895431 16 2V20C16 21.1046 15.1046 22 14 22H12C10.8954 22 10 21.1046 10 20V2Z" fill="#222222" />
          </svg>
        </div>
      </div>
    </div>
    <audio ref="audioSource" src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3" />
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>
