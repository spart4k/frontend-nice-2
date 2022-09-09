<template>
  <span :class="[$style.loader, purple && $style.purple, black && $style.black]" />
</template>

<script>
  export default {
    name: 'NLoading',
    props: {
      purple: {
        type: Boolean,
        default: false
      },
      black: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss" module>
.loader {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite
}
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  animation: prixClipFix 2s linear infinite ;
}
.purple.loader::before {
  border-color:#6448B5;
}

.black.loader::before {
  border-color:#222222;
}

@keyframes rotate {
  100%   {transform: rotate(360deg)}
}

@keyframes prixClipFix {
  0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
  25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
  50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
  75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
  100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
}
</style>
