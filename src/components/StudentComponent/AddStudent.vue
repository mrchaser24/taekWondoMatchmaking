<template>
  <v-dialog v-model="createUserDialog" width="900px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="blue-lighten-1"
        dark
        v-bind="props"
        @click="createUserDialog = true"
      >
        Add Student
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Add New Student
      </v-card-title>

      <v-form ref="addStudentForm" v-model="addStudentForm">
        <v-container>
          <v-row ma-2>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="studentDetails.name"
                :rules="[
                  (v) => !!v || 'Age is required',
                  (v) => v.length <= 20 || 'Invalid Value',
                  (v) =>
                    setStudentInformation.map((i) => i.name).some((i) => i == v)
                      ? 'Student name already exist'
                      : true,
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
        <v-btn color="error" text @click="closeAddDialog()"> CANCEL </v-btn>
        <v-btn color="primary" text @click="addStudentValidation()">
          SUBMIT
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { useStudentStore } from "@/stores/StudentStore.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      createUserDialog: false,
      addStudentForm: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      studentDetails: {
        id: "",
        name: "",
        age: "",
        weight: "",
        belt: "",
        gym: "",
        instructor: "",
        ageBracket: "",
      },
    };
  },
  computed: {
    ...mapState({
      getBeltLevel: (state) => state.studentStore.beltLevel,
      setStudentInformation: (state) => state.studentStore.studentList,
      getAgeLimit: (state) => state.studentStore.ageBracket,
    }),
  },
  watch: {
    createUserDialog(to) {
      if (!to) {
        this.$refs.addStudentForm.resetValidation();
        this.studentDetails = {
          id: "",
          name: "",
          age: "",
          weight: "",
          belt: "",
          level: "",
          gym: "",
          instructor: "",
        };
      }
    },
  },
  methods: {
    closeAddDialog() {
      this.$refs.addStudentForm.resetValidation();
      this.createUserDialog = false;
    },
    addStudentValidation() {
      if (this.$refs.addStudentForm.validate() && this.addStudentForm) {
        console.log("Submit Success!");
        this.submitStudent();
      }
    },
    submitStudent() {
      let getMaxId =
        Math.max(...this.setStudentInformation.map((i) => i.id)) == "-Infinity"
          ? 1
          : Math.max(...this.setStudentInformation.map((i) => i.id));
      this.getBeltLevel.forEach((item) => {
        if (item.color == this.studentDetails.belt) {
          this.studentDetails.level = item.id > 5 ? "Advance" : "Novice";
        }
      });
      this.getAgeLimit.forEach((item)=>{
        if (this.studentDetails.age >= item.min && this.studentDetails.age <= item.max) {
          
        }
      })


      this.studentDetails.id = ++getMaxId;
      this.$store.commit("addStudent", this.studentDetails);
      this.$refs.addStudentForm.resetValidation();
      this.createUserDialog = false;
    },
  },
};
</script>

<style></style>
