export const state = () => ({
  showLogo: false,
  logoBg: '',
  bgIntro: '',
  imgIntro: '',
  bgDetails: '',
  sections: [],
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
  changeSections (state, value) {
    state.sections = value
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
