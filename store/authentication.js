export const state = () => ({
  user: {
    email: '',
    nickname: '',
    id: '',
    phone: ''
  },
  adress: [],
  token: '',
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
  setToken (state) {
    const token = localStorage.getItem('token')
    if (token) {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
      state.token = token
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
    state.user.id = value.id
  },
  loadUserAdress (state, value) {
    state.adress.push(value)
  },
  addUserAdress (state, value) {
    state.adress[0].push(value)
  },
  removeUserAdress (state, value) {
    state.adress[0].splice(value, 1)
  }
}

export const actions = {
  async getSms ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/user/auth', { phone: params })
      return data
    } catch (e) {
      return e.response.data.message
    }
  },
  async register (store, params) {
    try {
      const data = await this.$axios.post('api/v1/register', params)
      this.$toast.success('Вы успешно зарегистрировались, проверьте свою почту', { position: 'bottom-right', icon: true })
      return data
    } catch (e) {
      return e.response.data.message
    }
  },
  async login ({ commit }, params) {
    try {
      const res = await this.$axios.post('api/v1/login', params)
      if (res.status === 200) {
        commit('setUserInfo', res.data.data)
        localStorage.setItem('token', res.data.data.access_token)
        setTimeout(() => {
          commit('setToken')
        }, 300)
      }
      return res
    } catch (e) {
      return e.response
    }
  },
  async logout ({ commit }) {
    try {
      const res = await this.$axios('api/v1/logout/current')
      if (res.status === 200) {
        await localStorage.removeItem('token')
        // await localStorage.removeItem('user')
        // this.$toast.success('Вы вышли из аккаунта', { position: 'bottom-right', icon: true })
        commit('setLogout')
      }
    } catch (e) {
      return e.response.data.message
    }
  },
  async resetPassword ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/resetPassword', params)
      return data
    } catch (e) {
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
      return e.response.data
    }
  },
  async getUserInfo ({ commit }, params) {
    try {
      const res = await this.$axios.get('api/v1/user', params)
      localStorage.setItem('user', JSON.stringify(res.data))
      commit('setUserData', res.data)
      return res
    } catch (e) {
      return e.response.data.message
    }
  },
  async verifyToken ({ commit }, params) {
    try {
      const response = await this.$axios('api/v1/verifyToken')
      commit('setUserInfo', response.data.data[0])
      commit('loadUserAdress', response.data.data[1])
    } catch (e) {
      return e.response.data.message
    }
  },
  async addAdress ({ commit }, params) {
    try {
      const res = await this.$axios.post('api/v1/addAddress', params)
      commit('addUserAdress', res.data.data)
      return res.data
    } catch (e) {
      return e.response.data.message
    }
  },
  async removeAdress ({ commit }, params) {
    try {
      const res = await this.$axios(`api/v1/deleteAddress/${params}`)
      return res.data
    } catch (e) {
      return e.response.data.message
    }
  }
}

export const getter = {}
