export const state = () => ({
  orders: {}
})

export const mutations = {

}

export const actions = {
  async changeUserInfo ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/orders', params)
      return data
    } catch (e) {
      return e.response.data.message
    }
  }
}

export const getter = {}
