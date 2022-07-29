<template>
  <div :style="{ marginBottom: showContainer ? '5rem' : '3.5rem' }" :class="$style.container">
    <textarea
      ref="input"
      v-model="letters"
      type="text"
      maxlength="200"
      :class="$style.input"
      placeholder="Написать комментарий ..."
    />
    <div :class="$style.emoji">
      <N-Icon name="smile" :class="$style.icon" :style="{ color: showContainer ? '#F45532' : '#222222' }" @click="showContainer = !showContainer" />
      <div :class="$style.send">
        <div :class="$style.letterCounter">
          {{ letters.length }}/200
        </div>
        <N-Icon name="send" @click="sendComment" />
      </div>
    </div>
    <N-Emoji v-if="showContainer" @emojiWrite="emojiWrite" @click="emojiWrite" />
    <p><span class="textarea" role="textbox" contenteditable></span></p>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NInput',
  props: {
  },
  setup () {
  const letters = ref('')
  const input = ref()
  const showContainer = ref()
  const sendComment = () => {
    console.log(letters.value)
  }
  const emojiWrite = (emoji) => {
    letters.value += emoji
    input.value.focus()
  }
  return {
    emojiWrite,
    letters,
    showContainer,
    sendComment,
    input
  }
  }
}
</script>

<style scoped lang="scss" module>
.container{
    margin-top: 2rem;
    .input {
        width: 100%;
        @include regular-text;
        color: $fontColorDefault;
        padding: 1rem 0;
        border: none;
        border-bottom: 2px solid #D46D33;
        outline: none;
        resize: none;
    }
    .emoji {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    .icon {
      transition: all .2s;
    }
    .send {
        display: flex;
        gap: 15px;
        .letterCounter {
            @include regular-text-small;
            color: $fontColorDefault;
            display: flex;
            align-items: center;
            opacity: 0.5;
            }
        }
    }
}
.textarea {
  display: block;
  width: 100%;
  overflow: hidden;
  resize: both;
  min-height: 40px;
  line-height: 20px;
}
</style>
