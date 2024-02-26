<template>
  <div class="print-container ma-5 pa-5" style="margin: auto">
    <div
      class="dont-print py-5"
      style="width: 80%; margin: 0 auto"
    >
      <div>
        <h1 class="py-5">Match Making</h1>
      </div>
      <div class="d-flex justify-space-between">
        <div>
          <v-btn class="global-btn" color="blue-lighten-1" @click="$router.push('/')">Go Home</v-btn>
        </div>
        <div>
          <v-btn
            class="global-btn"
            color="blue-lighten-1"
            :disabled="generateButtonEnabled"
            @click="generateMatching()">Generate Match</v-btn>
          <v-btn class="global-btn" color="blue-lighten-1" @click="shuffle(matchResultList)">Shuffle</v-btn>
          <v-btn class="global-btn" color="green-lighten-1" @click="printWindows()">Print</v-btn>
        </div>
      </div>
    </div>

    <div class="match-container">
      <div class="dont-print d-flex" style="width: 100%">
        <div>
          <v-autocomplete
            class="autocomplete-field global-field"
            v-model="selectedCategory"
            :items="categList"
            item-value="id"
            item-title="name"
            label="Select Belt"
            auto-select-first
            :rules="[(v) => !!v || 'Belt is required']"
            required
            dense
            solo
            variant="solo-filled"
            width="300px"
          ></v-autocomplete>
        </div>
        <div>
          <v-autocomplete
            class="autocomplete-field global-field"
            v-model="selectedLevel"
            item-value="id"
            item-title="name"
            :items="matchLevel"
            label="Select Belt"
            :disabled="selectedCategory == ''"
            auto-select-first
            :rules="[(v) => !!v || 'Belt is required']"
            required
            dense
            solo
            variant="solo-filled"
            width="300px"
          ></v-autocomplete>
        </div>
        <div>
          <v-text-field
            class="global-field"
            v-model="minValue"
            label="Min Weight"
            variant="solo-filled"
            readonly
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="global-field"
            v-model="maxValue"
            label="Max Weight"
            variant="solo-filled"
            readonly
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="global-field"
            v-model="ageMin"
            label="Max Age"
            variant="solo-filled"
            readonly
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="global-field"
            v-model="ageMax"
            label="Max Age"
            variant="solo-filled"
            readonly
          ></v-text-field>
        </div>
      </div>

      <!-- <div>
        <div v-for="(match, index) in matchResultList" :key="index" class="my-3">
          <p>NAME: {{ match.name }}</p>
          <p>GYM: {{ match.gym }}</p>
          <p></p>
        </div>
      </div> -->

      <v-tabs class="dont-print ma-5" color="blue" v-model="tab" align-tabs="center">
        <div v-for="(item, index) in ageGroupList" :key="index">
          <v-tab :value="index" @click="ageGroup(item)">{{ item.name }}</v-tab>
        </div>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
          v-for="(item, index) in ageGroupList"
          :key="index"
          :value="tab"
        >
          <FightDiagram
            class="print-this"
            :fightList="matchResultList.map((e) => e)"
            :ageBracket="selectedAgeBracket"
            :selectedCategory="categList ? categList[0].name : ''"
            :selectedLevel="selectedLevel"
          />
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import FightDiagram from "../../components/MatchComponent/FightDiagram.vue";
import { mapState } from "vuex";
export default {
  components: {
    FightDiagram,
  },
  data: () => ({
    selectedCategory: 0,
    selectedLevel: "",
    generateButtonEnabled: true,
    minValue: 0,
    maxValue: 0,
    matchLevel: ["novice", "advance"],
    tab: 0,
    ageMin: 0,
    ageMax: 0,
    selectedAgeBracket: "",
  }),
  computed: {
    ...mapState({
      categList: (state) => state.categoryStore.categoryList,
      ageGroupList: (state) => state.categoryStore.ageGroupList,
      matchList: (state) => state.matchMakingStore.matchList,
      studentList: (state) => state.studentStore.studentList,
      matchResultList() {
        let getLevelIndex = this.matchList.filter(
          (i) =>
            i.level == this.selectedLevel &&
            i.ageBracket == this.selectedAgeBracket,
        );
        let getIndex = getLevelIndex
          .map((i) => i.matchDivisionId)
          .indexOf(this.selectedCategory);
        return getIndex < 0
          ? []
          : getLevelIndex[getIndex] == undefined
          ? []
          : getLevelIndex[getIndex].match;
      },
    }),
  },
  watch: {
    selectedCategory(to) {
      if (to != "") {
        this.getCategoryData();
        this.generateButtonEnabled = false;
      }
    },
    selectedLevel(to) {
      if (to != "") {
        this.getCategoryData();
        this.generateButtonEnabled = false;
      }
    },
    tab(to) {
      console.log("CURRENT TAB: ", to);
      this.getCategoryData();
    },
  },
  methods: {
    printWindows() {
      window.print();
    },
    getCategoryData() {
      let getIndex = this.categList
        .map((i) => i.id)
        .indexOf(this.selectedCategory);
      this.minValue = this.categList[getIndex].min;
      this.maxValue = this.categList[getIndex].max;
    },
    generateMatching() {
      let studentArray = [];
      let getCategIndex = this.categList
        .map((i) => i.id)
        .indexOf(this.selectedCategory);
      let getMatchIndex = this.matchList
        .map((i) => i.matchDivisionId)
        .indexOf(this.selectedCategory);
      let getBracketIndex = this.matchList
        .filter((i) => i.matchDivisionId == this.selectedCategory)
        .filter((i) => i.ageBracket == this.selectedAgeBracket);
      let getLevelIndex = this.matchList
        .filter((i) => i.matchDivisionId == this.selectedCategory)
        .filter(
          (i) =>
            i.level == this.selectedLevel &&
            i.ageBracket == this.selectedAgeBracket,
        );

      this.studentList.forEach((data) => {
        if (
          data.weight >= this.minValue &&
          data.weight <= this.maxValue &&
          data.level.toLowerCase() == this.selectedLevel.toLowerCase() &&
          data.age >= this.ageMin &&
          data.age <= this.ageMax
        )
          studentArray.push(data);
      });

      console.log("BRACKET", JSON.parse(JSON.stringify(getBracketIndex)));
      if (
        getMatchIndex < 0 ||
        (getMatchIndex >= 0 && getLevelIndex.length <= 0)
      ) {
        console.log("MATCH GENERATED!");
        this.$store.commit("addNewMatchList", {
          matchDivisionId: this.categList[getCategIndex].id,
          name: this.categList[getCategIndex].name,
          level: this.selectedLevel,
          ageBracket: this.selectedAgeBracket,
          match: [...studentArray],
        });
      } else if (getMatchIndex >= 0 && getLevelIndex.length > 0) {
        console.log("MATCH UPDATED!");
        this.$store.commit("updateMatchList", {
          id: getLevelIndex[0].id,
          matchDivisionId: this.categList[getCategIndex].id,
          name: this.categList[getCategIndex].name,
          level: this.selectedLevel,
          ageBracket: this.selectedAgeBracket,
          match: [...studentArray],
        });
      }
    },
    ageGroup(data) {
      console.log("DATA", data);
      this.ageMin = data.min;
      this.ageMax = data.max;
      this.selectedAgeBracket = data.name;
    },
    shuffle(array) {
      console.log(array.sort(() => Math.random() - 0.5));
    },
  },
  mounted() {
    if (this.categList.length > 0) {
      this.selectedCategory = 1;
      this.selectedLevel = "novice";
      this.getCategoryData();
    }
    if (this.ageGroupList.length > 0) {
      this.ageGroup(this.ageGroupList[0]);
    }
    this.tab = 0;
  },
};
</script>

<style scoped>
div >>> .match-container {
  /* border-radius: 5px;
  box-shadow:
    2px 2px 5px #cacaca,
    inset 2px 2px 5px #e7e7e7; */
  width: 80%;
  margin: 0 auto;
}
div >>> .dont-print {
  display: block;
}
@media print {
  div >>> .dont-print {
    display: none !important;
  }
  div >>> .print-this {
    padding: 20px;
  }
  div >>> .match-container {
    border-radius: 5px;
    box-shadow: none;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
