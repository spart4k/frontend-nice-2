export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, id = 0) {
    try {
      this.$axios.defaults.headers.common.Authorization = 'Bearer 2|TeUVUgPl8axidfScynskYjPgeJRzCdxXcyIqDINY'
      const data = await this.$axios(`api/v1/cards/${id}`)
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
