import Vue from 'vue'
import VueMask from 'v-mask'

Vue.use(VueMask, {
    placeholders: {
      Q: /[1-9]/
    }
  })
