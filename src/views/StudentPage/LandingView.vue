<template>
  <div class="ma-5 pa-5" style="margin: auto">
    <div
      class="py-5"
      style="width: 80%; margin: 0 auto"
    >
      <div>
        <h1 class="py-5">Student Information</h1>
      </div>
      <div class="d-flex justify-space-between">
        <div>
          <v-btn  class="global-btn" color="blue-lighten-1" @click="router.push('/')">Go Home</v-btn>
        </div>
        <div>
          <AddStudent />
        </div>
      </div>
    </div>

    <div
      style="
        border-radius: 5px;
        box-shadow:
          2px 2px 5px #cacaca,
          inset 2px 2px 5px #e7e7e7;
        width: 80%;
        margin: 0 auto;
      "
    >
      <v-table>
        <thead fixed-header>
          <tr>
            <th class="text-left" style="width: 20%">Name</th>
            <th class="text-left">Age</th>
            <th class="text-left">Weight</th>
            <th class="text-left">Belt</th>
            <th class="text-left">Level</th>
            <th class="text-left" style="width: 10%">Gym</th>
            <th class="text-left" style="width: 20%">Instructor</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(Student, id) in getStudentStore" :key="Student.id">
            <td>{{ Student.name }}</td>
            <td>{{ Student.age }}</td>
            <td>{{ Student.weight }}</td>
            <td>{{ Student.belt }}</td>
            <td>{{ Student.level }}</td>
            <td>{{ Student.gym }}</td>
            <td>{{ Student.instructor }}</td>
            <td class="d-flex justify-center" style="align-items:center">
              <!-- <v-btn class="mx-2" color="success lighten-2">Update</v-btn> -->
              <!-- <v-btn class="mx-2" color="error lighten-2">Delete</v-btn> -->
              <UpdateStudent :data="Student" />
              <DeleteStudent :studentName="Student.name" :studentID="id" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AddStudent from "../../components/StudentComponent/AddStudent.vue";
import DeleteStudent from "../../components/StudentComponent/DeleteStudent.vue";
import UpdateStudent from "../../components/StudentComponent/UpdateStudent.vue";

const store = useStore();
const router = useRouter();

// Computed properties
const getStudentStore = computed(() => store.state.studentStore.studentList);

// Data
const headers = ["Name", "Age", "Weight", "Belt", "Update"];
</script>

<style></style>
