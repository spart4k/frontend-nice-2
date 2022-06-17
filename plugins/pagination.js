import { ref } from '@nuxtjs/composition-api'

export const pagination = (request) => {
  const page = ref(1)
  // const totalPages = ref(1)
  const dataPagination = ref([])
  const getData = ($state, totalPages) => {
    page.value += 1
    if (totalPages >= page.value) {
      request(page.value).then(({ data }) => {
        if (data.data.length) {
          dataPagination.value = [...data.data]
          $state.loaded()
        }
      })
    } else {
      $state.complete()
    }
  }

  return {
    page,
    dataPagination,
    getData
  }
}
