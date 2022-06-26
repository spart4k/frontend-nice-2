export default function ({ from, route, store }) {
  const storeSections = store.state.content.sections
  const id = Number(route.params.id)
  const find = storeSections.find(item => Number(item.id) === id)
  if (route.params.cards === 'cards' && from) {
    store.commit('content/changeBgDetail', from.name)
  }
}
