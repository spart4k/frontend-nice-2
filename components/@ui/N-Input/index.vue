<template>
  <div :class="$style.container">
    <input
      v-if="$props.type === 'input'"
      ref="input"
      v-model="letters"
      type="text"
      maxlength="100"
      :class="$style.input"
      :placeholder="placeholder"
      @focus="focusInput"
      @blur="blurInput"
      @keyup.enter="sendComment"
    >
    <textarea
      v-else-if="$props.type === 'textarea'"
      ref="input"
      v-model="letters"
      :placeholder="placeholder"
      maxlength="100"
      :class="$style.textarea"
      rows="1"
      @focus="focusInput"
      @blur="blurInput"
      @input="resize($event)"
      @keyup.enter="sendComment"
    />
    <!-- <div><span ref="input" tabindex="-1" :class="$style.textarea" role="textbox" contenteditable="true" /></div> -->
    <div :class="$style.emoji">
      <N-Icon name="smile" :class="$style.icon" :style="{ color: smilies ? '#F45532' : '#222222' }" @click="showSmilies(); $emit('smilies')" />
      <div :class="$style.send">
        <div :class="$style.letterCounter">
          {{ letters.length }}/100
        </div>
        <N-Icon :class="$style.sendButton" name="send" @click="sendComment" />
      </div>
    </div>
    <transition
      name="accordion"
      class="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <N-Emoji v-if="smilies" @emojiWrite="emojiWrite" @stickerWrite="sendSticker" @click="emojiWrite" />
    </transition>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted } from '@nuxtjs/composition-api'

export default {
  name: 'NInput',
  props: {
    placeholder: {
      type: String,
      default: 'Написать комментарий....'
    },
    type: {
      type: String,
      default: 'input'
    },
    swipingBlock: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
  const { emit } = ctx
  const letters = ref('')
  const input = ref()
  const smilies = ref()
  const innerHeight = ref(null)
  const mountedHeight = ref(null)
  const transformBlock = ref(null)
  const showSmilies = () => {
    smilies.value = !smilies.value
  }
  const resize = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  const sendComment = () => {
    input.value.style.height = ''
    emit('sendMessage', letters.value)
    letters.value = ''
  }
  const beforeEnter = (el) => {
    el.style.height = '0'
  }
  const divContent = computed(() => {
    return input.value.innerHTML
  })
  const enter = (el) => {
    el.style.height = el.scrollHeight + 'px'
    // el.style.height = '12rem'
  }
  const beforeLeave = (el) => {
    el.style.height = el.scrollHeight + 'px'
    // el.style.height = '12rem'
  }
  const leave = (el) => {
    el.style.margin = '0'
    el.style.height = '0'
  }
  const widthFrame = computed(() => {
    return window.innerWidth
  })
  const androidDevice = computed(() => {
    if (/Android/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
  })
  // const keyboardHeight = computed(() => {
  //   return mountedHeight.value - innerHeight.value
  // })
  const emojiWrite = (emoji) => {
    if (letters.value.length < 99) {
      letters.value += emoji
      // РАСКОМЕНТИТЬ
      // if (widthFrame.value > 768) {
      //  input.value.focus()
      // }
    }
  }
  const sendSticker = (val) => {
    showSmilies()
    emit('sendSticker', val)
  }
  const handleKeyboard = () => {
    innerHeight.value = window.innerHeight
    if (!showingKeyboard.value && androidDevice.value) {
      setTimeout(() => {
        transformBlock.value.style.transform = 'translate(0,0)'
      }, 300)
    } else if (showingKeyboard.value && androidDevice.value) {
      // transformBlock.value.style.transform = `translate(0,-${keyboardHeight.value}px)`
    }
  }

  const focusInput = () => {
    if (widthFrame.value < 768 && androidDevice.value) {
      if (transformBlock.value) {
        setTimeout(() => {
          // transformBlock.value.style.transform = `translate(0,-${keyboardHeight.value}px)`
        }, 300)
      }
    }
  }

  const blurInput = () => {
     if (transformBlock.value) {
      setTimeout(() => {
        transformBlock.value.style.transform = 'translate(0,0)'
      }, 300)
     }
  }

  const showingKeyboard = computed(() => {
    if (mountedHeight.value === innerHeight.value) {
      return false
    } else if (innerHeight.value < mountedHeight.value) {
      return true
    }
  })

  onMounted(() => {
    mountedHeight.value = window.innerHeight
    if (props.swipingBlock) {
      transformBlock.value = document.querySelector(props.swipingBlock)
    }
    window.addEventListener('resize', handleKeyboard)
  })

  watch(() => letters.value, (newValue) => {
    emit('input', newValue)
  })
  return {
    emojiWrite,
    letters,
    smilies,
    showSmilies,
    sendComment,
    resize,
    input,
    beforeEnter,
    enter,
    beforeLeave,
    leave,
    widthFrame,
    divContent,
    androidDevice,
    innerHeight,
    mountedHeight,
    focusInput,
    blurInput,
    handleKeyboard,
    showingKeyboard,
    sendSticker,
    transformBlock
  }
  }
}
</script>

<style scoped lang="scss" module>
.container{
    overflow: hidden;
    // .input {
    //     width: 100%;
    //     @include regular-text;
    //     color: $fontColorDefault;
    //     padding: 1rem 0;
    //     border: none;
    //     border-bottom: 2px solid #D46D33;
    //     outline: none;
    //     resize: none;
    // }
    .textarea, .input {
      display: block;
      width: 100%;
      height: 3.5rem;
      @include regular-text;
      color: $fontColorDefault;
      overflow: hidden;
      padding: 1rem 0;
      border: none;
      border-bottom: .2rem solid #D46D33;
      border-radius: 0;
      outline: none;
      resize: none;
      background-color: transparent;
      transition: .1s;
    }
    .emoji {
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      .sendButton {
        width: 2.4rem;
        height: 2.4rem;
        cursor: pointer;
      }
    .icon {
      width: 2.4rem;
      height: 2.4rem;
      transition: color .2s;
      cursor: pointer;
    }
    .send {
        display: flex;
        .letterCounter {
            @include regular-text-small;
            color: $fontColorDefault;
            display: flex;
            align-items: center;
            opacity: 0.5;
            margin-right: 1.5rem;
          }
        }
    }
    [contenteditable=true]:empty:before{
      content: attr(placeholder);
      pointer-events: none;
      display: block; /* For Firefox */
    }
}
</style>
