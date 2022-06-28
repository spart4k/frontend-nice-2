export const head = (useMeta, pageInfo) => {
  console.log(pageInfo)
    if (pageInfo) {
      useMeta(() => ({
        title: pageInfo.value.seo_title,
        descrp: pageInfo.value.seo_description
      }))
    }
}
