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
  async tinkoff ({ commit }, params) {
    try {
      delete this.$axios.defaults.headers.common.Authorization
      const data = await this.$axios.post('https://securepay.tinkoff.ru/v2/Init', params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      const token = localStorage.getItem('token')
      this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
      console.log(data)
      commit('setPaymentURL', data.data.PaymentURL)
      return data.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
