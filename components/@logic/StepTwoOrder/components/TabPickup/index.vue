<template>
  <div>
    <n-row>
      <h4 :class="$style.title">
        Самовывоз
      </h4>
      <div :class="$style.address">
        <div :class="$style.address__text">
          Россия, Нижний Новгород,  ул. Торговая, д. 14
        </div>
        <a href="#" :class="$style.address__link">С 8:00 до 19:00, студия Найс</a>
      </div>
    </n-row>
    <form :class="[$style.form, $style.row]">
      <n-row>
        <n-text-field
          v-model="formData.name"
          :error="$errors.name[0]"
          placeholder="Введите ФИО"
          title="ФИО"
          :color-border="'pinkBorder'"
        />
      </n-row>
      <n-row>
        <n-text-field
          v-model="formData.phone"
          :error="$errors.phone[0]"
          mask="+7(###)#######"
          placeholder="+7(777)7777777 "
          title="Телефон"
          :color-border="'pinkBorder'"
        />
      </n-row>
      <n-row>
        <n-text-field
          v-model="formData.email"
          :error="$errors.email[0]"
          placeholder="Введите ваш еmail"
          title="Email"
          :color-border="'pinkBorder'"
        />
      </n-row>
    </form>
    <n-row>
      <h4 :class="$style.title">
        Состав заказа
      </h4>
      <N-Basket-row :item="basketItem" readonly />
    </n-row>
    <n-row>
      <h4 :class="$style.title">
        Способ оплаты
      </h4>
      <ul :class="$style.paymentList">
        <n-payment-methods
          v-for="item in paymentsMethodSelect"
          :key="item.text"
          :item="item"
          :active="activePayment === item.value"
          @click="activePayment = item.value"
        />
      </ul>
    </n-row>
    <div :class="$style.orders">
      <h4 :class="[$style.orders__title, $style.titleBig]">
        Ваш заказ
      </h4>
      <div :class="$style.cols">
        <div :class="$style.col">
          <div :class="$style.col__left">
            Товары
          </div>
          <div :class="$style.col__right">
            3 500 р.
          </div>
        </div>
        <div :class="$style.col">
          <div :class="$style.col__left">
            Стоимость доставки
          </div>
          <div :class="$style.col__right">
            3 500 р.
          </div>
        </div>
        <div :class="$style.col">
          <div :class="$style.col__left">
            Скидка
          </div>
          <div :class="$style.col__right">
            3 500 р.
          </div>
        </div>
      </div>
      <div :class="$style.total">
        <div :class="[$style.total__text, $style.titleBig]">
          Итого
        </div>
        <div :class="$style.total__sum">
          4 500 р.
        </div>
      </div>
    </div>
    <n-button
      :class="$style.btn"
      :disabled="$v.$invalid && $touched"
      :type-button="'pink'"
      @click="() => submit()"
    >
      Оплатить онлайн
    </n-button>
    <NPersonalConsent />
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
