import { required as vueRequired, email as vueEmail } from '@vuelidate/validators'

const required = Object.assign({}, vueRequired, { $message: () => 'Обязательное поле' })
const email = Object.assign({}, vueEmail, { $message: () => 'Введите корректный email' })

const requiredIf = needValidation => ({
  ...required,
  $validator: (val) => {
    if (!needValidation()) { return true }
    return required.$validator(val)
  }
})

const phone = {
  $validator: val => val.length > 10,
  $message: () => 'Не менее 10 символов'
}

const sameAs = value => ({
  $validator: (val) => {
    try {
      return val === value()
    } catch (err) {
      return false
    }
  },
  $message: () => 'Пароли должны совпадать'
})

const password = {
  $validator: val => val.length > 7,
  $message: () => 'Не менее 7 символов'
}

// const isTrue = {
//   $validator: val => val === true,
//   $message: () => i18n.t('auth.validations.password.requiredField'),
// }

// const slugRegexp = /^[0-9a-zA-Z-_]+$/g

// const isSlug = {
//   $validator: val => val.match(slugRegexp) !== null,
//   $message: () => i18n.t('auth.validations.password.invalidDomain'),
// }
//
// const externalCheck = (cb, $message = () => i18n.t('auth.validations.password.notAllCondition')) => ({
//   $validator: val => cb(val),
//   $message
// })

// const inn = {
//   $validator: val => val.length === 12,
//   $message: () => i18n.t('auth.validations.password.length12'),
// }

// const nameLowerCase = {
//   $validator: val => val === val.toLowerCase(),
//   $message: () => i18n.t('auth.validations.password.onlyLowerCase'),
// }

// const strongPassword = () => {
//   const validators = {
//     length: {
//       cb: val => val.length > 8,
//       touched: false,
//       message: () => 'Не менее 8 симоволов',
//       success: false
//     },
//     oneDigit: {
//       cb: val => /\d/.test(val),
//       touched: false,
//       message: () => 'Должен содержать цифры',
//       success: false
//     },
//     oneLowercase: {
//       cb: val => /[a-zа-я]/.test(val),
//       touched: false,
//       message: () => 'Должен содержать строчные буквы',
//       success: false
//     },
//     oneUppercase: {
//       cb: val => /[А-ЯA-Z]/.test(val),
//       touched: false,
//       message: () => 'Должен содержать прописные буквы',
//       success: false
//     }
//   }
//   return validators
// }
//   const $validator = (val) => {
//     Object.values(validators).forEach((validator) => {
//       validator.success = validator.cb(val)
//       validator.touched = true
//     })
//
//     return !Object.values(validators).find(validator => !validator.success)
//   }
//   return {
//     validators,
//     $validator,
//     $message: () => i18n.t('auth.validations.password.notAllCondition'),
//   }
// }

// const isPositive = {
//   $validator: (val) => {
//     if (val) { return val > 0 }
//     return true
//   },
//   $message: () => i18n.t('auth.validations.password.invalidValue')
// }

export {
  required,
  requiredIf,
  sameAs,
  password,
  email,
  phone
}
