import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

const TEMP_RATIO = 273.15;
const PRESSURE_RATIO = 0.75;

export default defineComponent({
  name: 'WeatherApp',
  setup () {
    const weatherCards = getWeatherData();

    const convertTemp = (temp) => parseFloat(temp - TEMP_RATIO).toFixed(1);
    const getAirPreassure = (pressure) => (pressure * PRESSURE_RATIO).toFixed();
    const getWeatherIcon = (id) => WeatherConditionIcons[id];
    const checkNightTime = ({ sunrise, sunset, dt }) => dt < sunrise || dt > sunset;
    const getAlertDescription = ({ sender_name, description }) => `${sender_name}: ${description}`;

    return {
      weatherCards,
      convertTemp,
      getWeatherIcon,
      getAirPreassure,
      checkNightTime,
      getAlertDescription
    }
  },
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li class="weather-card" v-for="{ geographic_name, current, alert }, i in weatherCards" :class="{'weather-card--night': checkNightTime(current)}">
          <div class="weather-alert" v-if="alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description" v-if="alert">{{ getAlertDescription(alert) }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title=current.weather.description>{{ getWeatherIcon(current.weather.id) }}</div>
            <div class="weather-conditions__temp">{{ convertTemp(current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ getAirPreassure(current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
