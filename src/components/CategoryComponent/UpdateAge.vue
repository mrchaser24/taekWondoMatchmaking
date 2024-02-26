<template>
  <v-dialog v-model="updateCategoryDialog" width="900px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="green-lighten-1"
        class="mx-2"
        dark
        v-bind="props"
        @click="updateCategoryDialog = true"
      >
        Update
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 blue-grey-lighten-1">
        Update Age Bracket
      </v-card-title>

      <v-form ref="updateCategoryForm" v-model="updateCategoryForm">
        <v-container>
          <v-row ma-2>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="categoryDetails.name"
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
                v-model="categoryDetails.min"
                :rules="[
                  (v) => !!v || 'Minimum is required',
                  (v) => !isNaN(v) || 'Invalid Value',
                ]"
                :counter="20"
                label="Min"
                required
              ></v-text-field>
            </v-col>
            <v-col class="ma-3">
              <v-text-field
                variant="solo-filled"
                v-model="categoryDetails.max"
                :rules="[
                  (v) => !!v || 'Maximum is required',
                  (v) => !isNaN(v) || 'Invalid Value',
                ]"
                :counter="20"
                label="Max"
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
        <v-btn color="primary" text @click="updateCategory()"> YES </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["data"],
  data: () => ({
    updateCategoryDialog: false,
    updateCategoryForm: false,
    categoryDetails: {
      id: "",
      name: "",
      min: "",
      max: "",
    },
  }),
  computed: {
    ...mapState({
      categoryList: (state) => state.categoryStore.categoryList,
    }),
  },
  watch: {
    updateCategoryDialog(to) {
      if (to) {
        this.initStudentField();
      }
    },
  },
  methods: {
    cloaseUpdateDialog() {
      this.$refs.updateCategoryForm.resetValidation();
      this.updateCategoryDialog = false;
    },
    updateCategory() {
      if (
        this.updateCategoryForm != null &&
        this.$refs.updateCategoryForm.validate()
      ) {
        this.$store.commit("updateAgeBracket", this.categoryDetails);
        this.$refs.updateCategoryForm.resetValidation();
        this.updateCategoryDialog = false;
      }
    },
    initStudentField() {
      this.categoryDetails = {
        id: this.data.id,
        name: this.data.name,
        min: this.data.min,
        max: this.data.max,
      };
    },
  },
};
</script>

<style></style>
