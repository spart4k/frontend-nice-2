export const state = () => ({
  user: {},
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
      state.authorizated = true
      state.token = token
    }
  },
  setLogout (state) {
    state.user = {}
    state.authorizated = false
  },
  showLogin (state, value) {
    state.showLogin = value
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
  async register ({ commit }, params) {
    try {
      const data = await this.$axios.post('api/v1/register', params)
      return data
    } catch (e) {
      return e.response.data.message
    }
  },
  async login ({ commit }, params) {
    try {
      const res = await this.$axios.post('api/v1/login', params)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.data.access_token)
        commit('setToken')
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
        await localStorage.removeItem('user')
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
  }
}

export const getter = {}
