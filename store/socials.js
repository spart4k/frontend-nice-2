export const state = () => ({})

export const mutations = {}

export const actions = {
  async addLike (state, id) {
    try {
      const data = await this.$axios.get(`api/v1/likeInc/${id}`)
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}`, { position: 'bottom-right', icon: true })
      console.log(e)
    }
  },
  async removeLike (state, id) {
    try {
      const data = await this.$axios.get(`api/v1/likeDec/${id}`)
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}`, { position: 'bottom-right', icon: true })
      console.log(e)
    }
  },
  async addComment (state, params) {
    try {
      const data = await this.$axios.post('api/v1/comment/add', params)
      return data.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}`, { position: 'bottom-right', icon: true })
      console.log(e)
    }
  },
  async getStickers (state, params) {
    try {
      const data = await this.$axios.post('api/v1/simpleSearch', params)
      return data.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}`, { position: 'bottom-right', icon: true })
      console.log(e)
    }
  }
}

export const getter = {}
