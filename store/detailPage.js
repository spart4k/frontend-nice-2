export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, id = 0) {
    try {
      const data = await this.$axios(`api/v1/card/${id}`)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async getComments (state, params) {
    try {
      const data = await this.$axios.post('api/v1/commentSearch', params)
      return data.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
