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
    <div :class="$style.deliveryWrapper">
      <h4 :class="$style.title">
        Тип доставки
      </h4>
      <n-row>
        <div :class="$style.deliveryCheck">
          <div :class="$style.deliveryCheck__item">
            <!-- <input name="delivery" checked type="radio"> -->
            <label :class="$style.wireColor" :style="{ borderColor: deliveryValue === 'courier' ? '#C83F8E' : '#D9D9D9'}">
              <input name="delivery" type="radio" checked @change="deliveryChange('courier')">
              <span v-if="deliveryValue === 'courier'" :class="$style.checkmark" />
            </label>
            <div>
              Курьером
            </div>
          </div>
          <div :class="$style.deliveryCheck__item">
            <!-- <input name="delivery" type="radio"> -->
            <label :class="$style.wireColor" :style="{ borderColor: deliveryValue === 'pickup' ? '#C83F8E' : '#D9D9D9'}">
              <input name="delivery" type="radio" @change="deliveryChange('pickup')">
              <span v-if="deliveryValue === 'pickup'" :class="$style.checkmark" />
            </label>
            <div>
              Самовывоз<br> из пункта СДЭК
            </div>
          </div>
        </div>
      </n-row>
    </div>
    <div :class="$style.addressWrapper">
      <!-- <h4 :class="$style.title">
        Адрес
      </h4> -->
      <div :class="$style.city">
      <p :class="$style.subtitle">
        {{deliveryValue === 'courier' ? 'Адрес' : 'Список пунктов выдачи'}}
      </p>
      <v-select
        v-model="city"
        v-debounce:350ms="searchCity"
        :options="citiesArray"
        :class="$style.citySelect"
      >
        <template #no-options="{ }">
          Подождите.
        </template>
      </v-select>
      <n-text-field v-if="(deliveryValue === 'courier') && render" v-model="address" :class="$style.input" placeholder="Улица, дом, квартира" color="#C83F8E" />
      <v-select
        v-model="pickupPoint"
        v-else
        :options="pickupPointArray"
        :class="[$style.citySelect, (!city || pickupPointArray.length === 0) && $style.disabled]"
      >
        <template #no-options="{ }">
          Подождите.
        </template>
      </v-select>
    </div>
      <!-- <n-row v-if="selectedAddress" :class="$style.addressText">
        {{ selectedAddress.city.name }}, {{ selectedAddress.address }}
      </n-row>
      <n-row v-else-if="addressItem" :class="$style.addressText">
        {{ addressItem.city.name }}, {{ addressItem.address }}
      </n-row>
      <n-button
        type-button="transparent"
        :class="$style.btnChangeAddress"
        color="#C83F8E"
        @click="$emit('toAddress', true);$emit('changeStep', 'increment')"
      >
        Изменить адрес
      </n-button>
      <div v-if="$errors.address_id" :class="$style.errorAddress">
        {{ $errors.address_id[0] }}
      </div> -->
    </div>
    <n-row>
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
            <template>
              <div :class="$style.col__right">
                {{deliveryPrice && city ? `${deliveryPrice} р.`: 'Выберите город'}}
              </div>
            </template>
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
            {{ totalPrice }} р.
          </div>
        </div>
      </div>
      <n-button
        :class="$style.btn"
        :type-button="'pink'"
        :disabled="(!city || !noErrorCity || !(pickupPoint || address)) ? (!city || !noErrorCity ||  !(pickupPoint || address)) : $v.$invalid && $touched"
        @click="$emit('toAddress', false); submit($event)"
      >
        <template v-if="!loading">
          Оплатить онлайн
        </template>
        <template v-else>
          <n-loading />
        </template>
      </n-button>
      <!-- @click="submit;$emit('toAddress', false)" -->
      <form name="TinkoffPayForm" onsubmit="pay(this); return false;">
        <input class="tinkoffPayRow" type="hidden" name="terminalkey" value="1658916651586DEMO">
        <input class="tinkoffPayRow" type="hidden" name="frame" value="true">
        <input class="tinkoffPayRow" type="hidden" name="language" value="ru">
        <input v-model="tinkoffPrice" type="hidden" class="tinkoffPayRow" name="amount">
        <input v-model="orderId" class="tinkoffPayRow" type="hidden" placeholder="Номер заказа" name="order">
        <!-- <input v-model="formData.name" class="tinkoffPayRow" type="hidden" placeholder="Описание заказа" name="description"> -->
        <input v-model="formData.name" class="tinkoffPayRow" type="hidden" placeholder="ФИО плательщика" name="name">
        <input v-model="formData.email" class="tinkoffPayRow" type="hidden" placeholder="E-mail" name="email">
        <input v-model="formData.phone" class="tinkoffPayRow" type="hidden" placeholder="Контактный телефон" name="phone">
        <input
          ref="tinkoffPay"
          :class="$style.hiddenButton"
          class="tinkoffPayRow"
          type="submit"
          value="Оплатить"
        >
      </form>
      <script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js" />
      <NPersonalConsent />
    </n-row>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
