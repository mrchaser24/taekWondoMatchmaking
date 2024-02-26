<template>
  <div class="header-main d-flex justify-between">
    <div class="title-container">
      <p>Teakwondo Matchmaking</p>
    </div>
    <div class="nav-container">
      <v-btn class="header-navs" :style="tabs == 1? 'border-bottom: 5px solid white':''" @click="selectTab(1)">Student</v-btn>
      <v-btn class="header-navs" :style="tabs == 2? 'border-bottom: 5px solid white':''" @click="selectTab(2)">Category</v-btn>
      <v-btn class="header-navs" :style="tabs == 3? 'border-bottom: 5px solid white':''" @click="selectTab(3)">Matchmaking</v-btn>
    </div>
  </div>
</template>

<script>
export default {
    data: ()=>({
        tabs: 0
    }),
    methods: {
        selectTab(tab){
            this.tabs = tab
            console.log("CLICKEDD", tab);
            if(tab == 1) this.$router.push('/Student')
            if(tab == 2) this.$router.push('/Category')
            if(tab == 3) this.$router.push('/Matching')
        }
    },
    mounted(){
        this.tabs = 1
    }
};
</script>

<style scoped>
.header-main {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    font-size: 20px;
    position: fixed;
    z-index: 1000;
    background-color: rgb(47, 158, 255);
    color: white;
}
.header-navs {
    height: 100% !important; 
    font-size: 20px;
    border-radius: 0px !important;
}
.title-container {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0px 40px;
}
</style>
