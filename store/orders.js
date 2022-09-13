export const state = () => ({
  orders: {}
})

export const mutations = {

}

export const actions = {
  async getOrders ({ commit }) {
    try {
      const data = await this.$axios.post('api/v1/ordersSearch')
      return data.data
    } catch (e) {
      return e.response.data.message
    }
  }
}

export const getter = {}
