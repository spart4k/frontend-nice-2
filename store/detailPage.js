export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, id = 0) {
    try {
      const data = await this.$axios(`api/v1/cards/${id}`)
      console.log(id, 'teeee')
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const getter = {}
