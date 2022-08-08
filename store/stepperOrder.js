export const state = () => ({
  isShowBottomSheet: false,
  basketLength: 0
})

export const mutations = {
  changeShowStateBottomSheet (store, value) {
    store.isShowBottomSheet = value
  }
}
