export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    const data = await this.$axios.post('api/v1/cardsSearch', { params })
    // console.log(data.data.data)
    return data.data.data
  }
}

export const getter = {}
