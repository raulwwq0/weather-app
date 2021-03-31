<template>
  <div id="five-days-weather">
    <div class="weather-box" v-for="result in results" :key="result.dt">
      <h3 class="weather-day" v-if="result != results[0]">
        {{ changeDateFormat(result.dt) }}
      </h3>
      <h3 class="weather-day" v-if="result == results[0]">Tomorrow</h3>
      <img
        class="five-days-weather-img"
        src="../assets/images/Shower.png"
        v-if="
          result.weather[0].description == 'shower rain' ||
            result.weather[0].description == 'ragged shower rain' ||
            result.weather[0].description == 'light intensity shower rain' ||
            result.weather[0].description == 'heavy intensity shower rain'
        "
      />
      <img
        class="five-days-weather-img"
        src="../assets/images/Clear.png"
        v-if="result.weather[0].main == 'Clear'"
      />
      <img
        class="five-days-weather-img"
        src="../assets/images/HeavyRain.png"
        v-if="
          result.weather[0].description == 'heavy intensity rain' ||
            result.weather[0].description == 'very heavy rain' ||
            result.weather[0].description == 'extreme rain'
        "
      />
      <img
        class="five-days-weather-img"
        src="../assets/images/LightCloud.png"
        v-if="
          result.weather[0].description == 'few clouds' ||
            result.weather[0].description == 'scattered clouds'
        "
      />
      <img
        class="five-days-weather-img"
        src="../assets/images/LightRain.png"
        v-if="
          result.weather[0].main == 'Drizzle' ||
            result.weather[0].description == 'light rain' ||
            result.weather[0].description == 'moderate rain'
        "
      />
      <img
        class="five-days-weather-img"
        src="../assets/images/Sleet.png"
        v-if="result.weather[0].description == 'freezing rain'"
      />
      <img
        class="five-days-weather-img"
        src="../assets/images/Snow.png"
        v-if="result.weather[0].main == 'Snow'"
      />
      <img
        class="five-days-weather-img"
        src="../assets/images/Thunderstorm.png"
        v-if="result.weather[0].description == 'Thunderstorm'"
      />
      <img
        class="five-days-weather-img"
        src="../assets/images/HeavyCloud.png"
        v-if="
          result.weather[0].main == 'Mist' ||
            result.weather[0].main == 'Smoke' ||
            result.weather[0].main == 'Haze' ||
            result.weather[0].main == 'Dust' ||
            result.weather[0].main == 'Fog' ||
            result.weather[0].main == 'Sand' ||
            result.weather[0].main == 'Ash' ||
            result.weather[0].main == 'Squall' ||
            result.weather[0].main == 'Tornado' ||
            result.weather[0].description == 'broken clouds' ||
            result.weather[0].description == 'overcast clouds'
        "
      />
      <div class="weather-temperature">
        <span class="max-temperature">
          {{ result.temp.max.toFixed() }}
          <span v-if="units == 'metric'">°C</span>
          <span v-if="units == 'imperial'">°F</span>
        </span>
        <span class="min-temperature">
          {{ result.temp.min.toFixed() }}
          <span v-if="units == 'metric'">°C</span>
          <span v-if="units == 'imperial'">°F</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import store from "../store";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "FiveDaysWeather",
  setup() {
    const api = "http://api.openweathermap.org/data/2.5/";
    const api_key = process.env.VUE_APP_API_KEY;
    var results = ref([]);
    var units = ref(store.state.units);

    function getFiveDaysWeather(lat, lon, units) {
      axios
        .get(
          `${api}/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=current,minutely,hourly,alerts&appid=${api_key}`
        )
        .then((res) => {
          console.log(res);
          results.value = res.data.daily;
          store.commit("SET_DATE", changeDateFormat(results.value[0].dt));
          results.value.splice(0, 1);
          results.value.splice(-2, 2);
        });
    }

    function changeDateFormat(date) {
      let format = dayjs(date * 1000).format("ddd, DD MMM");
      return format;
    }

    watchEffect(() => {
      getFiveDaysWeather(
        store.state.latitude,
        store.state.longitude,
        store.state.units
      );
        units.value = store.state.units;
    });

    return { results, units, changeDateFormat };
  },
};
</script>
