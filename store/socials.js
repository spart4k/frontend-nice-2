export const state = () => ({})

export const mutations = {}

export const actions = {
  async addLike (state, id) {
    try {
      const data = await this.$axios.get(`api/v1/likeInc/${id}`)
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, store: 11`, { position: 'bottom-right', icon: true })
    }
  },
  async removeLike (state, id) {
    try {
      const data = await this.$axios.get(`api/v1/likeDec/${id}`)
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, store: 19`, { position: 'bottom-right', icon: true })
    }
  },
  async addComment (state, params) {
    try {
      const data = await this.$axios.post('api/v1/comment/add', params)
      return data.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, store: 27`, { position: 'bottom-right', icon: true })
    }
  },
  async getStickers (state, params) {
    try {
      const data = await this.$axios.post('api/v1/simpleSearch', params)
      return data.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}, store: 35`, { position: 'bottom-right', icon: true })
    }
  }
}

export const getter = {}
