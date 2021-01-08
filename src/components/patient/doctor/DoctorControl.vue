<template>
    <div>
        <!--修改病人信息弹框-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showChangeDialog">
            <v-card>
                <v-card-title>
                    Change Patient's Information
                    <v-spacer></v-spacer>
                    <v-icon @click="showChangeDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <ChangeForm :showChangeDialog.sync="showChangeDialog" :patient.sync="patient"></ChangeForm>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- 核酸检测弹框-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showTestDialog">
            <v-card>
                <v-card-title>
                    Make Nuclear Acid Test for Patient
                    <v-spacer></v-spacer>
                    <v-icon @click="showTestDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <TestForm :showTestDialog.sync="showTestDialog" :patient.sync="patient"></TestForm>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-row justify="center" align="center">
            <v-col cols="10">
                <v-row>
                    <!--修改病人信息-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Change Patient's Information</v-card-title>
                            <v-card-subtitle>
                                Change patient's condition, state, region and etc.
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showChangeDialog=true" >Change</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!--给病人做核酸检测-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Test Patient</v-card-title>
                            <v-card-subtitle>
                                Make nuclear acid test for patient.
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showTestDialog=true">Test</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!--病人出院-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Discharge Patient</v-card-title>
                            <v-card-subtitle>
                                Discharge patient
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="discharge">Discharge</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>

    import ChangeForm from "./ChangeForm";
    import TestForm from "./TestForm";
    import constant from "../../../config/constant";
    export default {
        name: "DoctorControl",
        components: {TestForm, ChangeForm},
        props:{
            patient:{
                required:true
            }
        },
        data(){
            return{
                app:this.$root.$children[0],
                showChangeDialog:false,
                showTestDialog:false,
            }
        },
        methods:{
            discharge(){
                this.app.overlay = true;
                this.$axios.post('/user/medic/doctor/patient/discharge',{
                    id: this.patient.id,
                })
                    .then(res =>{
                        if (res.status === 200){
                            this.app.message("Discharge patient successfully","success");
                            this.patient.state = constant.CURED;
                        }
                    })
                    .catch(error => {
                        this.app.message(error.message ? error.message :
                            'Operation fail, please check your network connection', 'error');
                    }).finally(() => {
                    this.app.overlay = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>