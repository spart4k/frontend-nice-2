<template>
  <span :class="[$style.likeButton, value ? $style.liked : '']" @click="setLike">
    <N-Icon name="like" :style="{color: value ? 'rgb(242, 61, 21)' : 'transparent'}" :class="[value ? $style.liked : '', $style.like]" />
    <div :class="$style.heartAnimation1" />
    <div :class="$style.heartAnimation2" />
  </span>
</template>

<script>
export default {
  name: 'NLike',
  props: {
    value: Boolean
  },
  setup (props, { emit }) {
    const setLike = () => {
        emit('input', !props.value)
    }
    return {
    setLike
    }
  }
}
</script>

<style scoped lang="scss" module>
$bezier: cubic-bezier(.175, .885, .32, 1.275);

.likeIcon {
  width: 26px;
  height: 24px;
  display: flex;
  animation: heartUnlike .25s $bezier both;
}

.likeButton {
animation: heartUnlike .25s $bezier both;
}

.liked {
  animation: heartPulse .25s $bezier both;
    [class^="heartAnimation"] {
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNiAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjk5OTkgMjRMMTEuMTc5OSAyMi4xNzM5QzQuNDIwMDMgMTYuMTczOCAwIDEyLjEzMDMgMCA3LjE3Mzk5QzAgMy4xMzA1MSAzLjExOTk4IDAgNy4xNDk5OCAwQzkuMzU5OTQgMCAxMS41Njk5IDEuMDQzNDYgMTMgMi43MzkxMkMxNC40Mjc0IDEuMDQzNDYgMTYuNjQgMCAxOC44NSAwQzIyLjg4IDAgMjYgMy4xMzA0NiAyNiA3LjE3Mzk5QzI2IDEyLjEzMDMgMjEuNTgwMSAxNi4xNzQyIDE0LjgyMDEgMjIuMTczOUwxMi45OTk5IDI0WiIgZmlsbD0iI0YzNEEyMyIvPgo8L3N2Zz4K) no-repeat center;
      background-size: 100%;
      display: block;
      position: absolute;
      top: 0;
      right: 5px;
      width: 16px;
      height: 14px;
      opacity: 0;

        &::before, &::after {
          content: '';
          background: inherit;
          background-size: 100%;
          width: inherit;
          height: inherit;
          display: inherit;
          position: relative;
          top: inherit;
          left: inherit;
          opacity: 0;
        }
    }

    .heartAnimation1 {
      animation: heartFloatMain-1 1s $bezier both;
      &::before, &::after {
        width: 12px;
        height: 10px;
        visibility: hidden;
      }
      &::before {
        opacity: .6;
        animation: heartFloatSub-1 1s .25s $bezier both;
      }
      &::after {
        animation: heartFloatSub-2 1s .15s $bezier both;
        opacity: .75;
      }
    }

    .heartAnimation2 {
      animation: heartFloatMain-2 1s .1s $bezier both;
      &::before, &::after {
        width: 10px;
        height: 8px;
        visibility: hidden;
      }
      &::before {
        animation: heartFloatSub-3 1s .25s $bezier both;
        opacity: .25;
      }
      &::after {
        animation: heartFloatSub-4 1s .15s $bezier both;
        opacity: .4;
      }
    }
}

// Animations
@keyframes heartPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
}

@keyframes heartUnlike {
  50% { transform: scale(.75) ; }
}

@keyframes heartFloatMain-1 {
  0% {
    opacity: 0;
    transform: translate(0) rotate(0);
  }
  50% {
    opacity: 1;
    transform: translate(0, -25px) rotate(-20deg);
  }
}

@keyframes heartFloatMain-2 {
  0% {
    opacity: 0;
    transform: translate(0) rotate(0) scale(0);
  }
  50% {
    opacity: .9;
    transform: translate(-10px, -38px) rotate(25deg) scale(1);
  }
}

@keyframes heartFloatSub-1 {
  0% {
    visibility: hidden;
    transform: translate(0) rotate(0);
  }
  50% {
    visibility: visible;
    transform: translate(13px, -13px) rotate(30deg);
  }
}

@keyframes heartFloatSub-2 {
  0% {
    visibility: hidden;
    transform: translate(0) rotate(0);
  }
  50% {
    visibility: visible;
    transform: translate(18px, -10px) rotate(55deg);
  }
}

@keyframes heartFloatSub-3 {
  0% {
    visibility: hidden;
    transform: translate(0) rotate(0);
  }
  50% {
    visibility: visible;
    transform: translate(-10px, -10px) rotate(-40deg);
  }
  100% {
    transform: translate(-50px, 0);
  }
}

@keyframes heartFloatSub-4 {
  0% {
    visibility: hidden;
    transform: translate(0) rotate(0);
  }
  50% {
    visibility: visible;
    transform: translate(2px, -18px) rotate(-25deg);
  }
}
</style>
