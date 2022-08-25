export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    // this.$axios.defaults.headers.common.Authorization = 'Bearer 2|TeUVUgPl8axidfScynskYjPgeJRzCdxXcyIqDINY'
    const data = await this.$axios('api/v1/cards/filter', { params })
    return data.data
  }
}

export const getter = {}
