<template>
  <div class="ma-5 pa-5" style="margin: auto">
    <div
      class="py-5"
      style="width: 80%; margin: 0 auto"
    >
      <div>
        <h1 class="py-5">Category Information</h1>
      </div>
      <div class=" d-flex justify-space-between">
        <div>
          <v-btn class="global-btn" color="blue-lighten-1" @click="$router.push('/')">Go Home</v-btn>
        </div>
        <div>
          <AddCategory />
          <AddAge />
        </div>
      </div>
    </div>

    <div style="width: 80%; margin: 0 auto" class="d-flex justify-space-between">
      <v-table
        class="ma-3"
        style="
          border-radius: 5px;
          box-shadow:
            2px 2px 5px #cacaca,
            2px 2px 5px #e7e7e7;
          width: 50%;
          margin: 0 auto;
        "
      >
        <thead fixed-header>
          <tr>
            <th class="text-left" style="width: 20%">Name</th>
            <th class="text-left">Min Weight</th>
            <th class="text-left">Max Weight</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categ, id) in categoryList" :key="categ.id">
            <td>{{ categ.name }}</td>
            <td>{{ categ.min }}</td>
            <td>{{ categ.max }}</td>
            <td class="d-flex justify-center">
              <!-- <v-btn class="mx-2" color="success lighten-2">Update</v-btn>
              <v-btn class="mx-2" color="error lighten-2">Delete</v-btn> -->
              <UpdateCategory :data="categ" />
              <DeleteCategory :categName="categ.name" :categID="id" />
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-table
        class="ma-3"
        style="
          border-radius: 5px;
          box-shadow:
            2px 2px 5px #cacaca,
            2px 2px 5px #e7e7e7;
          width: 50%;
          margin: 0 auto;
        "
      >
        <thead fixed-header>
          <tr>
            <th class="text-left" style="width: 20%">Name</th>
            <th class="text-left">Min Age</th>
            <th class="text-left">Max Age</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(age, id) in ageGroupList" :key="age.id">
            <td>{{ age.name }}</td>
            <td>{{ age.min }}</td>
            <td>{{ age.max }}</td>
            <td class="d-flex justify-center">
              <!-- <v-btn class="mx-2" color="success lighten-2">Update</v-btn>
              <v-btn class="mx-2" color="error lighten-2">Delete</v-btn> -->
              <UpdateAge :data="age" />
              <DeleteAge :categName="age.name" :categID="id" />
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
import AddAge from "../../components/CategoryComponent/AddAge.vue";
import DeleteAge from "../../components/CategoryComponent/DeleteAge.vue";
import UpdateAge from "../../components/CategoryComponent/UpdateAge.vue";

export default {
  components: {
    AddCategory,
    DeleteCategory,
    UpdateCategory,
    AddAge,
    DeleteAge,
    UpdateAge,
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.categoryStore.categoryList,
      ageGroupList: (state) => state.categoryStore.ageGroupList,
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
