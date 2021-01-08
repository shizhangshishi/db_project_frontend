<template>
    <div>
        <!--某天是否核酸检测弹框-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showHasTestedDialog">
            <v-card>
                <v-card-title>
                    Has Patient been Tested
                    <v-spacer></v-spacer>
                    <v-icon @click="showHasTestedDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <HasTestedForm :showHasTestedDialog.sync="showHasTestedDialog" :patient.sync="patient"></HasTestedForm>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- 每日登记-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showRecordDialog">
            <v-card>
                <v-card-title>
                    Make Daily Record for Patient
                    <v-spacer></v-spacer>
                    <v-icon @click="showRecordDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <RecordForm :showRecordDialog.sync="showRecordDialog" :patient.sync="patient"></RecordForm>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-row justify="center" align="center">
            <v-col cols="10">
                <v-row>
                    <!--是否核酸检测-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Has Patient been Tested</v-card-title>
                            <v-card-subtitle>
                                Has patient been tested on specific day?
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showHasTestedDialog=true" >Ask</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!--给病人做每日登记-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Make Daily Record for Patient</v-card-title>
                            <v-card-subtitle>
                                Make daily record for patient,including temperature,symptom and etc.
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showRecordDialog=true">Make</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import HasTestedForm from "./HasTestedForm";
    import RecordForm from "./RecordForm";
    export default {
        name: "WardControl",
        components: {RecordForm, HasTestedForm},
        props:{
            patient:{
                required:true
            }
        },
        data(){
            return{
                app:this.$root.$children[0],
                showHasTestedDialog:false,
                showRecordDialog:false,
            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>