export const state = () => ({
  orders: {}
})

export const mutations = {

}

export const actions = {
  async getOrders ({ commit }) {
    try {
      const data = await this.$axios.get('api/v1/orders')
      return data.data
    } catch (e) {
      return e.response.data.message
    }
  }
}

export const getter = {}
