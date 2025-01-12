import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'App',

  setup() {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat(navigator.language, {dateStyle: 'long'}).format(date)

    return {
      formattedDate,
    }
  },

  template: `
    <div>Сегодня {{ formattedDate }}</div>
  `,
})
