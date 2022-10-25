<template>
  <div :class="$style.wrap">
    <!-- <span :class="[$style.loader, purple && $style.purple, black && $style.black]" /> -->
    <n-icon name="rainbowPreloader" :class="[$style.loader, purple && $style.purple, black && $style.black]"></n-icon>
  </div>
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
.wrap {
  width: 4.2rem;
  height: 4.2rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  position: absolute;
}
.loader {
  display: block;
  width: 4.2rem;
  height: 4.2rem;
  animation: rotate 1s linear infinite;
  svg {
    height: 100%;
    width: 100%;
  }
}
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  // border: 2px solid #ffffff;
  animation: prixClipFix 1s linear infinite ;
}
.purple.loader::before {
  // border-color:#6448B5;
}

.black.loader::before {
  // border-color:#222222;
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
