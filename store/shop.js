export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    try {
      const data = await this.$axios('api/v1/cards/shop', { params })
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async getDataForShop (state, params) {
    try {
      const data = await this.$axios('api/v1/sections/forshop', { params })
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
