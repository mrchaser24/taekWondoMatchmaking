// import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./vuex/store";

// Vuetify
import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css';
import "@fortawesome/fontawesome-free/css/all.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Global JS
import global from '@/mixins/global.js'

// const stores = createStore(store)
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.mixin(global)
app.use(vuetify);
app.use(store);
app.use(router);

app.mount("#app");
