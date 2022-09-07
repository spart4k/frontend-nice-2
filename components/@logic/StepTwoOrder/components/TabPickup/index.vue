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
        <!-- <n-text-field
          v-model="formData.name"
          :error="$errors.name[0]"
          placeholder="Введите ФИО"
          title="ФИО"
          :color-border="'pinkBorder'"
        /> -->
      </n-row>
      <n-row>
        <!-- <n-text-field
          v-model="formData.phone"
          :error="$errors.phone[0]"
          mask="+7(###)#######"
          placeholder="+7(777)7777777 "
          title="Телефон"
          :color-border="'pinkBorder'"
        /> -->
      </n-row>
      <n-row>
        <!-- <n-text-field
          v-model="formData.email"
          :error="$errors.email[0]"
          placeholder="Введите ваш еmail"
          title="Email"
          :color-border="'pinkBorder'"
        /> -->
      </n-row>
    </form>
    <n-row>
      <h4 :class="$style.title">
        Состав заказа
      </h4>
      <n-basket-row v-for="(item, index) in basketData" :key="index" :item="item" readonly />
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
            {{ basketPrice }} р.
          </div>
        </div>
        <div :class="$style.col">
          <div :class="$style.col__left">
            Стоимость доставки
          </div>
          <div :class="$style.col__right">
            0 р.
          </div>
        </div>
        <div :class="$style.col">
          <div :class="$style.col__left">
            Скидка
          </div>
          <div :class="$style.col__right">
            0 р.
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
      :type-button="'pink'"
      :disabled="$v.$invalid && $touched"
      @click="$emit('toAddress', false);$emit('changeStep', 'increment')"
    >
      Оплатить онлайн
    </n-button>
    <!-- <script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js" />
    <form name="TinkoffPayForm">
      <input class="tinkoffPayRow" type="hidden" name="receipt" value="">
      <input class="tinkoffPayRow" type="hidden" name="terminalkey" value="1658916651586DEMO">
      <input class="tinkoffPayRow" type="hidden" name="frame" value="true">
      <input class="tinkoffPayRow" type="hidden" name="language" value="ru">
      <input v-model="tinkoffPrice" type="hidden" class="tinkoffPayRow" name="amount">
      <input v-model="orderId" class="tinkoffPayRow" type="hidden" placeholder="Номер заказа" name="order">
      <input v-model="opis" class="tinkoffPayRow" type="hidden" placeholder="Описание заказа" name="description">
      <input v-model="fio" class="tinkoffPayRow" type="hidden" placeholder="ФИО плательщика" name="name">
      <input v-model="formData.email" class="tinkoffPayRow" type="hidden" placeholder="E-mail" name="email">
      <input v-model="telef" class="tinkoffPayRow" type="hidden" placeholder="Контактный телефон" name="phone">
      <input
        ref="tinkoffPay"
        :class="$style.hiddenButton"
        class="tinkoffPayRow"
        onclick="tinkoffPayFunction(this)"
        type="submit"
        value="Оплатить"
      >
    </form> -->
    <!-- <script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js"></script>
<form name="TinkoffPayForm">
  <input class="tinkoffPayRow" type="hidden" name="receipt" value="">
  <input class="tinkoffPayRow" type="hidden" name="terminalkey" value="1658916651586DEMO">
  <input class="tinkoffPayRow" type="hidden" name="frame" value="true">
  <input class="tinkoffPayRow" type="hidden" name="language" value="ru">
    <input class="tinkoffPayRow" type="text" placeholder="Сумма заказа" name="amount" required>
    <input class="tinkoffPayRow" type="text" placeholder="Номер заказа" name="order">
    <input class="tinkoffPayRow" type="text" placeholder="Описание заказа" name="description">
    <input class="tinkoffPayRow" type="text" placeholder="ФИО плательщика" name="name">
    <input class="tinkoffPayRow" type="text" placeholder="E-mail" name="email">
    <input class="tinkoffPayRow" type="text" placeholder="Контактный телефон" name="phone">
    <input class="tinkoffPayRow" type="button" onclick="tinkoffPayFunction(this)" value="Оплатить">
</form>
    <script type="text/javascript">
  function tinkoffPayFunction(target) {
            let form = target.parentElement;
            let name = form.description.value || "Оплата";
            let amount = form.amount.value;
            let email = form.email.value;
            let phone = form.phone.value;

            if (amount && email && phone) {
                form.receipt.value = JSON.stringify({
                    "Email": email,
                    "Phone": phone,
                    "EmailCompany": "mail@mail.com",
                    "Taxation": "patent",
                    "Items": [
                        {
                            "Name": name,
                            "Price": amount + '00',
                            "Quantity": 1.00,
                            "Amount": amount + '00',
                            "PaymentMethod": "full_prepayment",
                            "PaymentObject": "service",
                            "Tax": "none"
                        }
                    ]
                });
                pay(form);
            } else alert("Не все обязательные поля заполнены")
            console.log(form.receipt.value)
            return false;
        }
    </script> -->
    <NPersonalConsent />
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
