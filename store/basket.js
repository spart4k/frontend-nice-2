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
      this.$toast.success('Товар добавлен в корзину', { position: 'bottom-right', icon: true })
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async getBasket ({ commit, rootState }) {
    try {
      if (rootState.authentication.authorizated) {
        const data = await this.$axios('api/v1/basket')
        commit('setBasket', data)
        return data
      }
    } catch (e) {
      console.dir(e)
    }
  },
  async sendBasket ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/basket/send')
      commit('setBasket', data)
      this.$toast.success('Успешно', { position: 'bottom-right', icon: true })
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
