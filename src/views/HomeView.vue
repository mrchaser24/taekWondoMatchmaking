<template>
  <div>
    <div>
      <v-btn @click="$router.push('/Student')">STUDENT PAGE</v-btn>
      <v-btn @click="$router.push('/Category')">CATEGORY PAGE</v-btn>
      <v-btn @click="$router.push('/Matching')">MATCHING PAGE</v-btn>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      studentList: (state) => state,
    }),
  },
};
</script>

<style></style>
