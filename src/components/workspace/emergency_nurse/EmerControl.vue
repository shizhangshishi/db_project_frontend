<template>
    <div>
        <!--收治病人弹框-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showEnrollDialog">
            <v-card>
                <v-card-title>
                    Enroll Patient
                    <v-spacer></v-spacer>
                    <v-icon @click="showEnrollDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <EnrollForm showEnrollDialog="showEnrollDialog"></EnrollForm>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!--筛选条件弹框-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showSelectDialog">
            <v-card>
                <v-card-title>
                    Select Patients
                    <v-spacer></v-spacer>
                    <v-icon @click="showSelectDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <SelectForm :showSelectDialog.sync="showSelectDialog" :patients.sync="patients"></SelectForm>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-row justify="center" align="center">
            <v-col cols="10">
                <v-row>
                    <!--收治病人-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Enroll</v-card-title>
                            <v-card-subtitle>
                                Enroll patients
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showEnrollDialog=true" >Enroll</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!--查看病人-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Check</v-card-title>
                            <v-card-subtitle>
                                Check patients
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showPatients=true">Check</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" v-if="showPatients">
            <v-col cols="10">
                <v-row>
                    <v-col cols="24" md="12">
                        <v-card>
                            <v-card-title>
                                <v-col cols="20">
                                    Patients
                                </v-col>
                                <v-col cols="4">
                                    <v-btn color="primary" text @click="showSelectDialog=true">Select</v-btn>
                                    <v-btn color="red" text @click="showPatients=false">Close</v-btn>
                                </v-col>
                            </v-card-title>
                            <v-card-text>
                                <Patients :patients="patients"></Patients>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>

                            </v-card-actions>
                        </v-card>

                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import EnrollForm from "./EnrollForm";
    import SelectForm from "./SelectForm"
    import Patients from "../Patients";
    import patients_fake from "../../../data/workspace/patients"
    export default {
        name: "EmerControl",
        components: {Patients, EnrollForm,SelectForm},
        data(){
            return{
                app: this.$root.$children[0],
                showEnrollDialog:false,
                showSelectDialog:false,
                showPatients: false,
                patients:[]
            }
        },
        mounted(){

        },
        methods:{
            checkPatients(){
                this.showPatients = true;
            },
        }
    }
</script>

<style scoped>

</style>