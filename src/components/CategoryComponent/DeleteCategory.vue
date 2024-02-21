<template>
  <v-dialog v-model="deleteCategoryDialog" width="600px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="red-lighten-1"
        class="mx-2"
        dark
        v-bind="props"
        @click="deleteCategoryDialog = true"
      >
        Delete
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 blue-grey-lighten-1">
        Remove Category
      </v-card-title>

      <v-card-text>
        Are you sure you want to remove a category named "{{ categName }}"?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="cloaseDeleteDialog()"> CANCEL </v-btn>
        <v-btn color="primary" text @click="deleteCateg(categID)"> YES </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["categID", "categName"],
  data: () => ({
    deleteCategoryDialog: false,
  }),
  methods: {
    cloaseDeleteDialog() {
      this.deleteCategoryDialog = false;
    },
    deleteCateg(id) {
      this.$store.commit("deleteCategory", id);
    },
  },
};
</script>

<style></style>
