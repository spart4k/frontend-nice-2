export const state = () => ({})

export const mutations = {}

export const actions = {
  async getData (state, params) {
    try {
      const data = await this.$axios.post('api/v1/cardsSearch', params)
      console.log(data.data)
      return data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.response.data.message}`, { position: 'bottom-right', icon: true })
      console.log(e)
    }
  },
  async getSeo (state, params) {
    try {
      const data = await this.$axios.get('api/v1/GetMainSeo')
      return data
    } catch (e) {
      // this.$toast.error(`Ошибка: ${e.response.data.message}`, { position: 'bottom-right', icon: true })
      console.log(e)
    }
  }
}

export const getter = {}
