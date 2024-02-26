import { createStore } from "vuex";

//Store Modules
import studentStore from "./modules/StudentStore";
import categoryStore from "./modules/CategoryStore";
import matchMakingStore from "./modules/MatchMakingStore";

// Install the store instance as a plugin
export default createStore({
  modules: {
    studentStore,
    categoryStore,
    matchMakingStore,
  },
  mutations:{
    initialiseStore(state){
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        )
      }
    }
  }
});
