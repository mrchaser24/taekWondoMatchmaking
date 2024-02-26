export default {
  state: () => ({
    matchList: [
      {
        id: 1,
        matchDivisionId: "",
        name: "",
        level: "",
        ageBracket: "",
        match: [],
      },
    ],
  }),
  mutations: {
    addNewMatchList(state, payload) {
      let getId = state.matchList.map((data) => data.id);
      let getMaxId = Math.max(...getId);
      payload.id = ++getMaxId;
      state.matchList.push(payload);
    },
    updateMatchList(state, payload) {
      let getIndex = state.matchList.map((data) => data.id).indexOf(payload.id);
      state.matchList[getIndex] = payload;
    },
  },
};
