<template>
  <v-dialog v-model="createCategoryDialog" width="900px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="blue-lighten-1"
        dark
        v-bind="props"
        @click="createCategoryDialog = true"
      >
        Add Category
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Add New Category
      </v-card-title>

      <v-form ref="addCategoryForm" v-model="addCategoryForm">
        <v-container>
          <v-row ma-2>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="categoryDetail.name"
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
                v-model="categoryDetail.min"
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
                v-model="categoryDetail.max"
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
      createCategoryDialog: false,
      addCategoryForm: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      categoryDetail: {
        id: "",
        name: "",
        min: "",
        max: "",
      },
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.categoryStore.categoryList,
    }),
  },
  watch: {
    createCategoryDialog(to) {
      if (!to) {
        this.$refs.addCategoryForm.resetValidation();
        this.categoryDetail = {
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
      this.$refs.addCategoryForm.resetValidation();
      this.createCategoryDialog = false;
    },
    addStudentValidation() {
      if (this.$refs.addCategoryForm.validate() && this.addCategoryForm) {
        console.log("Submit Success!");
        this.submitCategory();
      }
    },
    submitCategory() {
      let getMaxId =
        Math.max(...this.categoryList.map((i) => i.id)) == "-Infinity"
          ? 1
          : Math.max(...this.categoryList.map((i) => i.id));

      this.categoryDetail.id = ++getMaxId;
      this.$store.commit("addCategory", this.categoryDetail);
      this.$refs.addCategoryForm.resetValidation();
      this.createCategoryDialog = false;
    },
  },
};
</script>

<style></style>
