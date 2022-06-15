export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, config) {
    const data = await this.$axios('api/v1/cards/main', config)
    return data
  }
}

export const getter = {}
