export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, id = 0) {
    try {
      const data = await this.$axios(`api/v1/card/${id}`)
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, detailPage: 19`, { position: 'bottom-right', icon: true })
    }
  },
  async getComments (state, params) {
    try {
      const data = await this.$axios.post('api/v1/commentSearch', params)
      return data.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, detailPage: 19`, { position: 'bottom-right', icon: true })
    }
  }
}

export const getter = {}
