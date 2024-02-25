<template>
  <div>
    <h1 style="text-align: center">Taekwondo Fight Diagram</h1>
    <!-- <v-btn @click="clickMe()">O</v-btn> -->
    <main id="tournament">
      <ul class="round round-1">
        <li class="spacer">&nbsp;</li>

        <li class="game game-top">
          {{ fightList.length >= 1 ? fightList[0].name : ""
          }}<span v-if="fightList.length < 1" style="color: #fff">-</span>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom">
          {{ fightList.length >= 2 ? fightList[1].name : ""
          }}<span v-if="fightList.length < 2" style="color: #fff">-</span>
        </li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top">
          {{ fightList.length >= 3 ? fightList[2].name : ""
          }}<span v-if="fightList.length < 3" style="color: #fff">-</span>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom">
          {{ fightList.length >= 4 ? fightList[3].name : ""
          }}<span v-if="fightList.length < 4" style="color: #fff">-</span>
        </li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top">
          {{ fightList.length >= 5 ? fightList[4].name : ""
          }}<span v-if="fightList.length < 5" style="color: #fff">-</span>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom">
          {{ fightList.length >= 6 ? fightList[5].name : ""
          }}<span v-if="fightList.length < 6" style="color: #fff">-</span>
        </li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top">
          {{ fightList.length >= 7 ? fightList[6].name : ""
          }}<span v-if="fightList.length < 7" style="color: #fff">-</span>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom">
          {{ fightList.length >= 8 ? fightList[7].name : ""
          }}<span v-if="fightList.length < 8" style="color: #fff">-</span>
        </li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top">
          {{ fightList.length >= 9 ? fightList[8].name : ""
          }}<span v-if="fightList.length < 9" style="color: #fff">-</span>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom">
          {{ fightList.length >= 10 ? fightList[9].name : ""
          }}<span v-if="fightList.length < 10" style="color: #fff">-</span>
        </li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top">
          {{ fightList.length >= 11 ? fightList[10].name : ""
          }}<span v-if="fightList.length < 11" style="color: #fff">-</span>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom">
          {{ fightList.length >= 12 ? fightList[11].name : ""
          }}<span v-if="fightList.length < 12" style="color: #fff">-</span>
        </li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top">
          {{ fightList.length >= 13 ? fightList[12].name : ""
          }}<span v-if="fightList.length < 13" style="color: #fff">-</span>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom">
          {{ fightList.length >= 14 ? fightList[13].name : ""
          }}<span v-if="fightList.length < 14" style="color: #fff">-</span>
        </li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top">
          {{ fightList.length >= 15 ? fightList[14].name : ""
          }}<span v-if="fightList.length < 15" style="color: #fff">-</span>
        </li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom">
          {{ fightList.length >= 16 ? fightList[15].name : ""
          }}<span v-if="fightList.length < 16" style="color: #fff">-</span>
        </li>

        <li class="spacer">&nbsp;</li>
      </ul>
      <ul class="round round-2">
        <li class="spacer">&nbsp;</li>

        <li class="game game-top"><span style="color: #fff">-</span></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom"><span style="color: #fff">-</span></li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top"><span style="color: #fff">-</span></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom"><span style="color: #fff">-</span></li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top"><span style="color: #fff">-</span></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom"><span style="color: #fff">-</span></li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top"><span style="color: #fff">-</span></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom"><span style="color: #fff">-</span></li>

        <li class="spacer">&nbsp;</li>
      </ul>
      <ul class="round round-3">
        <li class="spacer">&nbsp;</li>

        <li class="game game-top"><span style="color: #fff">-</span></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom"><span style="color: #fff">-</span></li>

        <li class="spacer">&nbsp;</li>

        <li class="game game-top"><span style="color: #fff">-</span></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom"><span style="color: #fff">-</span></li>

        <li class="spacer">&nbsp;</li>
      </ul>
      <ul class="round round-4">
        <li class="spacer">&nbsp;</li>

        <li class="game game-top"><span style="color: #fff">-</span></li>
        <li class="game game-spacer">&nbsp;</li>
        <li class="game game-bottom"><span style="color: #fff">-</span></li>

        <li class="spacer">&nbsp;</li>
      </ul>
    </main>
    <!-- <div>
            <div v-for="(item, index) in fightList" :key="index">
                <p>{{item}}</p>
            </div>
        </div> -->
  </div>
</template>

<script>
export default {
  props: ["fightList"],
  data: () => ({}),
  methods: {
    clickMe() {
      let handler = {};
      const proxy1 = new Proxy(this.fightList, handler);
      console.log(proxy1);
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.round {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  list-style: none;
  padding: 0;
}
.round .spacer {
  flex-grow: 1;
}
.round .spacer:first-child,
.round .spacer:last-child {
  flex-grow: 0.5;
}

.round .game-spacer {
  flex-grow: 1;
}

/*
 *  General Styles
*/
body {
  font-family: sans-serif;
  font-size: small;
  padding: 10px;
  line-height: 1.4em;
}

li.game {
  padding-left: 20px;
}

li.game {
  font-weight: bold;
}
li.game span {
  float: right;
  margin-right: 5px;
}

li.game-top {
  border-bottom: 1px solid #aaa;
}

li.game-spacer {
  border-right: 1px solid #aaa;
  min-height: 40px;
}

li.game-bottom {
  border-top: 1px solid #aaa;
}

@media print {
}
</style>
