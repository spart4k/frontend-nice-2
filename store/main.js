export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    try {
      const data = await this.$axios.post('api/v1/cardsSearch', { params })
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
