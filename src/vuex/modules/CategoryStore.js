export default {
  state: () => ({
    categoryList: [
      {
        id: 1,
        name: "fin weight",
        min: 1,
        max: 10,
      },
      {
        id: 2,
        name: "fly weight",
        min: 11,
        max: 20,
      },
      {
        id: 3,
        name: "Bantam weight",
        min: 21,
        max: 30,
      },
    ],
    ageGroupList: [
      {
        id: 1,
        name: "Kids Group",
        min: 1,
        max: 13,
      },
      {
        id: 2,
        name: "Teens Group",
        min: 14,
        max: 18,
      },
      {
        id: 2,
        name: "Adults Group",
        min: 19,
        max: 100,
      },
    ]
  }),
  mutations: {
    addCategory(state, payload) {
      state.categoryList.push(payload);
    },
    updateCategory(state, payload) {
      let getIndex = state.categoryList
        .map((data) => data.id)
        .indexOf(payload.id);
      state.categoryList[getIndex] = payload;
    },
    deleteCategory(state, id) {
      state.categoryList.splice(id, 1);
    },
  },
};
