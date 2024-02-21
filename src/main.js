// import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./vuex/store";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// const stores = createStore(store)
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(store);
app.use(router);

app.mount("#app");
