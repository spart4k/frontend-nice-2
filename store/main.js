export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, config) {
    try {
      const data = await this.$axios('api/v1/cards/main', config)
      console.log(data)
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
