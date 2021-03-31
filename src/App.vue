<template>
  <Sidebar />
  <TemperatureButtons />
  <Search />
  <Info />
</template>

<script>
import "./assets/styles/css/styles.css";
import Sidebar from "./components/Sidebar";
import TemperatureButtons from "./components/TemperatureButtons";
import Search from "./components/Search";
import Info from "./components/Info";

export default {
  name: 'App',
  components: {
    Sidebar,
    TemperatureButtons,
    Search,
    Info
  }
}
</script>
