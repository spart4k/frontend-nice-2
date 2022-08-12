<template>
  <div :class="$style.container">
    <input
      v-if="$props.type === 'input'"
      ref="input"
      v-model="letters"
      type="text"
      maxlength="200"
      :class="$style.input"
      :placeholder="placeholder"
    >
    <textarea
      v-else-if="$props.type === 'textarea'"
      ref="input"
      v-model="letters"
      :placeholder="placeholder"
      maxlength="200"
      :class="$style.textarea"
      rows="1"
      @input="resize($event)"
    />
    <!-- <div><span ref="input" tabindex="-1" :class="$style.textarea" role="textbox" contenteditable="true" /></div> -->
    <div :class="$style.emoji">
      <N-Icon name="smile" :class="$style.icon" :style="{ color: smilies ? '#F45532' : '#222222' }" @click="showSmilies(); $emit('smilies')" />
      <div :class="$style.send">
        <div :class="$style.letterCounter">
          {{ letters.length }}/200
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
      <N-Emoji v-if="smilies" @emojiWrite="emojiWrite" @click="emojiWrite" />
    </transition>
  </div>
</template>

<script>
import { ref, watch, computed } from '@nuxtjs/composition-api'

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
    }
  },
  setup (props, ctx) {
  const { emit } = ctx
  const letters = ref('')
  const input = ref()
  const smilies = ref()
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
    console.log(letters.value)
  }
  const beforeEnter = (el) => {
    el.style.height = '0'
  }
  const enter = (el) => {
    el.style.height = el.scrollHeight + 'px'
  }
  const beforeLeave = (el) => {
    el.style.height = el.scrollHeight + 'px'
  }
  const leave = (el) => {
    el.style.margin = '0'
    el.style.height = '0'
  }
  const widthFrame = computed(() => {
    return window.innerWidth
  })
  const emojiWrite = (emoji) => {
    if (letters.value.length < 199) {
      // const template =
      // `<span class="emoji">${emoji}</span>`
      letters.value += emoji
      if (widthFrame.value > 768) {
        input.value.focus()
      }
    }
  }
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
    widthFrame
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
      height: 35px;
      @include regular-text;
      color: $fontColorDefault;
      overflow: hidden;
      padding: 1rem 0;
      border: none;
      border-bottom: .2rem solid #D46D33;
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
        cursor: pointer;
      }
    .icon {
      transition: all .2s;
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
}
</style>
