export const state = () => ({
  TinkoffPaymentURL: ''
})

export const mutations = {
  setPaymentURL (state, value) {
    state.TinkoffPaymentURL = value
  }
}

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
  },
  async getWires (state, params) {
    try {
      const data = await this.$axios.post('api/v1/interfacePairSearch', params)
      return data.data
    } catch (e) {
      console.log(e)
    }
  },
  async getPrice (state, params) {
    try {
      const data = await this.$axios.post('api/v1/computePrice', params)
      return data.data
    } catch (e) {
      console.log(e)
    }
  },
  async createNewOrder ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/createNewOrder', params)
      return data.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
