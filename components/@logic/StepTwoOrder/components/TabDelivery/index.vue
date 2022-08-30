<template>
  <div>
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
          mask="+7(###)#######"
          placeholder="+7(777)7777777 "
          :error="$errors.phone[0]"
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
    <div :class="$style.addressWrapper">
      <h4 :class="$style.title">
        Адрес
      </h4>
      <n-row :class="$style.addressText">
        443110 Самара, ул. Полевая, д. 45, кв.112
      </n-row>
      <n-button
        type-button="transparent"
        :class="$style.btnChangeAddress"
        color="#C83F8E"
        @click="$emit('toAddress', true);$emit('changeStep', 'increment')"
      >
        Изменить адрес
      </n-button>
    </div>
    <n-row>
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
      <!-- <n-button
        :class="$style.btn"
        :type-button="'pink'"
        :disabled="$v.$invalid && $touched"
        @click="submit;$emit('toAddress', false)"
      >
        Оплатить онлайн
      </n-button> -->
      <style>.tinkoffPayRow{display:block;margin:1%;width:160px;}</style>
      <script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js" />
      <form name="TinkoffPayForm" onsubmit="pay(this); return false;">
        <input class="tinkoffPayRow" type="hidden" name="terminalkey" value="1658916651586DEMO">
        <input class="tinkoffPayRow" type="hidden" name="frame" value="true">
        <input class="tinkoffPayRow" type="hidden" name="language" value="ru">
        <input class="tinkoffPayRow" type="text" placeholder="Сумма заказа" name="amount" required>
        <input class="tinkoffPayRow" type="text" placeholder="Номер заказа" name="order">
        <input class="tinkoffPayRow" type="text" placeholder="Описание заказа" name="description">
        <input class="tinkoffPayRow" type="text" placeholder="ФИО плательщика" name="name">
        <input class="tinkoffPayRow" type="text" placeholder="E-mail" name="email">
        <input class="tinkoffPayRow" type="text" placeholder="Контактный телефон" name="phone">
        <input class="tinkoffPayRow" type="submit" value="Оплатить">
      </form>
      <NPersonalConsent />
    </n-row>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
