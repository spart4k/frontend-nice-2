export const state = () => ({
  user: {
    email: '',
    nickname: '',
    id: '',
    phone: '',
    fullname: ''
  },
  abilities: [],
  adress: [],
  selectedAddress: '',
  selectedAddressIndex: 0,
  token: '',
  tokenSecond: '',
  authorizated: false,
  showLogin: false
})

export const mutations = {
  setUserData (state) {
    const user = localStorage.getItem('user')
    if (user) {
      state.user = JSON.parse(user)
    }
  },
  setUserAbilities (state, value) {
    state.abilities = value
  },
  setToken (state) {
    const token = localStorage.getItem('token')
    if (token) {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
      state.token = token
      state.tokenSecond = token
      state.authorizated = true
    }
  },
  setLogout (state) {
    state.user = {}
    state.authorizated = false
  },
  showLogin (state, value) {
    state.showLogin = value
  },
  setUserInfo (state, value) {
    state.user.email = value.email
    state.user.nickname = value.nickname
    state.user.phone = value.phone
    if (value.link) {
      state.user.fullname = value.link
    }
    if (value.id) {
      state.user.id = value.id
    }
  },
  loadUserAdress (state, value) {
    state.adress.push(value)
  },
  setUserFullname (state, value) {
    state.user.fullname = value
  },
  addUserAdress (state, value) {
    state.adress[0].push(value)
  },
  removeUserAdress (state, value) {
    if (state.adress[0][value] === state.selectedAddress) {
      state.adress[0].splice(value, 1)
      state.selectedAddress = state.adress[0][0]
      state.selectedAddressIndex = 0
    } else {
      state.adress[0].splice(value, 1)
    }
  },
  setSelectedAddress (state, value) {
    state.selectedAddress = value
  },
  setSelectedAddressIndex (state, value) {
    state.selectedAddressIndex = value
  }
}

export const actions = {
  async getSms ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/user/auth', { phone: params })
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 82`, { position: 'bottom-right', icon: true })
      return e.response.data.message
    }
  },
  async register (store, params) {
    try {
      const data = await this.$axios.post('api/v1/register', params)
      this.$toast.success('Вы успешно зарегистрировались, проверьте свою почту', { position: 'bottom-right', icon: true })
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 92`, { position: 'bottom-right', icon: true })
      return e.response.data.message
    }
  },
  async login ({ commit }, params) {
    try {
      const res = await this.$axios.post('api/v1/login', params)
      if (res.status === 200) {
        this.$toast.success('Вы успешно авторизовались', { position: 'bottom-right', icon: true })
        commit('setUserInfo', res.data.data)
        localStorage.setItem('token', res.data.data.access_token)
        setTimeout(() => {
          commit('setToken')
        }, 300)
      }
      return res
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 109`, { position: 'bottom-right', icon: true })
      return e.response
    }
  },
  async logout ({ commit }) {
    try {
      const res = await this.$axios('api/v1/logout/current')
      if (res.status === 200) {
        await localStorage.removeItem('token')
        commit('setBasket', [])
        commit('changeBasketSum', 0)
        // await localStorage.removeItem('user')
        // this.$toast.success('Вы вышли из аккаунта', { position: 'bottom-right', icon: true })
        commit('setLogout')
      }
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 125`, { position: 'bottom-right', icon: true })
      return e.response.data.message
    }
  },
  async resetPassword ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/resetPassword', params)
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 134`, { position: 'bottom-right', icon: true })
      return e.response.data.message
    }
  },
  async sendCode ({ commit }, params) {
    try {
      const res = await this.$axios.post('api/v1/user/sms_code', params)
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      commit('setToken', res.data.access_token)
      commit('setUserData', res.data.user)
      this.$toast.success('Вы успешно вошли', { position: 'bottom-right', icon: true })
      return res
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 148`, { position: 'bottom-right', icon: true })
      return e.response.data
    }
  },
  async editUserData ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/editUserData', params)
      if (!data.data.error) {
        this.$toast.success(data.data.data, { position: 'bottom-right', icon: true })
        return data.data
      }
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 160`, { position: 'bottom-right', icon: true })
      return e.response.data.message
    }
  },
  async verifyToken ({ commit }, params) {
    try {
      const response = await this.$axios('api/v1/verifyToken')
        commit('setUserInfo', response.data.data.user)
      commit('loadUserAdress', response.data.data.addresses)
      commit('setUserAbilities', response.data.data.abilities)
      return response.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 171`, { position: 'bottom-right', icon: true })
      return e.response.data
    }
  },
  async addAdress ({ commit }, params) {
    try {
      const res = await this.$axios.post('api/v1/addAddress', params)
      commit('addUserAdress', res.data.data)
      return res.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 181`, { position: 'bottom-right', icon: true })
      return e.response.data.message
    }
  },
  async removeAdress ({ commit }, params) {
    try {
      const res = await this.$axios(`api/v1/deleteAddress/${params}`)
      return res.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, auth: 190`, { position: 'bottom-right', icon: true })
      return e.response.data.message
    }
  }
}

export const getter = {}
