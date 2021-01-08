<template>
    <div>
        <v-row justify="center" align="center">
            <v-col cols="10">
                <v-row>
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
        <v-row justify="center" align="center" v-if="showPatients">
            <v-col cols="10">
                <v-row>
                    <WardPatients :showPatients.sync="showPatients"></WardPatients>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import constant from "../../../config/constant"
    import WardPatients from "./WardPatients";
    export default {
        name: "HeadControl",
        components: {WardPatients},
        data(){
            return{
                showWardNurses:false,
                showSelectDialog:false,
                showPatients: false,
                patients:[],
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