<template>
  <div>
    <Row title="title">
      Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал
    </Row>
    <Row title="title">
      Фамилия Обломов не связана со словом «облом». 5 фактов о литературе из школьной программы, которых вы не знал
    </Row>
    <Row title="title">
      <N-Author name="Алексей Ельцин" />
    </Row>
    <Row title="title">
      <N-Icon name="plus" />
      <N-Icon name="message" />
      <N-Icon name="minus" />
    </Row>
  </div>
</template>
<script>
import Row from './components/row/index'
export default {
  name: 'StoryBook',
  components: {
    Row
  }
}
</script>
<style lang="scss" module>
.storybook {
  display: flex;
  flex-direction: column;
}
</style>
