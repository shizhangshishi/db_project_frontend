<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col align="center">
                    <v-icon>mdi-face</v-icon>
                    <b>ID</b>
                </v-col>
                <v-col align="center">
                    <v-icon>mdi-face</v-icon>
                    <b>Username</b>
                </v-col>
                <v-col align="center">
                    <v-icon>mdi-hospital</v-icon>
                    <b>Region</b>
                </v-col>
            </v-row>
            <v-row>
                <v-col align="center">
                    {{headNurse.id}}
                </v-col>
                <v-col align="center">
                    {{headNurse.username}}
                </v-col>
                <v-col align="center">
                    {{headNurse.medic.region}}
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "HeadNurse",
        data(){
            return{
                app: this.$root.$children[0],
                headNurse:{}
            }
        },
        mounted(){
          this.getHeadNurse();
        },
        methods:{
            getHeadNurse(){
                // this.headNurse = {
                //     name:"Qiao Biluo",
                //     username:"heheh",
                //     region:"critical"
                // };
                this.app.overlay = true;
                this.$axios.get('/user/medic/doctor/headnurse')
                    .then(res => {
                        if (res.status === 200) {
                            this.headNurse = res.data;
                        } else {
                            this.app.message('Fail to get headNurse', 'error');
                        }
                    })
                    .catch(error => {
                        this.app.message(error.message ? error.message :
                            'operation fail, please check your network connection', 'error');
                    })
                    .finally(() => {
                        this.app.overlay = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>