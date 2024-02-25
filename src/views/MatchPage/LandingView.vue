<template>
  <div class="ma-5 pa-5" style="margin: auto">
    <div
      class="dont-print py-5 d-flex justify-space-between"
      style="width: 80%; margin: 0 auto"
    >
      <div>
        <h1>Match Making</h1>
        <v-btn @click="$router.push('/')">Go Home</v-btn>
      </div>
      <div>
        <v-btn :disabled="generateButtonEnabled" @click="generateMatching()"
          >Generate Match</v-btn
        >
        <v-btn @click="shuffle(matchResultList)">Shuffle</v-btn>
        <v-btn @click="printWindows()">Print</v-btn>
      </div>
    </div>

    <div class="match-container">
      <div class="dont-print d-flex" style="width: 100%">
        <div>
          <v-autocomplete
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
            v-model="minValue"
            label="Minimum"
            variant="solo-filled"
            readonly
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="maxValue"
            label="Maximum"
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

      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab :value="1">Landscape</v-tab>
        <v-tab :value="2">City</v-tab>
        <v-tab :value="3">Abstract</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <!-- <v-window-item v-for="n in 3" :key="n" :value="n">
          <v-container fluid>
            <v-row>
              <v-col v-for="i in 6" :key="i" cols="12" md="4">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${
                    i * n * 5 + 10
                  }`"
                  aspect-ratio="1"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item> -->
        <FightDiagram
          class="print-this"
          :fightList="matchResultList.map((e) => e)"
        />
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
  }),
  computed: {
    ...mapState({
      categList: (state) => state.categoryStore.categoryList,
      matchList: (state) => state.matchMakingStore.matchList,
      studentList: (state) => state.studentStore.studentList,
      matchResultList() {
        let getLevelIndex = this.matchList.filter(
          (i) => i.level == this.selectedLevel,
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
      let getLevelIndex = this.matchList
        .filter((i) => i.matchDivisionId == this.selectedCategory)
        .filter((i) => i.level == this.selectedLevel);

      this.studentList.forEach((data) => {
        if (
          data.weight >= this.minValue &&
          data.weight <= this.maxValue &&
          this.selectedLevel.toLowerCase() == data.level.toLowerCase()
        )
          studentArray.push(data);
      });

      if (
        getMatchIndex < 0 ||
        (getMatchIndex >= 0 && getLevelIndex.length <= 0)
      ) {
        console.log("MATCH GENERATED!");
        this.$store.commit("addNewMatchList", {
          matchDivisionId: this.categList[getCategIndex].id,
          name: this.categList[getCategIndex].name,
          level: this.selectedLevel,
          match: [...studentArray],
        });
      } else if (getMatchIndex >= 0 && getLevelIndex.length > 0) {
        console.log("MATCH UPDATED!");
          this.$store.commit("updateMatchList", {
            id: getLevelIndex[0].id,
            matchDivisionId: this.categList[getCategIndex].id,
            name: this.categList[getCategIndex].name,
            level: this.selectedLevel,
            match: [...studentArray],
          });
      }

    },
    updateMatchList() {},
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
  },
};
</script>

<style scoped>
div >>> .match-container {
  border-radius: 5px;
  box-shadow:
    2px 2px 5px #cacaca,
    inset 2px 2px 5px #e7e7e7;
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
