<template>
  <v-dialog v-model="deleteUserDialog" width="600px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="red-lighten-1"
        class="mx-2"
        dark
        v-bind="props"
        @click="deleteUserDialog = true"
      >
        Delete
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 blue-grey-lighten-1">
        Remove Student
      </v-card-title>

      <v-card-text>
        Are you sure you want to remove student named "{{ studentName }}"?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="cloaseDeleteDialog()"> CANCEL </v-btn>
        <v-btn color="primary" text @click="deleteUser(studentID)"> YES </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["studentID", "studentName"],
  data: () => ({
    deleteUserDialog: false,
  }),
  methods: {
    cloaseDeleteDialog() {
      //   this.$refs.addStudentForm.resetValidation();
      this.deleteUserDialog = false;
    },
    deleteUser(id) {
      this.$store.commit("deleteStudent", id);
    },
  },
};
</script>

<style></style>
