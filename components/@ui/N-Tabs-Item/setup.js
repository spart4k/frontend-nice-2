import { BLAND_COLOR } from '~/const/blandColor'

export default {
  name: 'Tabs-Item',
  props: {
    item: {
      type: Object
    }
  },
  setup (props) {
    console.log(props.item)
    return {
      BLAND_COLOR
    }
  }
}
