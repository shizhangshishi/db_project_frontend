<template>
    <v-container>
        <!--筛选条件弹框-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showCondition">
            <v-card>
                <v-card-title>
                    Select Condition
                    <v-spacer></v-spacer>
                    <v-icon @click="showCondition=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>
                <v-card-text style="padding: 25px">
                    <v-radio-group v-model="condition" ref="condition">
                        <v-radio label="mild" :value="MILD"></v-radio>
                        <v-radio label="severe" :value="SEVERE"></v-radio>
                        <v-radio label="critical" :value="CRITICAL"></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="getPatients">Select</v-btn>
                    <v-btn text @click="showCondition=false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card>
            <v-card-title>
                <v-col cols="4">
                    Patients
                </v-col>
                <v-col cols="20">
                    <v-btn color="primary" @click="showCondition=true" text >Condition</v-btn>
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
    import Patients from "../Patients"
    import constant from "../../../config/constant"
    export default {
        name: "WardPatients",
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

                condition:'',
                discharge:false,
                showCondition:false,
                MILD: constant.MILD,
                SEVERE: constant.SEVERE,
                CRITICAL: constant.CRITICAL
            }
        },
        computed:{
            dischargeColor(){
                if (this.discharge)
                    return "primary";
                else
                    return "black";
            }
        },
        methods:{
            getPatients(){
                this.discharge = false;
                this.app.overlay = true;
                this.$axios.post('/user/medic/wardnurse/patients/condition',{
                    condition:this.condition
                }).
                then(res =>{
                    if (res.status === 200){
                        this.patients = res.data.patients;
                        this.app.message('Get patients successfully','success');
                        this.showCondition=false;
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
            getDischargePatients(){
                this.discharge = !this.discharge;
                if (this.discharge){
                    this.app.overlay = true;
                    this.$axios.get('/user/medic/wardnurse/patients/canDischarge').
                    then(res =>{
                        if (res.status === 200){
                            this.patients = res.data.patients;
                            this.app.message('Get canDischarge patients successfully','success');
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
                else {
                    this.getPatients();
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