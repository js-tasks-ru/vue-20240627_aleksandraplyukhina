import { defineComponent, onMounted, ref } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  props: {
    weatherData: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const weatherDataList = ref(getWeatherData())

    const parseTime = timeString =>
      timeString.split(':').reduce((acc, time, index) => acc + Number(time) / (index === 0 ? 1 : 60), 0)

    const isNightMode = (current, sunrise, sunset) => {
      return parseTime(current) < parseTime(sunrise) || parseTime(current) > parseTime(sunset)
    }

    return {
      weatherDataList,
      WeatherConditionIcons,
      isNightMode,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="(city, index) in weatherDataList" :key="index"
            :class="['weather-card', { 'weather-card--night': isNightMode(city.current.dt, city.current.sunrise, city.current.sunset) }]">
          <div v-if=city.alert class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ city.alert.sender_name }} : {{ city.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ city.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ city.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="city.current.weather.description">
              {{ WeatherConditionIcons[city.current.weather.id] }}
            </div>
            <div class="weather-conditions__temp">{{ (city.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(city.current.pressure * 0.75) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ city.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ city.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ city.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
