export default {
    methods:{
        storeToLocalStore(){
            this.$store.subscribe((mutation, state) => {
                localStorage.setItem('store', JSON.stringify(state));
            });
        }
    }
}