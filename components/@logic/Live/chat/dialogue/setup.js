import { onMounted, computed, ref } from '@nuxtjs/composition-api'

export default {
  name: 'live-chat-dialogue',
  props: {
    messages: {
      type: [Object, Array],
      default: () => []
    }
  },
  setup (props, ctx) {
    const initMesassage = () => {

    }
    const messageToView = computed(() => {
      const newMessages = [
        ...props.messages
      ]
      return newMessages.reverse()
    })
    const dialog = ref(null)
    const scroll = () => {
      console.log('scroll')
      // dialog.value.$el.scrollTop()
    }

    onMounted(() => {
      initMesassage()
    })
    return {
      initMesassage,
      messageToView,
      scroll,
      dialog
    }
  }
}
