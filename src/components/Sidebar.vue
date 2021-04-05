<template>
  <div id="sidebar">
    <div id="sidebar-buttons">
      <button id="search-button" @click="openSearchMenu()">
        Search for places
      </button>
      <button
        id="gps-button"
        class="material-icons"
        @click="getCurrentLocation()"
      >
        my_location
      </button>
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
      <span id="temperature-unit" v-if="units == 'metric'">°C</span>
      <span id="temperature-unit" v-if="units == 'imperial'">°F</span>
    </div>

    <h2 id="weather-name">{{ weather_main }}</h2>
    <div id="user-data">
      <h3 id="date">Today • {{ date }}</h3>
      <h3 id="user-location">
        <span class="material-icons">location_on</span>
        <span id="city-name">{{ location }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import axios from "axios";
import gsap from "gsap";
import store from "../store";

export default {
  name: "Sidebar",
  setup() {
    const api = "//api.openweathermap.org/data/2.5/";
    const api_key = process.env.VUE_APP_API_KEY;
    var units = ref(store.state.units);
    var location = ref(store.state.location);
    var lat = ref(store.state.latitude);
    var lon = ref(store.state.longitude);
    var temperature = ref(null);
    var weather_main = ref(null);
    var weather_description = ref(null);
    var date = ref(store.state.current_date);

    function getWeatherData(location, units, lat, lon) {
      axios
        .get(
          `${api}/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=daily,minutely,hourly,alerts&appid=${api_key}`
        )
        .then((res) => {
          // Get temperature
          temperature.value = res.data.current.temp;
          temperature.value = temperature.value.toFixed();

          // Get weather
          weather_main.value = res.data.current.weather[0].main;
          weather_description.value = res.data.current.weather[0].description;
        });
    }

    function getCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        axios
          .get(
            `//eu1.locationiq.com/v1/reverse.php?key=${process.env.VUE_APP_LOCATION_IQ_TOKEN}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          )
          .then((res) => {
            store.commit("SET_CITY", {
              city: res.data.address.city,
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          });

        document.getElementById("gps-button").style.backgroundColor = "#E7E7EB";
        document.getElementById("gps-button").style.color = "#1E213A";
      }, (error) => {
        switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Location permissions must be enabled to get your current location");
            document.getElementById("gps-button").style.backgroundColor = "#6E707A";
            document.getElementById("gps-button").style.color = "#E7E7EB";
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location is no available...");
            document.getElementById("gps-button").style.backgroundColor = "#6E707A";
            document.getElementById("gps-button").style.color = "#E7E7EB";
            break;
        case error.TIMEOUT:
        case error.UNKNOWN_ERROR:
            console.log(error);
            break;
        }
      })
    }

    function openSearchMenu() {
      if(screen.width <= 1000){
        gsap.to("#search-bar", { x: "100vw", duration: 0.5 });
      } else {
        gsap.to("#search-bar", { x: "500px", duration: 0.5 });
      }
    }

    onMounted(() => {
      getCurrentLocation();
    });

    watchEffect(() => {
      getWeatherData(
        store.state.location,
        store.state.units,
        store.state.latitude,
        store.state.longitude
      );
      location.value = store.state.location;
      lat.value = store.state.latitude;
      lon.value = store.state.longitude;
      units.value = store.state.units;
      date.value = store.state.current_date;
    });

    return {
      location,
      units,
      temperature,
      weather_main,
      weather_description,
      date,
      getCurrentLocation,
      openSearchMenu,
    };
  },
};
</script>
