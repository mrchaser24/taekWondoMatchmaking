<template>
  <div class="ma-5 pa-5" style="margin: auto">
    <div
      class="py-5 d-flex justify-space-between"
      style="width: 80%; margin: 0 auto"
    >
      <div>
        <h1>Category Information</h1>
        <v-btn @click="$router.push('/')">Go Home</v-btn>
      </div>
      <div>
        <AddCategory />
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
            <th class="text-left">Min Weight</th>
            <th class="text-left">Max Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categ, id) in categoryList" :key="categ.id">
            <td>{{ categ.name }}</td>
            <td>{{ categ.min }}</td>
            <td>{{ categ.max }}</td>
            <td class="text-center">
              <!-- <v-btn class="mx-2" color="success lighten-2">Update</v-btn>
              <v-btn class="mx-2" color="error lighten-2">Delete</v-btn> -->
              <UpdateCategory :data="categ" />
              <DeleteCategory :categName="categ.name" :categID="id" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AddCategory from "../../components/CategoryComponent/AddCategory.vue";
import DeleteCategory from "../../components/CategoryComponent/DeleteCategory.vue";
import UpdateCategory from "../../components/CategoryComponent/UpdateCategory.vue";

export default {
  components: {
    AddCategory,
    DeleteCategory,
    UpdateCategory,
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.categoryStore.categoryList,
    }),
  },
  data() {
    return {
      headers: ["Name", "Age", "Weight", "Belt", "Update"],
    };
  },
};
</script>

<style></style>
