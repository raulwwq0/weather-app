import { createStore } from "vuex";

const store = createStore({
  state: {
    units: "metric",
    location: "malaga",
    latitude: "36.7213028",
    longitude: "-4.4216366",
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

  },
});

export default store;
