import { ref, watch } from '@nuxtjs/composition-api'

export default {
  name: 'live-chat-panel-field',
  props: {
    message: {
      type: Object,
      default: () => {}
    },
    valueProxy: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const { emit } = ctx
    const value = ref('')
    const inputValue = () => {
      emit('input', value.value)
    }
    watch(() => props.valueProxy, (newValue) => {
      value.value = newValue
    })
    return {
      value,
      inputValue
    }
  }
}
