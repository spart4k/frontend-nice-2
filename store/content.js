export const state = () => ({
  showLogo: false,
  logoBg: '',
  bgIntro: '',
  imgIntro: '',
  sections: []
})

export const mutations = {
  changeState (state, { key, value }) {
    state[key] = value
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
