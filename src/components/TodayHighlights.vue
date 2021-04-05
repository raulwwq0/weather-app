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
      <div id="wind-direction">
        <div id="wind-direction-mark" class="material-icons">navigation</div>
        <span>{{ direction }}</span>
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
        <span v-if="units == 'imperial'">{{ visibility_miles }}</span>
        <span class="result-unit" v-if="units == 'metric'"> km</span>
        <span class="result-unit" v-if="units == 'imperial'"> miles</span>
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
    const api = "//api.openweathermap.org/data/2.5/";
    const api_key = process.env.VUE_APP_API_KEY;
    var units = ref(store.state.units);
    var wind_speed = ref(null);
    var wind_direction = ref(null);
    var direction = ref(null);
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
          wind_direction.value = res.data.current.wind_deg.toFixed();
          humidity.value = res.data.current.humidity.toFixed();
          visibility.value = (res.data.current.visibility / 1000).toFixed();
          visibility_miles.value = (res.data.current.visibility / 1609.3).toFixed(1);
          air_pressure.value = res.data.current.pressure.toFixed();
        });
    }

    function setWindDirection(wind_direction){
      if(document.getElementById("wind-direction-mark") == null) return

      if(wind_direction > 10 && wind_direction <= 30){
          document.getElementById("wind-direction-mark").style.transform = "rotate(25deg)";
          direction.value = "N-NE";
      } else if(wind_direction > 30 && wind_direction <= 50){
          document.getElementById("wind-direction-mark").style.transform = "rotate(45deg)";
          direction.value = "NE";
      } else if(wind_direction > 50 && wind_direction <= 70){
          document.getElementById("wind-direction-mark").style.transform = "rotate(65deg)";
          direction.value = "E-NE";
      } else if(wind_direction > 70 && wind_direction <= 100){
          document.getElementById("wind-direction-mark").style.transform = "rotate(90deg)";
          direction.value = "E";
      } else if(wind_direction > 100 && wind_direction <= 120){
          document.getElementById("wind-direction-mark").style.transform = "rotate(105deg)";
          direction.value = "E-SE";
      } else if(wind_direction > 120 && wind_direction <= 140){
          document.getElementById("wind-direction-mark").style.transform = "rotate(135deg)";
          direction.value = "SE";
      } else if(wind_direction > 140 && wind_direction <= 160){
          document.getElementById("wind-direction-mark").style.transform = "rotate(155deg)";
          direction.value = "S-SE";
      } else if(wind_direction > 160 && wind_direction <= 190){
          document.getElementById("wind-direction-mark").style.transform = "rotate(180deg)";
          direction.value = "S";
      } else if(wind_direction > 190 && wind_direction <= 210){
          document.getElementById("wind-direction-mark").style.transform = "rotate(205deg)";
          direction.value = "S-SW";
      } else if(wind_direction > 210 && wind_direction <= 230){
          document.getElementById("wind-direction-mark").style.transform = "rotate(225deg)";
          direction.value = "SW";
      } else if(wind_direction > 230 && wind_direction <= 250){
          document.getElementById("wind-direction-mark").style.transform = "rotate(245deg)";
          direction.value = "W-SW";
      } else if(wind_direction > 250 && wind_direction <= 280){
          document.getElementById("wind-direction-mark").style.transform = "rotate(270deg)";
          direction.value = "W";
      } else if(wind_direction > 280 && wind_direction <= 300){
          document.getElementById("wind-direction-mark").style.transform = "rotate(295deg)";
          direction.value = "W-NW";
      } else if(wind_direction > 300 && wind_direction <= 320){
          document.getElementById("wind-direction-mark").style.transform = "rotate(315deg)";
          direction.value = "NW";
      } else if(wind_direction > 320 && wind_direction <= 350){
          document.getElementById("wind-direction-mark").style.transform = "rotate(335deg)";
          direction.value = "N-NW";
      } else{
          document.getElementById("wind-direction-mark").style.transform = "rotate(0deg)";
          direction.value = "N";
      }
    }

    watchEffect(() => {
      getTodayData(
        store.state.units,
        store.state.latitude,
        store.state.longitude
      );
      setWindDirection(wind_direction.value);
        units.value = store.state.units;
    });

    return { units, wind_speed, wind_direction, humidity, visibility, visibility_miles, air_pressure, direction };
  },
};
</script>
