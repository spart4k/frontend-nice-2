export const head = (useMeta, pageInfo) => {
  console.log(pageInfo)
    if (pageInfo) {
      useMeta(() => ({
        title: pageInfo.seo_title,
        meta: [{
          hid: 'description',
          name: 'description',
          content: pageInfo.seo_description
        }]
      }))
    }
}
