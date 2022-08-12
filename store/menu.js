export const state = () => ({
  isShowBottomSheetStepper: false,
  isShowBottomMenu: false,
  isShowBottomLive: false,
  basketLength: 0
})

export const mutations = {
  changeShowStateBottomSheetStepper (store, value) {
    store.isShowBottomSheetStepper = value
  },
  changeShowStateBottomSheetMenu (store, value) {
    store.isShowBottomMenu = value
  },
  changeShowStateBottomSheetLive (store, value) {
    store.isShowBottomLive = value
  }
}
