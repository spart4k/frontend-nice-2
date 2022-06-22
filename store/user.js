export const state = () => ({
  orders: {}
})

export const mutations = {

}

export const actions = {
  async changeUserInfo ({ commit }, params) {
    console.log(params)
    try {
      const data = await this.$axios.put('api/v1/user', params.value)
      return data
    } catch (e) {
      return e.response.data.message
    }
  }
}

export const getter = {}
