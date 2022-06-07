export default {
  name: 'NCardDefault',
  props: {
    img: {
      type: String,
      default: ''
    },
    video: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    chips: {
      type: Array,
      default: null
    },
    amountComment: {
      type: Number,
      default: null
    },
    hatHeight: {
      type: Number,
      default: null
    },
    author: {
      type: String,
      default: ''
    }
  }
}
