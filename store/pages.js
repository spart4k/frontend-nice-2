export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    const data = await this.$axios.post('api/v1/cardsSearch', params)
    return data.data.data
  },
  async getAuthorById (state, params) {
    const data = await this.$axios(`api/v1/getAuthorById/${params.id}`)
    return data.data.data
  }
}

export const getter = {}
