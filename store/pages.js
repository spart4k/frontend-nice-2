export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    const data = await this.$axios('api/v1/cards/filter', { params })
    return data
  }
}

export const getter = {}
