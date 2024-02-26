<template>
  <v-app>
    <div style="position: relative; width: 100%;">
      <Headers />
    </div>
    <RouterView />
  </v-app>
</template>


<script>
import Headers from "./components/Header.vue"

export default {
  components:{
    Headers
  }
};
</script>

<style>
@import "./assets/globalCss.css";
</style>
