<template>
    <v-container>
        <!--筛选条件弹框-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showState">
            <v-card>
                <v-card-title>
                    Select State
                    <v-spacer></v-spacer>
                    <v-icon @click="showState=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>
                <v-card-text style="padding: 25px">
                   <v-radio-group v-model="state" ref="state">
                       <v-radio label="treated" :value="TREATED"></v-radio>
                       <v-radio label="cured" :value="CURED"></v-radio>
                       <v-radio label="died" :value="DIED"></v-radio>
                       <v-radio label="any" :value="ANY"></v-radio>
                   </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="getAllPatients">Select</v-btn>
                    <v-btn text @click="showState=false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card>
            <v-card-title>
                <v-col cols="4">
                    Patients
                </v-col>
                <v-col cols="20">
                    <v-btn color="primary" @click="showState=true" text >State</v-btn>
                    <v-btn :color="transferColor" text @click="getTransferPatients">Transfer</v-btn>
                    <v-btn :color="dischargeColor" text @click="getDischargePatients">Discharge</v-btn>
                    <v-btn color="red" text @click="close">Close</v-btn>
                </v-col>
            </v-card-title>
            <v-card-text>
                <Patients :patients="patients"></Patients>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import Patients from "./Patients"
    import constant from "../../config/constant"
    export default {
        name: "DH_Patients",
        props:{
            showPatients:{
                required:true
            }
        },
        components: {Patients},
        data(){
            return{
                app: this.$root.$children[0],
                patients:[],

                state:'',
                transfer:false,
                discharge:false,
                showState:false,
                CURED: constant.CURED,
                TREATED: constant.TREATED,
                DIED: constant.DIED,
                ANY:constant.ANY
            }
        },
        computed:{
            transferColor(){
                if (this.transfer)
                    return "primary";
                else
                    return "black";
            },
            dischargeColor(){
                if (this.discharge)
                    return "primary";
                else
                    return "black";
            }
        },
        mounted(){
          this.getAllPatients();
        },
        methods:{
            getAllPatients(){
                this.transfer = false;
                this.discharge = false;
                this.app.overlay = true;
                this.$axios.post('/user/medic/patients',{
                    state:this.state
                }).
                    then(res =>{
                        if (res.status === 200 && res.data.patients.length !==0){
                            this.app.message('Get patients successfully','success');
                            this.showState=false;
                            this.patients = res.data.patients;
                        }
                        else if (res.status === 200 && res.data.patients.length===0){
                            this.app.message('There is no patient for this state','warning');
                            this.showState=false;
                            this.patients = res.data.patients;
                        }
                        else {
                            this.app.message('Fail to get patients','error');
                        }
                }).catch(error => {
                    this.app.message(error.message ? error.message :
                        'Operation fail, please check your network connection', 'error');
                }).finally(() => {
                    this.app.overlay = false;
                });
            },
            getTransferPatients(){
                this.discharge = false;
                this.transfer = !this.transfer;
                if (this.transfer){
                    this.app.overlay = true;
                    this.$axios.get('/user/medic/patients/canTransfer').
                    then(res =>{
                        if (res.status === 200&& res.data.patients.length!==0){
                            this.patients = res.data.patients;
                            this.app.message('Get canTransfer patients successfully','success');
                        }
                        else if (res.status === 200 && res.data.patients.length===0){
                            this.app.message('There is no canTransfer patient','warning');
                            this.patients = res.data.patients;
                        }
                        else {
                            this.app.message('Fail to get canTransfer patients','error');
                        }
                    }).catch(error => {
                        this.app.message(error.message ? error.message :
                            'Operation fail, please check your network connection', 'error');
                    }).finally(() => {
                        this.app.overlay = false;
                    });
                }
            },
            getDischargePatients(){
                this.transfer = false;
                this.discharge = !this.discharge;
                if (this.discharge){
                    this.app.overlay = true;
                    this.$axios.get('/user/medic/patients/canDischarge').
                    then(res =>{
                        if (res.status === 200&& res.data.patients.length!==0){
                            this.patients = res.data.patients;
                            this.app.message('Get canDischarge patients successfully','success');
                        }
                        else if (res.status === 200 && res.data.patients.length===0){
                            this.app.message('There is no canDischarge patient','warning');
                            this.patients = res.data.patients;
                        }
                        else {
                            this.app.message('Fail to get canDischarge patients','error');
                        }
                    }).catch(error => {
                        this.app.message(error.message ? error.message :
                            'Operation fail, please check your network connection', 'error');
                    }).finally(() => {
                        this.app.overlay = false;
                    });
                }
            },
            close(){
                this.$emit("update:showPatients",false);
            }
        }
    }
</script>

<style scoped>

</style>