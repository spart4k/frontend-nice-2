export const state = () => ({
  orders: {}
})

export const mutations = {

}

export const actions = {
  async changeUserInfo ({ commit }, params) {
    try {
      const data = await this.$axios.put('api/v1/user', params)
      return data
    } catch (e) {
      return e.response.data.message
    }
  }
}

export const getter = {}
