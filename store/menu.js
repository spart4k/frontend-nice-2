export const state = () => ({
  isShowBottomSheetStepper: false,
  componentName: '',
  isShowBottomMenu: false,
  stepCurrentComponent: 0,
  basketLength: 0
})

export const mutations = {
  changeShowStateBottomSheetStepper (store, value) {
    store.isShowBottomSheetStepper = value
  },
  changeShowStateBottomSheetMenu (store, { value }) {
    store.isShowBottomMenu = value
  },
  changeKeyMenu (store, { key }) {
    store.componentName = key
  },
  changeStepMenu (store, { step }) {
    store.stepCurrentComponent = step
  }
}
