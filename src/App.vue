<template>
  <Sidebar />
  <TemperatureButtons />
</template>

<script>
import "./assets/styles/css/styles.css";
import Sidebar from "./components/Sidebar";
import TemperatureButtons from "./components/TemperatureButtons";

export default {
  name: 'App',
  components: {
    Sidebar,
    TemperatureButtons
  }
}
</script>
