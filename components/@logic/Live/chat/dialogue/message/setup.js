import { computed } from '@nuxtjs/composition-api'
export default {
  name: 'live-chat-dialogue-message',
  props: {
    message: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const decodeText = computed(() => {
      return decodeURIComponent(escape(props.message.message_text))
    })
    const nickName = computed(() => props?.message?.user?.nickname)
    return {
      decodeText,
      nickName
    }
  }
}
