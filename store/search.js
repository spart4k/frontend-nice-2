export const state = () => ({
})

export const mutations = {
}

export const actions = {
    async searchCards (store, params) {
        try {
            const res = await this.$axios.post('api/v1/cardsSearch', params)
            return res.data
        } catch (e) {
            this.$toast.error(`Ошибка: ${e.response.data.message}`, { position: 'bottom-right', icon: true })
            return e.response.res.message
        }
    },
    async searchCities (store, params) {
        try {
            const res = await this.$axios.post('api/v1/simpleSearch', params)
            return res.data
        } catch (e) {
            this.$toast.error(`Ошибка: ${e.response.data.message}`, { position: 'bottom-right', icon: true })
            return e.response.res.message
        }
    }
}

export const getter = {}
