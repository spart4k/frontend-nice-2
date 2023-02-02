import { onMounted, computed, ref, watch } from '@nuxtjs/composition-api'

export default {
  name: 'live-chat-dialogue',
  props: {
    messages: {
      type: [Object, Array],
      default: () => []
    },
    scrollTrigger: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const messageToView = computed(() => {
      const newMessages = [
        ...props.messages
      ]
      return newMessages.reverse()
    })
    const dialog = ref()
    const scrollDown = () => {
      dialog.value.scrollTop = 0
      // setTimeout(() => {
      //   alert('scrollTop =' + dialog.value.scrollTop)
      //   alert('scrollHeight =' + dialog.value.scrollHeight)
      // }, 1000)
    }
    onMounted(() => {
    })

    watch(() => props.scrollTrigger, () => {
      scrollDown()
    })
    return {
      messageToView,
      scrollDown,
      dialog
    }
  }
}
