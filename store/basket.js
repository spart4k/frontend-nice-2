export const state = () => ({
  basket: [],
  basketLength: 0,
  basketSum: 0,
  lastOrder: ''
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
      if (item.pivot.card_id === value.pivot.card_id && item.pivot.details === value.pivot.details) {
        state.basket.splice(index, 1)
      }
    })
    state.basket.push(value)
  },
  removeFromBasket (state, value) {
    state.basket.splice(value, 1)
  },
  degreaseCountItem (state, value) {
    state.basket.forEach((item, index) => {
      if (item.pivot.card_id === value.card_id && item.pivot.details === value.details) {
        item.pivot.price -= value.price
        item.pivot.quantity -= value.quantity
        item.count += value.quantity
      }
    })
  },
  increaseCountItem (state, value) {
    state.basket.forEach((item, index) => {
      if (item.pivot.card_id === value.card_id && item.pivot.details === value.details) {
        item.pivot.price += value.price
        item.pivot.quantity += value.quantity
        item.count -= value.quantity
      }
    })
  },
  lastOrderChange (state, value) {
    state.lastOrder = value
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
      this.$toast.error(`Ошибка: ${e.response.data.message}, basket: 67`, { position: 'bottom-right', icon: true })
    }
  },
  async getBasket ({ commit, rootState }) {
    try {
      if (rootState.authentication.authorizated) {
        const response = await this.$axios('api/v1/getBasket')
        if (!response.data.error) {
          if (response.data.data.cards) {
            commit('setBasket', response.data.data.cards)
          }
          commit('changeBasketSum', response.data.data.cards_sum)
        }
        return response
      }
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, basket: 83`, { position: 'bottom-right', icon: true })
    }
  },
  async sendBasket ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/basket/send')
      this.$toast.success('Вы успешно вошли', { position: 'bottom-right', icon: true })
      commit('setBasket', data)
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, basket: 93`, { position: 'bottom-right', icon: true })
    }
  },
  async addToBasket ({ commit, state }, params) {
    try {
      const response = await this.$axios.post('api/v1/addToBasket', params)
      // commit('addToBasket', response.data.data[0])
      // commit('setBasketSum', response.data.data[1])
      return response.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, basket: 103`, { position: 'bottom-right', icon: true })
    }
  },
  async deleteFromBasket ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/deleteFromBasket', params)
      if (!data.data.error) {
        commit('setBasketSum', data.data.data)
      }
      return data.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, basket: 114`, { position: 'bottom-right', icon: true })
    }
  }
}

export const getter = {}
