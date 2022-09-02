export const state = () => ({
  basket: [],
  basketLength: 0,
  basketSum: 0
})

export const mutations = {
  setBasket (state, value) {
    state.basket = value
    // let qty = 0
    // value.data.cards.forEach((card) => {
    //   qty += card.pivot.quantity
    // })
    // state.basketLength = qty
  },
  setBasketSum (state, value) {
    state.basketSum = value
  },
  changeBasketSum (state, value) {
    state.basketSum = value
  },
  addToBasket (state, value) {
    state.basket.forEach((item, index) => {
      if (item.pivot.card_id === value.pivot.card_id) {
        state.basket.splice(index, 1)
      }
    })
    state.basket.push(value)
  },
  removeFromBasket (state, value) {
    state.basket.splice(value, 1)
  }
}

export const actions = {
  async addBasket ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/basket/add', params)
      commit('setBasket', data)
      if (!params.calc) {
        this.$toast.success('Товар добавлен в корзину', { position: 'bottom-right', icon: true })
      }
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async getBasket ({ commit, rootState }) {
    try {
      if (rootState.authentication.authorizated) {
        const response = await this.$axios('api/v1/getBasket')
        commit('setBasket', response.data.data.cards)
        commit('changeBasketSum', response.data.data.cards_sum)
        return response
      }
    } catch (e) {
      console.log(e)
    }
  },
  async sendBasket ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/basket/send')
      this.$toast.success('Вы успешно вошли', { position: 'bottom-right', icon: true })
      commit('setBasket', data)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async addToBasket ({ commit, state }, params) {
    try {
      const response = await this.$axios.post('api/v1/addToBasket', params)
      commit('addToBasket', response.data.data[0])
      commit('setBasketSum', response.data.data[1])
      return response
    } catch (e) {
      console.log(e)
    }
  },
  async deleteFromBasket ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/deleteFromBasket', params)
      if (data.data.data) {
        commit('setBasketSum', data.data.data)
      }
      return data.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
