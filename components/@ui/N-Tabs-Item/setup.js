import { computed, useContext } from '@nuxtjs/composition-api'
import { BLAND_COLOR } from '~/const/blandColor'

export default {
  name: 'Tabs-Item',
  props: {
    item: {
      type: Object
    }
  },
  setup (props) {
    const { store } = useContext()
    // const showAnimate = computed(() => store.state.content.singleAnimation)
    const showAnimate = computed(() => store.state.content.isShowAnimationHomePage)

    return {
      BLAND_COLOR,
      showAnimate
    }
  }
}
