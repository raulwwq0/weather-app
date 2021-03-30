<template>
  <div id="temperature-buttons">
    <button id="celsius" class="temperature-button active" @click="changeToCelsius(), setActive('celsius')">°C</button>
    <button id="fahrenheit" class="temperature-button" @click="changeToFahrenheit(), setActive('fahrenheit')">°F</button>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "TemperatureButtons",
  setup(){
      function changeToCelsius(){
          store.commit("CELSIUS");
      }

      function changeToFahrenheit(){
          store.commit("FAHRENHEIT");
      }

      function setActive(btn){
        let celsius = document.getElementById("celsius");
        let fahrenheit = document.getElementById("fahrenheit");

        if(btn === "celsius"){
          celsius.classList.add("active");
          fahrenheit.classList.remove("active");
        }else {
          fahrenheit.classList.add("active");
          celsius.classList.remove("active");
        }
      }

      return { changeToCelsius, changeToFahrenheit, setActive}
  }
};
</script>
