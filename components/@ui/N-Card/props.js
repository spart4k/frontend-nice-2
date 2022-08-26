export default {
  name: 'NCardDefault',
  props: {
    images: {
      type: Array,
      default: null
    },
    data: {
      type: Object,
      default: null
    },
    video: {
      type: String,
      default: ''
    },
    withVideo: {
      type: Boolean,
      default: false
    },
    withAuthor: {
      type: Boolean,
      default: false
    },
    detailPage: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    text: {
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
    },
    comments: {
      type: Object,
      default: () => {}
    }
  }
}
