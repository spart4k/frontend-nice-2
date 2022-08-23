import { BLAND_COLOR } from '~/const/blandColor'

export default {
  name: 'Tabs-Item',
  props: {
    item: {
      type: Object
    }
  },
  setup (props) {
    return {
      BLAND_COLOR
    }
  }
}
