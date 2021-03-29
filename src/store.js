import { createStore } from "vuex" ;

const store = createStore({
   state:{
      units: "metric",
      location: "malaga",
   }
});

export default store;
