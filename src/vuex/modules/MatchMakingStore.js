export default {
  state: () => ({
    matchList: [{
      id: 1,
      matchDivisionId: "",
      name: "",
      level: "",
      match: [],
    }],
  }),
  mutations: {
    addNewMatchList(state, payload){
      let getId = state.matchList.map(data=>data.id)
      let getMaxId = Math.max(...getId)
      payload.id = ++getMaxId
      // console.log("HELLSNO", Math.max(state.matchList.map(data=>data.id))++);
      console.log("PAYLOAD", payload);
      state.matchList.push(payload)
    }
  }
};
