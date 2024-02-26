<template>
  <v-dialog v-model="createAgeDialog" width="900px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="blue-lighten-1"
        class="global-btn"
        dark
        v-bind="props"
        @click="createAgeDialog = true"
      >
        Add Age
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Add New Age
      </v-card-title>

      <v-form ref="addAgeForm" v-model="addAgeForm">
        <v-container>
          <v-row ma-2>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="ageDetail.name"
                :rules="[
                  (v) => !!v || 'Name is required',
                  (v) => v.length <= 20 || 'Invalid Value',
                ]"
                :counter="20"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="ageDetail.min"
                :rules="[
                  (v) => !!v || 'Minimum value required',
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
                v-model="ageDetail.max"
                :rules="[
                  (v) => !!v || 'Maximum value required',
                  (v) => !isNaN(v) || 'Invalid Value',
                ]"
                :counter="20"
                label="Weight"
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
      createAgeDialog: false,
      addAgeForm: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      ageDetail: {
        id: "",
        name: "",
        min: "",
        max: "",
      },
    };
  },
  computed: {
    ...mapState({
      ageGroupList: (state) => state.categoryStore.ageGroupList,
    }),
  },
  watch: {
    createAgeDialog(to) {
      if (!to) {
        this.$refs.addAgeForm.resetValidation();
        this.ageDetail = {
          id: "",
          name: "",
          min: "",
          max: "",
        };
      }
    },
  },
  methods: {
    closeAddDialog() {
      this.$refs.addAgeForm.resetValidation();
      this.createAgeDialog = false;
    },
    addStudentValidation() {
      if (this.$refs.addAgeForm.validate() && this.addAgeForm) {
        console.log("Submit Success!");
        this.submitCategory();
      }
    },
    submitCategory() {
      let getMaxId =
        Math.max(...this.ageGroupList.map((i) => i.id)) == "-Infinity"
          ? 1
          : Math.max(...this.ageGroupList.map((i) => i.id));

      this.ageDetail.id = ++getMaxId;
      this.$store.commit("addAgeBracket", this.ageDetail);
      this.$refs.addAgeForm.resetValidation();
      this.createAgeDialog = false;
    },
  },
};
</script>

<style></style>
