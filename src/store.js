import { createStore } from "vuex";

const store = createStore({
  state: {
    units: "metric",
    location: "london",
    latitude: "51.5073219",
    longitude: "-0.1276474",
    current_date: "",
  },
  mutations: {
    FAHRENHEIT:(state) => {
        state.units = "imperial";
    },

    CELSIUS: (state) => {
        state.units = "metric";
    },

    SET_CITY: (state, data) => {
      state.location = data.city;
      state.latitude = data.lat;
      state.longitude = data.lon;
    },

    SET_DATE: (state, date) => state.current_date = date
  },
});

export default store;
