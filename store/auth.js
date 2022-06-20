export const state = () => ({
  user: {},
  token: ''
})

export const mutations = {
  setUserData (state, user) {
    localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
  setToken (state, token) {
    localStorage.setItem('token', token)
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
    state.token = token
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
  async sendCode ({ commit }, params) {
    try {
      console.log(params)
      const res = await this.$axios.post('api/v1/user/sms_code', params)
      console.log(res)
      console.log(res.data.access_token)
      commit('setToken', res.data.access_token)
      commit('setUserData', res.data.user)
      return res
    } catch (e) {
      return e.response.data
    }
  }
}

export const getter = {}
