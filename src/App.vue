<template>
  <Sidebar />
  <TemperatureButtons />
  <Search />
</template>

<script>
import "./assets/styles/css/styles.css";
import Sidebar from "./components/Sidebar";
import TemperatureButtons from "./components/TemperatureButtons";
import Search from "./components/Search";

export default {
  name: 'App',
  components: {
    Sidebar,
    TemperatureButtons,
    Search
  }
}
</script>
