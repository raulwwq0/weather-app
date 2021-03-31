<template>
  <div id="highlights">
    <h2 id="title">Today's highlights</h2>
    <div id="wind-status">
      <h3>Wind status</h3>
      <div class="result">
        {{ wind_speed }}
        <span class="result-unit" v-if="units == 'metric'">m/s</span>
        <span class="result-unit" v-if="units == 'imperial'">mph</span>
      </div>
    </div>
    <div id="humidity">
      <h3>Humidity</h3>
      <div class="result">
        {{ humidity }}
        <span class="result-unit">%</span>
      </div>
      <progress id="humidity-bar" :value="humidity" max="100"></progress>
    </div>
    <div id="visibility">
      <h3>Visibility</h3>
      <div class="result">
        <span v-if="units == 'metric'">{{ visibility }}</span>
        <span v-if="units == 'imperial'">{{ visibility_miles}}</span>
        <span class="result-unit" v-if="units == 'metric'">  km</span>
        <span class="result-unit" v-if="units == 'imperial'">  miles</span>
      </div>
    </div>
    <div id="air-pressure">
      <h3>Air pressure</h3>
      <div class="result">
        {{ air_pressure }}
        <span class="result-unit">mb</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import store from "../store";
import axios from "axios";

export default {
  name: "TodayHighlights",
  setup() {
    const api = "http://api.openweathermap.org/data/2.5/";
    const api_key = process.env.VUE_APP_API_KEY;
    var units = ref(store.state.units);
    var wind_speed = ref(null);
    var humidity = ref(null);
    var visibility = ref(null);
    var visibility_miles = ref(null);
    var air_pressure = ref(null);

    function getTodayData(units, lat, lon) {
      axios
        .get(
          `${api}/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=daily,minutely,hourly,alerts&appid=${api_key}`
        )
        .then((res) => {
          wind_speed.value = res.data.current.wind_speed.toFixed();
          humidity.value = res.data.current.humidity.toFixed();
          visibility.value = (res.data.current.visibility / 1000).toFixed();
          visibility_miles.value = (res.data.current.visibility / 1609.3).toFixed(1);
          air_pressure.value = res.data.current.pressure.toFixed();
        });
    }

    watchEffect(() => {
      getTodayData(
        store.state.units,
        store.state.latitude,
        store.state.longitude
      );
        units.value = store.state.units;
    });

    return { units, wind_speed, humidity, visibility, visibility_miles, air_pressure };
  },
};
</script>
