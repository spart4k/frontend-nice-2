export const state = () => ({})

export const mutations = {}

export const actions = {
  async getSms (state, params) {
    try {
      console.log(params)
      const data = await this.$axios.post('api/v1/user/auth', { phone: params })
      console.log(data)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async sendCode (state, params) {
    try {
      console.log(params)
      const data = await this.$axios.post('api/v1/user/auth', { code: params })
      console.log(data)
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
