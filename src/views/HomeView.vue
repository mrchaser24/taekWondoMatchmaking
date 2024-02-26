<template>
  <div class="d-flex justify-between" style="width: 100%;">
    <div>
      <!-- DASHBOARD IN PROGRESS -->

      <!-- <v-btn @click="$router.push('/Student')">STUDENT PAGE</v-btn>
      <v-btn @click="$router.push('/Category')">CATEGORY PAGE</v-btn>
      <v-btn @click="$router.push('/Matching')">MATCHING PAGE</v-btn> -->
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Headers from "./../components/Header.vue"

export default {
  components:{
    Headers
  },
  computed: {
    ...mapState({
      studentList: (state) => state,
    }),
  },
  mounted(){
    this.$router.push('/Student')
  }
};
</script>

<style></style>
