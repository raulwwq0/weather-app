import { createStore } from "vuex";

const store = createStore({
  state: {
    units: "metric",
    location: "malaga",
  },
  mutations: {
    FAHRENHEIT:(state) => {
        state.units = "imperial";
    },

    CELSIUS: (state) => {
        state.units = "metric";
    }
  },
});

export default store;
