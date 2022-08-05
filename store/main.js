export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    try {
      this.$axios.defaults.headers.common.Authorization = 'Bearer 2|TeUVUgPl8axidfScynskYjPgeJRzCdxXcyIqDINY'
      const data = await this.$axios('api/v1/cards/main', { params })
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
