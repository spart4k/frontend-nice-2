export const state = () => ({
  isShowBottomSheetStepper: false,
  component: '',
  isShowBottomMenu: false,
  isShowBottomLive: false,
  stepCurrentComponent: 0,
  basketLength: 0,
  audioPlaying: false,
  lastStepKey: ''
})

export const mutations = {
  changeShowStateBottomSheetStepper (store, value) {
    store.isShowBottomSheetStepper = value
  },
  changelastStepKey (store, value) {
    store.lastStepKey = value
  },
  changeShowStateBottomSheetMenu (store, { value }) {
    store.isShowBottomMenu = value
  },
  changeShowStateBottomSheetLive (store, { value }) {
    store.isShowBottomLive = value
  },
  changeKeyMenu (store, value) {
    store.component = {
      key: value.key,
      effect: value.effect
    }
  },
  changeStepMenu (store, { step }) {
    store.stepCurrentComponent = step
  },
  changeAudioPlaying (store, value) {
    store.audioPlaying = value
  }
}
