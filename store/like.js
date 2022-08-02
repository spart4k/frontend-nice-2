export const state = () => ({})

export const mutations = {}

export const actions = {
    async addLike (state, id) {
        try {
            this.$axios.defaults.headers.common.Authorization = 'Bearer 2|TeUVUgPl8axidfScynskYjPgeJRzCdxXcyIqDINY'
            const data = await this.$axios.get(`api/v1/likeInc/${id}`)
            return data
    } catch (e) {
      console.log(e)
    }
    },
    async removeLike (state, id) {
        try {
            this.$axios.defaults.headers.common.Authorization = 'Bearer 2|TeUVUgPl8axidfScynskYjPgeJRzCdxXcyIqDINY'
            const data = await this.$axios.get(`api/v1/likeDec/${id}`)
            return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
