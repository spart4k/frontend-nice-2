export const state = () => ({
  basket: [],
  basketLength: 0
})

export const mutations = {
  setBasket (state, value) {
    state.basket = value
    let qty = 0
    value.data.cards.forEach((card) => {
      qty += card.pivot.quantity
    })
    state.basketLength = qty
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
      console.log(data, 'getVas')
      commit('setBasket', data)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async sendBasket ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/basket/send', params)
      commit('setBasket', data)
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
