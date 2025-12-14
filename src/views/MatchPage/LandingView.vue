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
          <v-btn class="global-btn" color="blue-lighten-1" @click="router.push('/')">Go Home</v-btn>
        </div>
        <div>
          <v-btn
            class="global-btn"
            color="blue-lighten-1"
            :disabled="generateButtonEnabled || studentList.length < 1"
            @click="generateMatching()">Generate Match</v-btn>
          <v-btn :disabled="studentList.length < 1" class="global-btn" color="blue-lighten-1" @click="shuffle(matchResultList)">Shuffle</v-btn>
          <v-btn :disabled="studentList.length < 1" class="global-btn" color="green-lighten-1" @click="printWindows()">Print</v-btn>
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

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FightDiagram from "../../components/MatchComponent/FightDiagram.vue";

const store = useStore();
const router = useRouter();

// Data
const selectedCategory = ref(0);
const selectedLevel = ref("");
const generateButtonEnabled = ref(true);
const minValue = ref(0);
const maxValue = ref(0);
const matchLevel = ref(["novice", "advance"]);
const tab = ref(0);
const ageMin = ref(0);
const ageMax = ref(0);
const selectedAgeBracket = ref("");

// Computed properties
const categList = computed(() => store.state.categoryStore.categoryList);
const ageGroupList = computed(() => store.state.categoryStore.ageGroupList);
const matchList = computed(() => store.state.matchMakingStore.matchList);
const studentList = computed(() => store.state.studentStore.studentList);
const matchResultList = computed(() => {
  let getLevelIndex = matchList.value.filter(
    (i) =>
      i.level == selectedLevel.value &&
      i.ageBracket == selectedAgeBracket.value,
  );
  let getIndex = getLevelIndex
    .map((i) => i.matchDivisionId)
    .indexOf(selectedCategory.value);
  return getIndex < 0
    ? []
    : getLevelIndex[getIndex] == undefined
    ? []
    : getLevelIndex[getIndex].match;
});

// Watchers
watch(selectedCategory, (to) => {
  selectedLevel.value = "novice";
  if (to != "") {
    getCategoryData();
    generateButtonEnabled.value = false;
  }
});

watch(selectedLevel, (to) => {
  if (to != "") {
    getCategoryData();
    generateButtonEnabled.value = false;
  }
});

watch(tab, (to) => {
  getCategoryData();
});

// Methods
const printWindows = () => {
  window.print();
};

const getCategoryData = () => {
  let getIndex = categList.value
    .map((i) => i.id)
    .indexOf(selectedCategory.value);
  minValue.value = categList.value[getIndex].min;
  maxValue.value = categList.value[getIndex].max;
};

const generateMatching = () => {
  let studentArray = [];
  let getCategIndex = categList.value
    .map((i) => i.id)
    .indexOf(selectedCategory.value);
  let getMatchIndex = matchList.value
    .map((i) => i.matchDivisionId)
    .indexOf(selectedCategory.value);
  let getBracketIndex = matchList.value
    .filter((i) => i.matchDivisionId == selectedCategory.value)
    .filter((i) => i.ageBracket == selectedAgeBracket.value);
  let getLevelIndex = matchList.value
    .filter((i) => i.matchDivisionId == selectedCategory.value)
    .filter(
      (i) =>
        i.level == selectedLevel.value &&
        i.ageBracket == selectedAgeBracket.value,
    );

  studentList.value.forEach((data) => {
    if (
      data.weight >= minValue.value &&
      data.weight <= maxValue.value &&
      data.level.toLowerCase() == selectedLevel.value.toLowerCase() &&
      data.age >= ageMin.value &&
      data.age <= ageMax.value
    )
      studentArray.push(data);
  });

  if (
    getMatchIndex < 0 ||
    (getMatchIndex >= 0 && getLevelIndex.length <= 0)
  ) {
    console.log("MATCH GENERATED!");
    store.commit("addNewMatchList", {
      matchDivisionId: categList.value[getCategIndex].id,
      name: categList.value[getCategIndex].name,
      level: selectedLevel.value,
      ageBracket: selectedAgeBracket.value,
      match: [...studentArray],
    });
  } else if (getMatchIndex >= 0 && getLevelIndex.length > 0) {
    console.log("MATCH UPDATED!");
    store.commit("updateMatchList", {
      id: getLevelIndex[0].id,
      matchDivisionId: categList.value[getCategIndex].id,
      name: categList.value[getCategIndex].name,
      level: selectedLevel.value,
      ageBracket: selectedAgeBracket.value,
      match: [...studentArray],
    });
  }
};

const ageGroup = (data) => {
  ageMin.value = data.min;
  ageMax.value = data.max;
  selectedAgeBracket.value = data.name;
};

const shuffle = (array) => {
  console.log(array.sort(() => Math.random() - 0.5));
};

// Lifecycle hooks
onMounted(() => {
  if (categList.value.length > 0) {
    selectedCategory.value = 1;
    selectedLevel.value = "novice";
    getCategoryData();
  }
  if (ageGroupList.value.length > 0) {
    ageGroup(ageGroupList.value[0]);
  }
  tab.value = 0;
});
</script>

<style scoped>
:deep(.match-container) {
  /* border-radius: 5px;
  box-shadow:
    2px 2px 5px #cacaca,
    inset 2px 2px 5px #e7e7e7; */
  width: 80%;
  margin: 0 auto;
}
:deep(.dont-print) {
  display: block;
}
@media print {
  :deep(.dont-print) {
    display: none !important;
  }
  :deep(.print-this) {
    padding: 20px;
  }
  :deep(.match-container) {
    border-radius: 5px;
    box-shadow: none;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
