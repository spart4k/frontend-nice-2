import { ref, onMounted } from '@vue/composition-api'

export default {
  name: 'live-chat-dialogue',
  props: {

  },
  setup (_, props) {
    const messages = ref([])
    const initMesassage = () => {
      messages.value = [
        {
          author: 'Илья',
          body: 'Да кого вы слушаете))'
        },
        {
          author: 'LeXa',
          body: 'Сейчас я подъеду, 5 мин'
        },
        {
          author: 'Илья',
          body: 'Да кого вы слушаете))'
        },
        {
          author: 'LeXa',
          body: 'таракан развился'
        },
        {
          author: 'NICE',
          body: 'Отличная вечеринка!'
        },
        {
          author: 'Илья',
          body: 'Да кого вы слушаете))'
        },
        {
          author: 'LeXa',
          body: 'таракан развился'
        },
        {
          author: 'NICE',
          body: 'Отличная вечеринка!'
        },
        {
          author: 'Илья',
          body: 'Да кого вы слушаете))'
        },
        {
          author: 'LeXa',
          body: 'таракан развился'
        },
        {
          author: 'NICE',
          body: 'Отличная вечеринка!'
        },
        {
          author: 'KOZ',
          body: 'Помню-помню'
        },
        {
          author: 'Pz Owais',
          body: 'Всем приветики! Что делаете?'
        }
      ]
    }
    onMounted(() => {
      initMesassage()
    })
    return {
      messages,
      initMesassage
    }
  }
}
