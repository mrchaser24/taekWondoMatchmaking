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

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Headers from "./../components/Header.vue"

const store = useStore();
const router = useRouter();

// Computed properties
const studentList = computed(() => store.state);

// Lifecycle hooks
onMounted(() => {
  router.push('/Student');
});
</script>

<style></style>
