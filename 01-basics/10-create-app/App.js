import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'App',

  // setup() {
  //   const date = new Date();
  //   const formattedDate = computed(() => {
  //     return new Intl.DateTimeFormat('ru-RU', {dateStyle: 'long'}).format(date)
  //   })
  //
  //   return {
  //     formattedDate,
  //   }
  // },
  //
  // template: `
  //   <div>Сегодня {{ formattedDate }}</div>
  // `,
  template: `Сегодня ${new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })}`,
})
