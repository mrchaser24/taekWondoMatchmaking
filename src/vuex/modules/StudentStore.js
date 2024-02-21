export default {
  state() {
    return {
      studentList: [
        {
          id: 1,
          name: "John Doe",
          age: "16",
          weight: "10",
          belt: "Blue",
          level: "Novice",
          gym: "Xander",
          instructor: "Yoda",
          ageBracket: 'Cadet'
        },
        {
          id: 2,
          name: "Gregor",
          age: "25",
          weight: "3",
          belt: "Brown",
          level: "Advance",
          gym: "Xander",
          instructor: "Leonidas",
          ageBracket: 'Grade School'
        },
        {
          id: 3,
          name: "Alicia",
          age: "16",
          weight: "11",
          belt: "Blue",
          level: "Novice",
          gym: "Xander",
          instructor: "Yoda",
          ageBracket: ''
        },
        {
          id: 4,
          name: "QF",
          age: "25",
          weight: "20",
          belt: "Brown",
          level: "Advance",
          gym: "Xander",
          instructor: "Leonidas",
          ageBracket: ''
        },
        {
          id: 5,
          name: "Gerard",
          age: "16",
          weight: "21",
          belt: "Blue",
          level: "Novice",
          gym: "Xander",
          instructor: "Yoda",
          ageBracket: ''
        },
        {
          id: 6,
          name: "Andrew",
          age: "25",
          weight: "30",
          belt: "Brown",
          level: "Advance",
          gym: "Xander",
          instructor: "Leonidas",
          ageBracket: ''
        },
        {
          id: 7,
          name: "Aa",
          age: "10",
          weight: "10",
          belt: "Blue",
          level: "Novice",
          gym: "Xander",
          instructor: "Yoda",
          ageBracket: ''
        },
        {
          id: 8,
          name: "Bb",
          age: "3",
          weight: "3",
          belt: "Brown",
          level: "Advance",
          gym: "Xander",
          instructor: "Leonidas",
          ageBracket: ''
        },
        {
          id: 9,
          name: "Cc",
          age: "28",
          weight: "11",
          belt: "Blue",
          level: "Novice",
          gym: "Xander",
          instructor: "Yoda",
          ageBracket: ''
        },
        {
          id: 10,
          name: "Dd",
          age: "19",
          weight: "20",
          belt: "Brown",
          level: "Advance",
          gym: "Xander",
          instructor: "Leonidas",
          ageBracket: ''
        },
        {
          id: 11,
          name: "Ee",
          age: "5",
          weight: "21",
          belt: "Blue",
          level: "Novice",
          gym: "Xander",
          instructor: "Yoda",
          ageBracket: ''
        },
        {
          id: 12,
          name: "Ff",
          age: "9",
          weight: "30",
          belt: "Brown",
          level: "Advance",
          gym: "Xander",
          instructor: "Leonidas",
          ageBracket: ''
        },
      ],
      beltLevel: [
        {
          id: 0,
          color: "Please Select Belt",
        },
        {
          id: 1,
          color: "White",
        },
        {
          id: 2,
          color: "Low Yellow",
        },
        {
          id: 3,
          color: "High Yellow",
        },
        {
          id: 4,
          color: "Low Blue",
        },
        {
          id: 5,
          color: "High Blue",
        },
        {
          id: 6,
          color: "Low Red",
        },
        {
          id: 7,
          color: "High Red",
        },
        {
          id: 8,
          color: "Low Brown",
        },
        {
          id: 9,
          color: "High Brown",
        },
        {
          id: 10,
          color: "1st Dan Black",
        },
        {
          id: 11,
          color: "2nd Dan Black",
        },
        {
          id: 12,
          color: "3rd Dan Black",
        },
        {
          id: 13,
          color: "4th Dan Black",
        },
      ],
      ageBracket: [
        {
          id: 1,
          name: 'Grade School',
          min: 1,
          max: 13,
        },
        {
          id: 2,
          name: 'High School',
          min: 14,
          max: 18,
        },
        {
          id: 3,
          name: 'Collage',
          min: 19,
          max: 30,
        }
      ],
    };
  },
  mutations: {
    addStudent(state, payload) {
      state.studentList.push(payload);
    },
    updateStudent(state, payload) {
      let getIndex = state.studentList
        .map((data) => data.id)
        .indexOf(payload.id);
      
      state.beltLevel.forEach((item) => {
        if (item.color == payload.belt) {
          payload.level = item.id > 5 ? "Advance" : "Novice";
        }
      });
      state.studentList[getIndex] = payload;
    },
    deleteStudent(state, id) {
      state.studentList.splice(id, 1);
    },
  },
};
