<template>
    <div>
        Beds Table
    </div>
</template>

<script>
    export default {
        name: "Beds",
        data(){
            return{
                app:this.$root.$children[0],
                beds:[],
                headers:[],
                patient:''
            }
        },
        mounted() {
            this.setBeds();
        },
        methods:{
          setBeds(){
              this.app.overlay = true;
              this.$axios.get('/user/medic/wardnurses')
                  .then(res => {
                      if (res.status === 200) {
                          this.wardNurses = res.data.users;
                      } else {
                          this.app.message('Fail to get wardNurses', 'error');
                      }
                  })
                  .catch(error => {
                      this.app.message(error.message ? error.message :
                          'operation fail, please check your network connection', 'error');
                  })
                  .finally(() => {
                      this.app.overlay = false;
                  });
          },
          checkPatient(){

          }
        }
    }
</script>

<style scoped>

</style>