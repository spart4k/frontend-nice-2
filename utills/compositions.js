// import { ref, watch } from '@vue/composition-api'

// import _throttle from 'lodash/throttle'
// import _unionBy from 'lodash/unionBy'

/**
 * @param request - request from useRequest composition
 * @param perPage - rows per page
 * @param data - default data value
 * @param append - append to rows
 * @param initial - make first request
 * @param throttle - throttle time for updateData function
 * @returns {{total: Ref<UnwrapRef<number>>, totalPages: Ref<UnwrapRef<number>>, pageSize: Ref<UnwrapRef<number>>, page: Ref<UnwrapRef<number>>}}
 */
// const usePagination = ({
//   request, perPage = 10, data = {}, append = false, initial = true, throttle = false
// }) => {
//   const page = ref(1)
//   const pageSize = ref(perPage)
//   const total = ref(0)
//   const totalPages = ref(0)
//   const rows = ref([])
//   const dataValue = ref(data)
//
//   const allData = ref()
//
//   const init = async (clear) => {
//     if (append && request.loading.value) { return null }
//
//     const res = await request({ ...dataValue.value, page: page.value, pageSize: pageSize.value })
//
//     if (clear) { rows.value = [] }
//
//     page.value = res.page
//     pageSize.value = res.pageSize
//     total.value = res.total
//     totalPages.value = res.totalPages
//     allData.value = res
//
//     rows.value = append ? _unionBy(rows.value, res.rows, '_id') : res.rows
//
//     return res
//   }
//   const reset = () => {
//     if (page.value !== 1) {
//       page.value = 1
//     }
//
//     init(true)
//   }
//   watch(() => page.value, () => init())
//   watch(() => dataValue.value, () => reset(), { deep: true })
//
//   if (initial) {
//     init()
//   }
//
//   let updateData = (value) => {
//     dataValue.value = value
//   }
//
//   if (throttle) {
//     updateData = _throttle(updateData, 500, { leading: false, trailing: true })
//   }
//
//   return {
//     page,
//     pageSize,
//     total,
//     totalPages,
//     request,
//     allData,
//     data: dataValue,
//     rows,
//     reset,
//     updateData
//   }
// }

const usePagination = (request) => {
  // const page = ref(1)
}

export default usePagination
