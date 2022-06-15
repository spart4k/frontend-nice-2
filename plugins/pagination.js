import { ref } from '@nuxtjs/composition-api'

export const pagination = (request, arr) => {
  const page = ref(1)
  const totalPages = ref(1)
  const dataPagination = ref([])
  const getData = ($state) => {
    if (totalPages.value > page.value) {
      page.value += 1
      request(page.value).then(({ data }) => {
        if (data.data.length) {
          dataPagination.value = data.data
          arr.push(data)
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
