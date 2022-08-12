<template>
  <div :class="$style.container">
    <h3 :class="$style.title">
      Адрес
    </h3>
    <ul :class="$style.list">
      <li
        v-for="item in addressItem"
        :key="item.value"
        :class="[$style.item, currentItem === item.value && $style.active]"
        @click="currentItem = item.value"
      >
        <div>
          {{ item.title }}
        </div>
        <n-button type-button="transparent" @click="removeItem(item.value)">
          <n-icon name="delete" />
        </n-button>
      </li>
    </ul>
    <n-row>
      <n-select
        title="Адрес"
        :color-border="'pinkBorder'"
        :select-items="selectItems"
        :position-arrow="{
          right: 0,
        }"
        has-border-bottom
        :class="$style.form__select"
      />
    </n-row>
    <n-row>
      <n-text-field placeholder="Улица, дом, квартира" :color-border="'pinkBorder'" />
    </n-row>
    <n-button
      :class="$style.btn"
      :type-button="'pink'"
      @click="$emit('addAddress')"
    >
      Добавить
    </n-button>
    <n-button
      :class="$style.btnBack"
      color="#C83F8E"
      :type-button="'transparent'"
      @click="$emit('closedMenu')"
    >
      Назад
    </n-button>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import NButton from '~/components/@ui/N-Button'
export default {
  name: 'ChangeAddress',
  components: { NButton },
  setup () {
    const currentItem = ref(1)
    const addressItem = ref([
      { title: '443110 Самара, ул. Полевая, д. 45, кв.112 ', value: 1 },
      { title: '443110 Самара, ул. Полевая, д. 45, кв.11244 ', value: 2 },
      { title: '443110 Самара, ул. Полевая, д. 45, кв.112 ', value: 3 }
    ])
    const selectItems = [
      { text: 'Нижний Новгород', value: 1 },
      { text: 'Samara', value: 2 }
    ]
    const removeItem = (value) => {
      addressItem.value = addressItem.value.filter(item => item.value !== value)
    }
    return {
      addressItem,
      selectItems,
      currentItem,
      removeItem
    }
  }
}
</script>

<style lang="scss" module>
.container {
  overflow: auto;
  height: 100%;
  @include paddings;
  color: $fontColorDefault;
}
.title {
  text-align: center;
  @include text-style-h2;
  margin-bottom: 2rem;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}

.list {
  margin-bottom: 2rem;
}
.item {
  width: 100%;
  background-color: $gray3;
  border-radius: 2rem;
  margin-bottom: 2rem;
  //height: 4.8rem;
  cursor: pointer;
  border: .2rem solid transparent;

  padding: 1.7rem 1.5rem;

  display: flex;
  justify-content: space-between;
  @include regular-text;
  transition: background-color .3s ease, color .3s ease, border .3s ease;
  &.active {
    background-color: transparent;
    border-color: $pink2;
    color: $pink2;
  }
}
.btn {
  width: 100%;
  margin-bottom: 2.5rem;
}
.btnBack {
  color: $pink2;
  width: 100%;
}
</style>
