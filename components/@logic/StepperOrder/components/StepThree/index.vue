<template>
  <div>
    <h3>Ваша корзина</h3>
    <ul>
      <n-basket-row :item="basketItem" />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StepOne',
  setup () {
    const basketItem = {
      title: 'Sprite',
      price: 3200,
      pivot: {
        quantity: 2
      },
      images: [
        { src: 'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs' }
      ]
    }
    return {
      basketItem
    }
  }
}
</script>

<style scoped>

</style>
