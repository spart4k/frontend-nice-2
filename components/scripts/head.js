export const head = (useMeta, metaInfo) => {
    if (metaInfo) {
      console.log(metaInfo)
      useMeta(() => ({
        title: metaInfo.seo_title,
        meta: [{
          hid: 'description',
          name: 'description',
          content: metaInfo.seo_description
        }]
      }))
    }
}
