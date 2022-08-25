export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    try {
      const data = await this.$axios.post('api/v1/cardsSearch', { params })
      console.log(data.data)
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
