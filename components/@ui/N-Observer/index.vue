<template>
  <div class="observer" />
</template>

<script>
// import { onMounted, ref } from '@nuxtjs/composition-api'
export default {
name: 'NObserver',
  props: ['options'],
  data: () => ({
    observer: null
  }),
  mounted () {
    const observerOptions = this.options || {}
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect')
      }
    }, observerOptions)

    this.observer.observe(this.$el)
  },

  destroyed () {
    this.observer.disconnect()
  }

// name: 'NObserver',
// props: {
//     options: {
//     }
// },
// setup (props, ctx) {
//     const observer = ref(null)
//     const { emit } = ctx

//     onMounted(() => {
//         const observerOptions = props.options || {}
//         observer.value = new IntersectionObserver(([entry]) => {
//             if (entry && entry.isIntersecting) {
//                 emit('intersect')
//             }
//         }, observerOptions)

//         observer.observe(this.$el)
//     })

//     return {
//         observer
//     }
// }
}
</script>
