<template>
  <div id="search-bar">
    <span
      id="search-close-button"
      class="material-icons"
      @click="closeSearchMenu()"
      >close</span
    >
    <form id="search-form" @submit.prevent="searchCity()">
      <label for="location" id="location-label"
        ><span class="material-icons">search</span>Search location</label
      >
      <input
        type="text"
        name="location"
        id="search-location"
        @focus="hideLabel()"
        @blur="showLabel()"
      />
      <input type="submit" name="search" id="search-button" value="Search" />
    </form>

    <div id="search-results">
      <span v-for="result in results" :key="result.id">
        <div
          class="result-button"
          @click="
            setCity(result.name, result.lat, result.lon), closeSearchMenu()
          "
        >
          <h3>{{ result.name }}, {{ result.country }}</h3>
          <span class="material-icons">keyboard_arrow_right</span>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import gsap from "gsap";
import store from "../store";

export default {
  name: "Search",
  setup() {
    const api = "http://api.openweathermap.org/geo/1.0/";
    const api_key = process.env.VUE_APP_API_KEY;
    var city = ref(store.state.location);
    var results = ref([]);

    function hideLabel() {
      document.getElementById("location-label").style.display = "none";
    }

    function showLabel() {
      if (document.getElementById("search-location").value == "") {
        document.getElementById("location-label").style.display = "flex";
      }
    }

    function searchCity() {
      let input = document.getElementById("search-location");

      city.value = input.value;
      getCities();

      input.value = "";
    }

    function getCities() {
      axios
        .get(`${api}direct?q=${city.value}&limit=10&appid=${api_key}`)
        .then((res) => {
          results.value = res.data;
        });
    }

    function setCity(city, lat, lon) {
      store.commit("SET_CITY", {
        city: city,
        lat: lat,
        lon: lon,
      });

      document.getElementById("gps-button").style.backgroundColor = "#6E707A";
      document.getElementById("gps-button").style.color = "#E7E7EB";
    }

    function closeSearchMenu() {
      gsap.to("#search-bar", { x: "-500px", duration: 0.5 });
    }

    return {
      results,
      searchCity,
      hideLabel,
      showLabel,
      setCity,
      closeSearchMenu,
    };
  },
};
</script>
