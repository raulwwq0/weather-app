<template>
  <div id="sidebar">
    <div id="sidebar-buttons">
      <button id="search-button">Search for places</button>
      <button id="gps-button" class="material-icons">my_location</button>
    </div>

    <div id="weather-img">
      <img id="cloud-bg" src="../assets/images/Cloud-background.png" />

      <img
        class="weather-state"
        src="../assets/images/Shower.png"
        v-if="
          weather_description == 'shower rain' ||
            weather_description == 'ragged shower rain' ||
            weather_description == 'light intensity shower rain' ||
            weather_description == 'heavy intensity shower rain'
        "
      />
      <img
        class="weather-state"
        src="../assets/images/Clear.png"
        v-if="weather_main == 'Clear'"
      />
      <img
        class="weather-state"
        src="../assets/images/HeavyRain.png"
        v-if="
          weather_description == 'heavy intensity rain' ||
            weather_description == 'very heavy rain' ||
            weather_description == 'extreme rain'
        "
      />
      <img
        class="weather-state"
        src="../assets/images/LightCloud.png"
        v-if="
          weather_description == 'few clouds' ||
            weather_description == 'scattered clouds'
        "
      />
      <img
        class="weather-state"
        src="../assets/images/LightRain.png"
        v-if="
          weather_main == 'Drizzle' ||
            weather_description == 'light rain' ||
            weather_description == 'moderate rain'
        "
      />
      <img
        class="weather-state"
        src="../assets/images/Sleet.png"
        v-if="weather_description == 'freezing rain'"
      />
      <img
        class="weather-state"
        src="../assets/images/Snow.png"
        v-if="weather_main == 'Snow'"
      />
      <img
        class="weather-state"
        src="../assets/images/Thunderstorm.png"
        v-if="weather_description == 'Thunderstorm'"
      />
      <img
        class="weather-state"
        src="../assets/images/HeavyCloud.png"
        v-if="
          weather_main == 'Mist' ||
            weather_main == 'Smoke' ||
            weather_main == 'Haze' ||
            weather_main == 'Dust' ||
            weather_main == 'Fog' ||
            weather_main == 'Sand' ||
            weather_main == 'Ash' ||
            weather_main == 'Squall' ||
            weather_main == 'Tornado' ||
            weather_description == 'broken clouds' ||
            weather_description == 'overcast clouds'
        "
      />
    </div>

    <div id="temperature">
      <span id="temperature-number">{{ temperature }}</span>
      <span id="temperature-unit">°C</span>
    </div>

    <h2 id="weather-name">{{ weather_main }}</h2>
    <div id="user-data">
      <h3 id="date">Today • Fri, 5 Jun</h3>
      <h3 id="user-location">
        <span class="material-icons">location_on</span>
        <span id="city-name">{{ location }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  name: "Sidebar",
  setup() {
    const api = "http://api.openweathermap.org/data/2.5";
    const api_key = process.env.VUE_APP_API_KEY;
    var units = "metric"; // metric = celsius, imperial = fahrenheit
    var location = "malaga";
    var temperature = ref(null);
    var weather_main = ref(null);
    var weather_description = ref(null);

    function getWeatherData() {
      axios
        .get(`${api}/weather?q=${location}&appid=${api_key}&units=${units} `)
        .then((res) => {
          console.log(res);
          // Get temperature
          temperature.value = res.data.main.temp;
          temperature.value = temperature.value.toFixed();

          // Get weather
          weather_main.value = res.data.weather[0].main;
          weather_description.value = res.data.weather[0].description;
        });
    }

    onMounted(() => {
      getWeatherData();
    });

    return {
      location,
      temperature,
      weather_main,
      weather_description,
    };
  },
};
</script>
