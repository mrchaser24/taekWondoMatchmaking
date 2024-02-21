<template>
  <div class="ma-5 pa-5" style="margin: auto">
    <div
      class="py-5 d-flex justify-space-between"
      style="width: 80%; margin: 0 auto"
    >
      <div>
        <h1>Match Making</h1>
        <v-btn @click="$router.push('/')">Go Home</v-btn>
      </div>
      <div>
        <v-btn :disabled="generateButtonEnabled" @click="generateMatching()">Generate Match</v-btn>
        <v-btn @click="shuffle(matchResultList)">Shuffle</v-btn>
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
      <div class="d-flex" style="width: 100%">
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

      <FightDiagram :fightList="matchResultList.map(e => e)"/>
    </div>
  </div>
</template>

<script>
import FightDiagram from "../../components/MatchComponent/FightDiagram.vue";
import { mapState } from "vuex";
export default {
  components: {
    FightDiagram
  },
  data: () => ({
    selectedCategory: 0,
    selectedLevel: "",
    generateButtonEnabled: true,
    minValue: 0,
    maxValue: 0,
    matchLevel: [
      'novice',
      'advance'
    ]
  }),
  computed: {
    ...mapState({
      categList: (state) => state.categoryStore.categoryList,
      matchList: (state) => state.matchMakingStore.matchList,
      studentList: (state) => state.studentStore.studentList,
      matchResultList() {
        let getLevelIndex = this.matchList.filter(i => i.level == this.selectedLevel)
        let getIndex = getLevelIndex.map(i => i.matchDivisionId).indexOf(this.selectedCategory)
        return getIndex < 0? [] : (getLevelIndex[getIndex] == undefined ? []: getLevelIndex[getIndex].match)
      }
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
    },
  methods: {
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
      this.studentList.forEach(data => {
        if (data.weight >= this.minValue && data.weight <= this.maxValue && this.selectedLevel.toLowerCase() == data.level.toLowerCase()) studentArray.push(data)
      })
      
      if (getMatchIndex < 0) {
        console.log("MATCH GENERATED! 1st");
        this.$store.commit('addNewMatchList', {
          matchDivisionId: this.categList[getCategIndex].id,
          name: this.categList[getCategIndex].name,
          level: this.selectedLevel,
          match: [...studentArray],
        })
      } else if (getMatchIndex >= 0 && (this.matchList[getMatchIndex].level != this.selectedLevel)) {
        console.log("MATCH GENERATED! 2nd");
        this.$store.commit('addNewMatchList', {
          matchDivisionId: this.categList[getCategIndex].id,
          name: this.categList[getCategIndex].name,
          level: this.selectedLevel,
          match: [...studentArray],
        })
      }
    },
    updateMatchList(){

    },
    shuffle(array) {
      console.log(array.sort(() => Math.random() - 0.5));
    }
  },
  mounted(){
    if(this.categList.length > 0){
      this.selectedCategory = 1;
      this.selectedLevel = "novice";
      this.getCategoryData()
    }
  }
};
</script>

<style></style>
