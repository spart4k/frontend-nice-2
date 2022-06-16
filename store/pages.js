export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, config) {
    const data = await this.$axios('api/v1/cards/filter', config)
    return data
  }
}

export const getter = {}
