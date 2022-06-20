export const state = () => ({
  basket: []
})

export const mutations = {
  setBasket (state, value) {
    state.basket = value
    console.log(value, 24315)
  }
}

export const actions = {
  async addBasket ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/basket/add', params)
      commit('setBasket', data)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async getBasket ({ commit }) {
    try {
      const data = await this.$axios('api/v1/basket')
      console.log(data)
      commit('setBasket', data)
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
