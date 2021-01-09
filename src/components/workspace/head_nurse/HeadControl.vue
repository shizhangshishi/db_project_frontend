<template>
    <div>
        <v-row justify="center" align="center">
            <v-col cols="10">
                <v-row>
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
                    <!--添加病房护士-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Add WardNurses</v-card-title>
                            <v-card-subtitle>
                                Check free ward nurses and add ward nurses
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showFreeWardNurses=true">Add</v-btn>
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
                    <!--查看病房和病床-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Check Wards And Beds</v-card-title>
                            <v-card-subtitle>
                                Check wars and beds with corresponding patients.
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showWards=true">Check</v-btn>
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
        <v-row justify="center" align="center" v-if="showFreeWardNurses">
            <v-col cols="10">
                <v-row>
                    <v-col cols="24" md="12">
                        <v-card>
                            <v-card-title>
                                <v-col cols="20">
                                    Add Ward Nurses
                                </v-col>
                                <v-col cols="4">
                                    <v-btn color="red" text @click="showFreeWardNurses=false">Close</v-btn>
                                </v-col>
                            </v-card-title>
                            <v-card-text>
                                <FreeWardNurses></FreeWardNurses>
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
        <v-row justify="center" align="center" v-if="showWards">
            <v-col cols="10">
                <v-row>
                    <v-col cols="24" md="12">
                        <v-card>
                            <v-card-title>
                                <v-col cols="20">
                                    Wards
                                </v-col>
                                <v-col cols="4">
                                    <v-btn color="red" text @click="showWards=false">Close</v-btn>
                                </v-col>
                            </v-card-title>
                            <v-card-text>
                               <Wards></Wards>
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
    import WardNurses from "../WardNurses";

    import constant from "../../../config/constant"
    import DH_Patients from "../DH_Patients";
    import Wards from "./Wards";
    import FreeWardNurses from "./FreeWardNurses";
    export default {
        name: "HeadControl",
        components: {FreeWardNurses, Wards, DH_Patients, WardNurses},
        data(){
            return{
                showWardNurses:false,
                showFreeWardNurses:false,
                showSelectDialog:false,
                showPatients: false,
                showWards:false,
                patients:[],
                wards:[],
                profession: constant.HEAD_NURSE
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