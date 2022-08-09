<template>
  <div>
    <h2 :class="$style.title">
      Мой профиль
    </h2>
    <div :class="$style.inputContainer">
      <N-Text-Field title="Ник" placeholder="Nice" type="text" color="#C83F8E" />
      <N-Text-Field title="Телефон" placeholder="Телефон" type="tel" color="#C83F8E" />
      <N-Text-Field title="Email" placeholder="mail@example.com" type="email" color="#C83F8E" />
      <template v-if="false">
        <N-Text-Field title="Адрес" placeholder="Город, улица, дом" type="text" color="#C83F8E" />
      </template>
      <template v-else>
        <div>
          <h3 :class="$style.inputTitle">
            Адрес
          </h3>
          <span :class="$style.address">
            443110 Самара, ул. Полевая, д. 45, кв.112
          </span>
          <N-Button :class="$style.noRegistered" type-button="wide" color="#C83F8E">
            Изменить адрес
          </N-Button>
        </div>
      </template>
    </div>
    <N-Button type-button="wide" background-color="#C83F8E">
      Сохранить
    </N-Button>
    <N-Button :class="$style.noRegistered" type-button="wide" color="#C83F8E">
      Выйти из профиля
    </N-Button>
    <N-Button :class="$style.noRegistered" type-button="wide" color="#C83F8E">
      История заказов
    </N-Button>
  </div>
</template>

<script>
// import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'NSheetRegister',
  props: {
  },
  setup () {
  return {
  }
  }
}
</script>

<style scoped lang="scss" module>
  .title {
    @include text-style-h2;
    color: $fontColorDefault;
    text-align: center;
    margin-top: 2.7rem;
  }
  .inputContainer{
    display: flex;
    flex-direction: column;
    margin: 2rem 0 2.5rem;
    gap: 2.5rem;
    .inputTitle {
        @include regular-text;
        color: $fontColorDefault;
        opacity: 0.5;
        margin-bottom: 1rem;
    }
    .address {
        @include regular-text;
        color: $fontColorDefault;
    }
  }
  .noRegistered {
    margin-top: 1rem;
  }
</style>
