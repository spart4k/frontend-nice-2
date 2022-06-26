export const head = (useMeta, pageInfo) => {
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
