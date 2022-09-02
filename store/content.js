export const state = () => ({
  showLogo: false,
  logoBg: '',
  bgIntro: '',
  imgIntro: '',
  bgDetails: '',
  animationEnd: false,
  sections: [],
  headerItems: [],
  isShowAnimationHomePage: true
})

export const mutations = {
  changeBgIntro (state, value) {
    state.bgIntro = value
  },
  changeBgDetail (state, value) {
    state.bgDetails = value
  },
  clearBgIntro (state) {
    state.bgIntro = ''
  },
  changeLogo (state, value) {
    state.showLogo = value
  },
  changeAnimationEnd (state, value) {
    state.animationEnd = value
  },
  changeSections (state, value) {
    state.sections = value
  },
  changeHeaderItems (state, value) {
    state.headerItems = value
  },
  setAnimate (state, value) {
    state.isShowAnimationHomePage = value
  }
}

export const getters = {
  footerSection (state) {
    const lengthSection = state.sections.length
    if (lengthSection) {
      return {
        left: state.sections.slice(0, lengthSection / 2),
        right: state.sections.slice(lengthSection / 2, -1)
      }
    }
    return state.sections
  }
}

export const actions = {
  async getHeader ({ commit }, params) {
    // const response = await this.$axios('api/v1/sections')
    const response = await this.$axios.post('api/v1/sectionsSearch', params)
    return response.data.data
  }
}
