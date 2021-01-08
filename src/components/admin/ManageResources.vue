<template>
    <div>
        <!--添加病房-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showWardDialog">
            <v-card>
                <v-card-title>
                    Add Ward
                    <v-spacer></v-spacer>
                    <v-icon @click="showWardDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>
                <v-card-text style="padding: 25px">
                    <v-radio-group v-model="region" prepend-icon="mdi-hospital"
                                   :rules="[() => !!region || 'region is required']">
                        <v-label>select region</v-label>
                        <v-radio label="mild" :value="MILD" selected></v-radio>
                        <v-radio label="serve" :value="SERVER"></v-radio>
                        <v-radio label="critical" :value="CRITICAL"></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="primary" @click="addWard">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--添加病床-->
        <v-dialog max-width="600px" overlay-opacity="0.9" v-model="showBedDialog">
            <v-card>
                <v-card-title>
                    Add Bed
                    <v-spacer></v-spacer>
                    <v-icon @click="showBedDialog=false" size="35px" color="red">mdi-close-box</v-icon>
                </v-card-title>

                <v-card-text style="padding: 25px">
                    <v-text-field v-model="wardId" label="Ward Id" prepend-icon="mdi-sofa"
                                  :rules="[() => !!wardId || 'ward id is required']"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="primary" @click="addBed">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row justify="center" align="center">
            <v-col cols="10">
                <v-row>
                    <!--建造病房-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Build Wards</v-card-title>
                            <v-card-subtitle>
                                Build wards of hospital
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showWardDialog=true">Build</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!--查看病房-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Check Wards</v-card-title>
                            <v-card-subtitle>
                                Check wards of hospital
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="checkWards">Check</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!--建造病床-->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Build Beds</v-card-title>
                            <v-card-subtitle>
                                Build beds of hospital
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="showBedDialog=true">Build</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
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
                                <Wards :wards="wards"></Wards>
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
    import constant from "../../config/constant"
    import Wards from "../resource/Wards";
    export default {
        name: "ManageResources",
        components: { Wards},
        data(){
            return{
                app: this.$root.$children[0],
                showWardDialog: false,
                showBedDialog: false,
                showWards: false,

                wards:[],
                wardId:'',
                region:'',

                MILD: constant.MILD,
                SERVER: constant.SEVERE,
                CRITICAL:constant.CRITICAL,
            }
        },
        methods:{
            addWard(){
                if (this.region){
                    this.app.overlay = true;
                    this.$axios.post('/admin/ward/build',{
                        region: this.region
                    }).then(res => {
                        if (res.status === 200) {
                            this.app.message("Add ward successfully", 'success');
                            this.showWardDialog = false;
                        } else {
                            this.app.message('Fail to add ward', 'error');
                        }
                    }).catch(error => {
                        this.app.message(error.message ? error.message :
                            'Operation fail, please check your network connection', 'error');
                    }).finally(() => {
                        this.app.overlay = false;
                        this.region = '';
                    });
                }
                else {
                    this.app.message("You must select region","error")
                }
            },
            checkWards(){
                this.showWards = true;
                this.app.overlay = true;
                this.$axios.get('/admin/wards')
                    .then(res => {
                    if (res.status === 200) {
                        this.app.message("Check wards successfully", 'success');
                        this.wards = res.data.wards;
                        // console.log(this.wards);
                    } else {
                        this.app.message('Fail to check wards', 'error');
                    }
                }).catch(error => {
                    this.app.message(error.message ? error.message :
                        'Operation fail, please check your network connection', 'error');
                }).finally(() => {
                    this.app.overlay = false;
                });
            },
            addBed(){
                if (this.wardId){
                    this.app.overlay = true;
                    this.$axios.post('/admin/ward/wardbed/build',{
                        id : this.wardId
                    }).
                    then(res => {
                        if (res.status === 200) {
                            this.app.message("Add ward bed successfully", 'success');
                            this.showBedDialog = false;
                        } else {
                            this.app.message('Fail to add ward bed', 'error');
                        }
                    }).catch(error => {
                        this.app.message(error.message ? error.message :
                            'Operation fail, please check your network connection', 'error');
                    }).finally(() => {
                        this.app.overlay = false;
                        this.wardId = '';
                    });
                }
                else {
                    this.app.message("You must fill ward id","error")
                }
            },
        }
    }
</script>

<style scoped>

</style>