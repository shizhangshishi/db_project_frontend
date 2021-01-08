<template>
    <div>
        <v-row justify="center" align="center">
            <v-col cols="10">
                <v-row>
                    <!--查看护士长-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Check HeadNurse</v-card-title>
                            <v-card-subtitle>
                                Check information of head nurse
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showHeadNurse=true" >Check</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!--查看病房护士-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Check WardNurses</v-card-title>
                            <v-card-subtitle>
                                Check information of ward nurses
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showWardNurses=true">Check</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!--查看病人-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Check Patients</v-card-title>
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
        <v-row justify="center" align="center" v-if="showHeadNurse">
            <v-col cols="10">
                <v-row>
                    <v-col cols="24" md="12">
                        <v-card>
                            <v-card-title>
                                <v-col cols="20">
                                    HeadNurse
                                </v-col>
                                <v-col cols="4">
                                    <v-btn color="red" text @click="showHeadNurse=false">Close</v-btn>
                                </v-col>
                            </v-card-title>
                            <v-card-text>
                                <HeadNurse></HeadNurse>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>

                            </v-card-actions>
                        </v-card>

                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" v-if="showWardNurses">
            <v-col cols="10">
                <v-row>
                    <v-col cols="24" md="12">
                        <v-card>
                            <v-card-title>
                                <v-col cols="20">
                                    WardNurses
                                </v-col>
                                <v-col cols="4">
                                    <v-btn color="red" text @click="showWardNurses=false">Close</v-btn>
                                </v-col>
                            </v-card-title>
                            <v-card-text>
                                <WardNurses :profession="profession"></WardNurses>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>

                            </v-card-actions>
                        </v-card>

                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" v-if="showPatients">
            <v-col cols="10">
                <v-row>
                    <DH_Patients :showPatients.sync="showPatients"></DH_Patients>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import HeadNurse from "./HeadNurse"
    import WardNurses from "../WardNurses";

    import constant from "../../../config/constant"
    import DH_Patients from "../DH_Patients";
    export default {
        name: "DoctorControl",
        components: {DH_Patients, WardNurses,HeadNurse},
        data(){
            return{
                showHeadNurse:false,
                showWardNurses:false,
                showSelectDialog:false,
                showPatients: false,
                patients:[],
                profession: constant.DOCTOR
            }
        },
        methods:{
            // checkPa
            getAllPatients(){

            }
        }
    }
</script>

<style scoped>

</style>