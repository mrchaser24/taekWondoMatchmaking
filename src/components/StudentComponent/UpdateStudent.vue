<template>
  <v-dialog v-model="updateStudentDialog" width="900px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="green-lighten-1"
        class="mx-2"
        dark
        v-bind="props"
        @click="updateStudentDialog = true"
      >
        Update
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 blue-grey-lighten-1">
        Update Student
      </v-card-title>

      <v-form ref="updateStudentForm" v-model="updateStudentForm">
        <v-container>
          <v-row ma-2>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="studentDetails.name"
                :rules="[
                  (v) => !!v || 'Age is required',
                  (v) => v.length <= 20 || 'Maximum of 20 char only',
                ]"
                :counter="20"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="studentDetails.age"
                :rules="[
                  (v) => !!v || 'Age is required',
                  (v) => !isNaN(v) || 'Invalid Value',
                ]"
                :counter="20"
                label="Age"
                required
              ></v-text-field>
            </v-col>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="studentDetails.weight"
                :rules="[
                  (v) => !!v || 'Weight is required',
                  (v) => !isNaN(v) || 'Invalid Value',
                ]"
                :counter="20"
                label="Weight"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row ma-2>
            <v-col class="ma-3">
              <v-autocomplete
                variant="solo-filled"
                v-model="studentDetails.belt"
                :items="getBeltLevel"
                item-value="color"
                item-title="color"
                label="Select Belt"
                auto-select-first
                :rules="[(v) => !!v || 'Belt is required']"
                required
                dense
                solo
              ></v-autocomplete>
            </v-col>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="studentDetails.gym"
                :rules="[
                  (v) => !!v || 'Gym is required',
                  (v) => v.length <= 15 || 'Less than 15 char only',
                ]"
                :counter="20"
                label="Gym"
                required
              ></v-text-field>
            </v-col>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="studentDetails.instructor"
                :rules="[
                  (v) => !!v || 'Instructor name is required',
                  (v) => v.length <= 15 || 'Less than 15 char only',
                ]"
                :counter="20"
                label="Instructor's Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="cloaseUpdateDialog()"> CANCEL </v-btn>
        <v-btn color="primary" text @click="updateStudent()"> YES </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["data"],
  data: () => ({
    updateStudentDialog: false,
    updateStudentForm: false,
    studentDetails: {
      id: "",
      name: "",
      age: "",
      weight: "",
      belt: "",
      gym: "",
      instructor: "",
    },
  }),
  computed: {
    ...mapState({
      getBeltLevel: (state) => state.studentStore.beltLevel,
      setStudentInformation: (state) => state.studentStore.studentList,
    }),
  },
  watch: {
    updateStudentDialog(to) {
      if (to) {
        this.initStudentField();
      }
    },
  },
  methods: {
    cloaseUpdateDialog() {
      this.$refs.updateStudentForm.resetValidation();
      this.updateStudentDialog = false;
    },
    updateStudent() {
      if (
        this.updateStudentForm != null &&
        this.$refs.updateStudentForm.validate()
      ) {
        this.$store.commit("updateStudent", this.studentDetails);
        this.$refs.updateStudentForm.resetValidation();
        this.updateStudentDialog = false;
      }
    },
    initStudentField() {
      this.studentDetails = {
        id: this.data.id,
        name: this.data.name,
        age: this.data.age,
        weight: this.data.weight,
        belt: this.data.belt,
        gym: this.data.gym,
        instructor: this.data.instructor,
      };
    },
  },
};
</script>

<style></style>
