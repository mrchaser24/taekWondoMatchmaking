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
        max: 20,
      },
      {
        id: 2,
        name: "Teens Group",
        min: 21,
        max: 40,
      },
      {
        id: 2,
        name: "Adults Group",
        min: 41,
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
    addAgeBracket(state, payload) {
      state.ageGroupList.push(payload);
    },
    updateAgeBracket(state, payload) {
      let getIndex = state.ageGroupList
        .map((data) => data.id)
        .indexOf(payload.id);
      state.ageGroupList[getIndex] = payload;
    },
    deleteAgeBracket(state, id) {
      state.ageGroupList.splice(id, 1);
    },
  },
};
